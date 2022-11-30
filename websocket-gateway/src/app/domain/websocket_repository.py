import abc
from typing import List

from .websocket_msg import WebSocketMsg


class WebSocketRepository(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def add(self, msg: WebSocketMsg) -> WebSocketMsg:
        raise NotImplementedError

    @abc.abstractmethod
    def total(self) -> int:
        raise NotImplementedError
