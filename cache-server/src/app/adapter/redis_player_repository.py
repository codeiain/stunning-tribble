from typing import List

from ..domain.player import Player
from ..domain.player_repository import PlayerRepository


from ..config import REDIS_HOST, REDIS_PASSWORD, REDIS_PORT

import json
import redis

class RedisPlayerRepository(PlayerRepository):
    def __init__(self):
        pool = redis.ConnectionPool(host=REDIS_HOST, port=REDIS_PORT, db=0, password=REDIS_PASSWORD)
        self.redis = redis.Redis(connection_pool=pool)

    def player_for_save(self, player):
        player_data = {
            "player_id": player.player_id,
            "player_map": player.player_map,
            "player_name": player.player_name,
            "player_viewport_x": player.player_viewport_x,
            "player_viewport_y": player.player_viewport_y
        }
        return player_data

    def set(self, player: Player) -> Player:
        try:
            self.redis.set(player.player_id, json.dumps(self.player_for_save(player)))
        except Exception as e:
            print(e)

    def get(self, player_id) -> Player:
        return json.loads(self.redis.get(player_id))




