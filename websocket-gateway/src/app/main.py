from .middleware.room_event_middleware import RoomEventMiddleware
from .domain.room import Room
from .domain.user_list_response import UserListResponse
from .domain.user_info_response import UserInfoResponse

import os
import logging
import time
from enum import Enum
from typing import Any, Dict, List, Optional

from fastapi import Body, FastAPI
from pydantic import BaseModel
from starlette.endpoints import WebSocketEndpoint
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import FileResponse
from starlette.types import ASGIApp, Receive, Scope, Send
from starlette.websockets import WebSocket
from fastapi.staticfiles import StaticFiles
from starlette_prometheus import metrics, PrometheusMiddleware

from .config import BUILD_VERSION, METRICS_PATH, NAME
from .error_codes import GLOBAL_ROOM_UNAVAILABLE, USER_NOT_FOUND
from .metrics import WEBSOCKETS_ACTIVE, WEBSOCKETS_MSGS_RECEIVED, WEBSOCKETS_ACTIVE_ROOMS, PORT

log = logging.getLogger(__name__)  # pylint: disable=invalid-name

app = FastAPI()
app.debug = True

PORT.info({'port': '8001'})

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(PrometheusMiddleware)
app.add_route("/" + METRICS_PATH, metrics)

import os

script_dir = os.path.dirname(__file__)
st_abs_file_path = os.path.join(script_dir, "static/")
app.mount("/static", StaticFiles(directory=st_abs_file_path), name="static")

app.add_middleware(RoomEventMiddleware)



@app.get("/")
def home():
    """Serve static index page."""
    return FileResponse(st_abs_file_path + "/index.html")


@app.get("/users", response_model=UserListResponse)
async def list_users(request: Request):
    """List all users connected to the room."""
    room: Optional[Room] = request.get("room")
    if room is None:
        raise GLOBAL_ROOM_UNAVAILABLE 
    return {"users": room.user_list}


@app.get("/users/{user_id}", response_model=UserInfoResponse)
async def get_user_info(request: Request, user_id: str):
    room: Optional[Room] = request.get("room")
    if room is None:
        raise GLOBAL_ROOM_UNAVAILABLE 
    user = room.get_user(user_id)
    if user is None:
        raise USER_NOT_FOUND
    return user


@app.post("/users/{user_id}/kick", response_model=UserListResponse)
async def kick_user(request: Request, user_id: str):
    """List all users connected to the room."""
    room: Optional[Room] = request.get("room")
    if room is None:
        raise GLOBAL_ROOM_UNAVAILABLE 
    try:
        await room.kick_user(user_id)
    except ValueError:
        raise USER_NOT_FOUND


@app.websocket_route("/ws")
class RoomLive(WebSocketEndpoint):
    """Live connection to the global :class:`~.Room` instance, via WebSocket."""

    encoding: str = "text"
    session_name: str = ""
    count: int = 0

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.room: Optional[Room] = None
        self.user_id: Optional[str] = None

        WEBSOCKETS_ACTIVE_ROOMS.set_function(lambda: len(self.room))

    @classmethod
    def change_room(user_id:str, room_id: int):
        pass

    @classmethod
    def get_next_user_id(cls):
        """Returns monotonically increasing numbered usernames in the form
        'user_[number]'
        """
        user_id: str = f"user_{cls.count}"
        cls.count += 1
        return user_id

    async def on_connect(self, websocket):
        """Handle a new connection.
        New users are assigned a user ID and notified of the room's connected
        users. The other connected users are notified of the new user's arrival,
        and finally the new user is added to the global :class:`~.Room` instance.
        """
        WEBSOCKETS_ACTIVE.inc()
        log.info("Connecting new user...")
        room: Optional[Room] = self.scope.get("room")
        if room is None:
            raise RuntimeError(f"Global `Room` instance unavailable!")
        self.room = room
        self.user_id = self.get_next_user_id()
        await websocket.accept()
        await websocket.send_json(
            {"type": "ROOM_JOIN", "data": {"user_id": self.user_id}}
        )
        await self.room.broadcast_user_joined(self.user_id)
        self.room.add_user(self.user_id, websocket)

    async def on_disconnect(self, _websocket: WebSocket, _close_code: int):
        """Disconnect the user, removing them from the :class:`~.Room`, and
        notifying the other users of their departure.
        """
        WEBSOCKETS_ACTIVE.dec()
        if self.user_id is None:
            raise RuntimeError(
                "RoomLive.on_disconnect() called without a valid user_id"
            )
        self.room.remove_user(self.user_id)
        await self.room.broadcast_user_left(self.user_id)

    async def on_receive(self, _websocket: WebSocket, msg: Any):
        WEBSOCKETS_MSGS_RECEIVED.inc()
        """Handle incoming message: `msg` is forwarded straight to `broadcast_message`."""
        if self.user_id is None:
            raise RuntimeError("RoomLive.on_receive() called without a valid user_id")
        if not isinstance(msg, str):
            raise ValueError(f"RoomLive.on_receive() passed unhandleable data: {msg}")
        await self.room.broadcast_message(self.user_id, msg)
