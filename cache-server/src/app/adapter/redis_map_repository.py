from typing import List

from ..domain.map import Map
from ..domain.map_repository import MapRepository


from ..config import REDIS_HOST, REDIS_PASSWORD, REDIS_PORT

import json
import redis

class RedisMapRepository(MapRepository):
    def __init__(self):
        pool = redis.ConnectionPool(host=REDIS_HOST, port=REDIS_PORT, db=0, password=REDIS_PASSWORD)
        self.redis = redis.Redis(connection_pool=pool)

    def map_for_save(self, map):
        map_data = {
            "map_id": map.map_id,
            "map_name": map.map_name,
            "author": map.author,
            "data": map.map_data,
            "models": map.models_data,
        }
        return map_data

    def set(self, map: Map) -> Map:
        try:
            self.redis.set(map.map_id, json.dumps(self.map_for_save(map)))
        except Exception as e:
            print(e)

    def get(self, map_id) -> Map:
        return json.loads(self.redis.get(map_id))




