from typing import List

from ..domain.player import Player
from ..domain.player_repository import PlayerRepository

from datetime import timedelta
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions, ClusterTimeoutOptions, QueryOptions

from ..config import CB_USERNAME, CB_PASSWORD, CB_BUCKET_NAME, CB_COLLECTION, CB_CLUSTER

import json


class InMemoryPlayerRepository(PlayerRepository):
    def __init__(self):
        username = CB_USERNAME
        password = CB_PASSWORD
        bucket_name = CB_BUCKET_NAME
        auth = PasswordAuthenticator(
            username,
            password,
        )
        print(CB_CLUSTER)
        self.cluster = Cluster(CB_CLUSTER, ClusterOptions(auth))
        self.cluster.wait_until_ready(timedelta(seconds=60))
        self.cb = self.cluster.bucket(bucket_name)
        self.cb_coll = self.cb.scope("_default").collection(CB_COLLECTION)
        self.cb_coll_default = self.cb.default_collection()
        try:
            self.cluster.query("CREATE PRIMARY INDEX ON {bucket_name}._default.{CB_COLLECTION}")
        except QueryIndexAlreadyExistsException:
            print("Index already exists")

    def player_for_save(self, player):
        player_data = {
            "player_id": player.player_id,
            "player_map": player.player_map
        }
        return player_data


    def update_player(self, player: Player) -> Player:
        pass

    def add(self, player: Player) -> Player:
        try:
            key = player.player_id
            return self.cb_coll.upsert(key, self.player_for_save(player))
        except Exception as e:
            print(e)



    def get(self, player_id) -> Player:
        # scope = self.cb.scope("_default")
        # sql_query = "SELECT * FROM maps WHERE map_id = $1"
        # row_iter = scope.query(sql_query, QueryOptions(positional_parameters=[map_id]))
        # result = {}
        # print(type(result))
        # for row in row_iter:
        #     print(type(row))
        #     print(row)
        #     result = row
        # # return the first and only map the now
        # return result
        pass

    def all(self) -> List[Player]:
        # result = self.cluster.query("SELECT * from GameSystem._default.maps")
        # results = [row for row in result]
        # return results
        pass

    def total(self) -> int:
        # return len(self.player)
        pass
