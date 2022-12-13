import abc
from typing import List

from .map import Map


class MapRepository(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def set(self, msg: Map) -> Map:
        raise NotImplementedError

    @abc.abstractmethod
    def get(self, map_id) -> Map:
        raise NotImplementedError

