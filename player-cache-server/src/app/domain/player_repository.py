import abc
from typing import List

from .player import Player


class PlayerRepository(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def set(self, player: Player) -> Player:
        raise NotImplementedError

    @abc.abstractmethod
    def get(self, player_id) -> Player:
        raise NotImplementedError

