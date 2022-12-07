import logging
from typing import Any, Dict, List, Optional
from starlette.websockets import WebSocket
import time
from .user_info import UserInfo


class Room:
    def __init__(self):
        self.log = logging.getLogger(__name__)
        self.log.info("Creating new empty room")
        self._users: Dict[str, WebSocket] = {}
        self._user_meta: Dict[str, UserInfo] = {}

    def __len__(self) -> int:
        return len(self._users)

    @property
    def empty(self) -> bool:
        return len(self._users) == 0

    @property
    def user_list(self) -> List[str]:
        return list(self._users)

    def add_user(self, user_id: str, websocket: WebSocket):
        """Add a user websocket, keyed by corresponding user ID.
        Raises:
            ValueError: If the `user_id` already exists within the room.
        """
        if user_id in self._users:
            raise ValueError(f"User {user_id} is already in the room")
        self.log.info("Adding user %s to room", user_id)
        self._users[user_id] = websocket
        self._user_meta[user_id] = UserInfo(
            user_id=user_id, connected_at=time.time(), message_count=0
        )

    async def kick_user(self, user_id: str):
        """Forcibly disconnect a user from the room.
        We do not need to call `remove_user`, as this will be invoked automatically
        when the websocket connection is closed by the `RoomLive.on_disconnect` method.
        Raises:
            ValueError: If the `user_id` is not held within the room.
        """
        if user_id not in self._users:
            raise ValueError(f"User {user_id} is not in the room")
        await self._users[user_id].send_json(
            {
                "type": "ROOM_KICK",
                "data": {"msg": "You have been kicked from the chatroom!"},
            }
        )
        self.log.info("Kicking user %s from room", user_id)
        await self._users[user_id].close()

    def remove_user(self, user_id: str):
        """Remove a user from the room.
        Raises:
            ValueError: If the `user_id` is not held within the room.
        """
        if user_id not in self._users:
            raise ValueError(f"User {user_id} is not in the room")
        self.log.info("Removing user %s from room", user_id)
        del self._users[user_id]
        del self._user_meta[user_id]

    def get_user(self, user_id: str) -> Optional[UserInfo]:
        """Get metadata on a user."""
        return self._user_meta.get(user_id)

    async def whisper(self, from_user: str, to_user: str, msg: str):
        """Send a private message from one user to another.
        Raises:
            ValueError: If either `from_user` or `to_user` are not present
                within the room.
        """
        if from_user not in self._users:
            raise ValueError(f"Calling user {from_user} is not in the room")
        self.log.info("User %s messaging user %s -> %s", from_user, to_user, msg)
        if to_user not in self._users:
            await self._users[from_user].send_json(
                {
                    "type": "ERROR",
                    "data": {"msg": f"User {to_user} is not in the room!"},
                }
            )
            return
        await self._users[to_user].send_json(
            {
                "type": "WHISPER",
                "data": {"from_user": from_user, "to_user": to_user, "msg": msg},
            }
        )

    async def broadcast_message(self, user_id: str, msg: str):
        """Broadcast message to all connected users."""
        self._user_meta[user_id].message_count += 1
        for websocket in self._users.values():
            await websocket.send_json(
                {"type": "MESSAGE", "data": {"user_id": user_id, "msg": msg}}
            )

    async def broadcast_user_joined(self, user_id: str):
        """Broadcast message to all connected users."""
        for websocket in self._users.values():
            await websocket.send_json({"type": "USER_JOIN", "data": user_id})

    async def broadcast_user_left(self, user_id: str):
        """Broadcast message to all connected users."""
        for websocket in self._users.values():
            await websocket.send_json({"type": "USER_LEAVE", "data": user_id})
