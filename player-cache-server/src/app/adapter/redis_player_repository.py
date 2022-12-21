from typing import List

from ..domain.player import Player
from ..domain.player_repository import PlayerRepository

from ..config import REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, GRPC_PORT

import json
import redis
import genericpath
import grpc
from ..player_pb2 import Player_id
from ..player_pb2_grpc import PlayerCacheGRPCStub

class RedisPlayerRepository(PlayerRepository):
    def __init__(self):
        pool = redis.ConnectionPool(host=REDIS_HOST, port=REDIS_PORT, db=0, password=REDIS_PASSWORD)
        self.redis = redis.Redis(connection_pool=pool)
        self.channel = grpc.insecure_channel('0.0.0.0:'+GRPC_PORT)
        self.stub = PlayerCacheGRPCStub(self.channel)



    def player_for_save(self, player):
        player_data = {
            "player_id": player.player_id,
            "current_map": player.player_map,
            "name": player.name,
            "hp": player.hp,
            "ac": player.ac
        }
        return player_data

    def set(self, player: Player) -> Player:
        try:
            self.redis.set(player.player_id, json.dumps(self.player_for_save(player)))
        except Exception as e:
            print(e)

    def get(self, player_id) -> Player:
        player = None
        if self.redis.get(player_id) == None:
            player =stub.getPlayer(Player_id(id=player_id))
            self.set(player)
        else: 
            player = json.loads(self.redis.get(player_id))
        return player 




