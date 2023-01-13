import abc
from typing import List

class BlacklistRepository(metaclass=abc.ABCMeta):
    
    @abc.abstractmethod
    def blacklist(token):
        raise NotImplementedError

    @abc.abstractmethod
    def checkBlacklist(token):
        raise NotImplementedError

