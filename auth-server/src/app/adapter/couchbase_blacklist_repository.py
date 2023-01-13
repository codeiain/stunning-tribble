from typing import List

from ..interfaces.blacklist_repository import BlacklistRepository

from datetime import timedelta
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions, ClusterTimeoutOptions, QueryOptions

from ..config import CB_USERNAME, CB_PASSWORD, CB_BUCKET_NAME, CB_BLACKLIST_COLLECTION, CB_CLUSTER

import json
import uuid

class CouchbaseBlacklistRepository(BlacklistRepository):

    def __init__(self):
        username = CB_USERNAME
        password = CB_PASSWORD
        bucket_name = CB_BUCKET_NAME
        auth = PasswordAuthenticator(
            username,
            password,
        )
        self.cluster = Cluster(CB_CLUSTER, ClusterOptions(auth))
        self.cluster.wait_until_ready(timedelta(seconds=60))
        self.cb = self.cluster.bucket(bucket_name)
        self.cb_coll = self.cb.scope("_default").collection(CB_BLACKLIST_COLLECTION)
        try:
            self.cluster.query("CREATE PRIMARY INDEX ON {bucket_name}._default.{CB_COLLECTION}")
        except QueryIndexAlreadyExistsException:
            print("Index already exists")

    def blacklist(self, token):
        data = {
            "token":token
        }
        key = str(uuid.uuid4())
        self.cb_coll.upsert(key,data)
        return True

    def checkBlacklist(self, token):
        scope = self.cb.scope("_default")
        sql_query = "SELECT COUNT(*) FROM BLACKLIST WHERE token = $1"
        row_iter = scope.query(sql_query, QueryOptions(positional_parameters=[token]))
        if len(row_iter) == 1:
            return True
        else: 
            return False