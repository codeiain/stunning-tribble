import uuid

from dataclasses import dataclass, field
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from websocket_repository import WebSocketRepository


@dataclass
class WebSocketMsg:
    WebSocketMsg_cid: str = field(default_factory=lambda: str(uuid.uuid4()))

    def save(self, websocket_repository: "WebSocketRepository"):
        return websocket_repository.add(self)
