import abc
from typing import List

class ClientRepository(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def authenticate(clientId, clientSecret):
        raise NotImplementedError

    @abc.abstractmethod
    def verify(token):
        raise NotImplementedError

    @abc.abstractmethod
    def create(clientId, clientSecret, isAdmin):
        raise NotImplementedError
    

