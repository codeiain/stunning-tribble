import uuid

from dataclasses import dataclass, field
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from player_repository import PlayerRepository


@dataclass
class Player:
    player_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    player_map: str = field(default_factory=lambda: "567f5741-0862-4dd6-a442-3d8f819a9dd5")
    player_name: str = "test player"
    player_viewport_x: int = 1
    player_viewport_y: int = 1
    

    def set(self, player_repository: "PlayerRepository"):
        return player_repository.set(self)

    def get(self, player_repository: "PlayerRepository"):
        return player_repository.get(self)

    def __hash__(self):
        return hash(self.player_id)
