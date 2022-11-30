from typing import List

from ..domain.websocket_msg import WebSocketMsg
from ..domain.websocket_repository import WebSocketRepository


class InMemoryWebsocketRepository(WebSocketRepository):
    def __init__(self):
        self.msgs = []

    def add(self, msg: WebSocketMsg) -> WebSocketMsg:
        self.msgs.append(msg)
        return msg

    def total(self) -> int:
        return len(self.msgs)
