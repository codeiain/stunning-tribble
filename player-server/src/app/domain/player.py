import uuid

from dataclasses import dataclass, field
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from player_repository import PlayerRepository


@dataclass
class Player:
    player_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    player_map: str = ""
    
    def add(self, player_repository: "PlayerRepository"):
        return player_repository.add(self)

    def update(self, player_repository: "PlayerRepository"):
        return player_repository.add(self)


    def save(self, player_repository: "PlayerRepository"):
        return player_repository.add(self)

    def __hash__(self):
        return hash(self.player_id)
