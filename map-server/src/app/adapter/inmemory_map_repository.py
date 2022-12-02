from typing import List

from ..domain.map import Map
from ..domain.map_repository import MapRepository

from datetime import timedelta
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import (ClusterOptions, ClusterTimeoutOptions,
                               QueryOptions)


class InMemoryMapRepository(MapRepository):
    def __init__(self):
        self.maps = []
        self.username = "Administrator"
        self.password = "password"
        self.bucket_name = "maps"
        self.auth = PasswordAuthenticator(
            self.username,
            self.password,
        )
        self.cluster = Cluster('couchbase://localhost',
                               ClusterOptions(self.auth))
        self.cluster.wait_until_ready(timedelta(seconds=5))
        self.cb = self.cluster.bucket(self.bucket_name)
        cb_coll = self.cb.scope("inventory").collection("airline")
        cb_coll_default = self.cb.default_collection()

    def add(self, map: Map) -> Map:
        try:
            key = map.map_id
            results = self.cb_coll.upsert(key, map)
        except Exception as e:
            print(e) 
        self.maps.append(map)
        
        return self.maps

    def get(self, map_id) -> Map:
        # return the first and only map the now
        return self.maps[0]

    def all(self) -> List[Map]:
        return self.maps

    def total(self) -> int:
        return len(self.maps)
