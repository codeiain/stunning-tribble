from typing import List

from ..domain.map import Map
from ..domain.map_repository import MapRepository

from datetime import timedelta
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions, ClusterTimeoutOptions, QueryOptions

import json


class InMemoryMapRepository(MapRepository):
    def __init__(self):
        self.maps = []
        self.username = "Administrator"
        self.password = "password"
        self.bucket_name = "GameSystem"
        self.auth = PasswordAuthenticator(
            self.username,
            self.password,
        )
        self.cluster = Cluster("couchbase://couchbase", ClusterOptions(self.auth))
        self.cluster.wait_until_ready(timedelta(seconds=5))
        self.cb = self.cluster.bucket(self.bucket_name)
        self.cb_coll = self.cb.scope("_default").collection("maps")
        self.cb_coll_default = self.cb.default_collection()
        try:
            self.cluster.query("CREATE PRIMARY INDEX ON GameSystem._default.maps")
        except QueryIndexAlreadyExistsException:
            print("Index already exists")

    def map_for_save(self, map):
        map_data = {
            "map_id": map.map_id,
            "map_name": map.map_name,
            "author": map.author,
            "data": map.map_data,
            "models": map.models_data,
        }
        return map_data

    def add(self, map: Map) -> Map:
        try:
            key = map.map_id
            return self.cb_coll.upsert(key, self.map_for_save(map))
        except Exception as e:
            print(e)


    def get(self, map_id) -> Map:
        scope = self.cb.scope("_default")
        sql_query = "SELECT * FROM GameSystem._default.map WHERE map_id = $1"
        row_iter = scope.query(sql_query, QueryOptions(positional_parameters=[map_id]))
        result = {}
        print(type(result))
        for row in row_iter:
            print(type(row))
            print(row)
            result = row
        # return the first and only map the now
        return result

    def all(self) -> List[Map]:
        result = self.cluster.query("SELECT * from GameSystem._default.maps")
        results = [row for row in result]
        return results

    def total(self) -> int:
        return len(self.maps)
