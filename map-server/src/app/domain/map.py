import uuid

from dataclasses import dataclass, field
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from map_repository import WebSocketRepository


@dataclass
class Map:
    map_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    map_name:str = ""
    author:str = ""
    map_data: list = field(default_factory=list) 
    models_data:list = field(default_factory=list) 
    
    def save(self, websocket_repository: "WebSocketRepository"):
        return websocket_repository.add(self)

    def __hash__(self):
        return hash(self.map_id)