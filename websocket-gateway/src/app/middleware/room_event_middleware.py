from starlette.types import ASGIApp, Receive, Scope, Send
from ..domain.room import Room


class RoomEventMiddleware:  # pylint: disable=too-few-public-methods
    """Middleware for providing a global :class:`~.Room` instance to both HTTP
    and WebSocket scopes.
    Although it might seem odd to load the broadcast interface like this (as
    opposed to, e.g. providing a global) this both mimics the pattern
    established by starlette's existing DatabaseMiddlware, and describes a
    pattern for installing an arbitrary broadcast backend (Redis PUB-SUB,
    Postgres LISTEN/NOTIFY, etc) and providing it at the level of an individual
    request.
    """

    def __init__(self, app: ASGIApp):
        self._app = app
        self._room = Room()

    async def __call__(self, scope: Scope, receive: Receive, send: Send):
        if scope["type"] in ("lifespan", "http", "websocket"):
            scope["room"] = self._room
        await self._app(scope, receive, send)
