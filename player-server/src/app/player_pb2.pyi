from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class CacheResponse(_message.Message):
    __slots__ = ["status"]
    STATUS_FIELD_NUMBER: _ClassVar[int]
    status: str
    def __init__(self, status: _Optional[str] = ...) -> None: ...

class PlayerGrpc(_message.Message):
    __slots__ = ["ac", "current_map", "hp", "name", "player_id"]
    AC_FIELD_NUMBER: _ClassVar[int]
    CURRENT_MAP_FIELD_NUMBER: _ClassVar[int]
    HP_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    PLAYER_ID_FIELD_NUMBER: _ClassVar[int]
    ac: int
    current_map: str
    hp: int
    name: str
    player_id: str
    def __init__(self, player_id: _Optional[str] = ..., name: _Optional[str] = ..., hp: _Optional[int] = ..., ac: _Optional[int] = ..., current_map: _Optional[str] = ...) -> None: ...

class Player_id(_message.Message):
    __slots__ = ["id"]
    ID_FIELD_NUMBER: _ClassVar[int]
    id: str
    def __init__(self, id: _Optional[str] = ...) -> None: ...
