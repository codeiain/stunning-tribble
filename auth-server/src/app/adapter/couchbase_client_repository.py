from typing import List

from ..interfaces.client_repository import ClientRepository
from .couchbase_blacklist_repository import CouchbaseBlacklistRepository
from ..domain.auth_paylod import AuthPayload
from ..domain.auth_response import AuthResponse


from datetime import timedelta
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster
from couchbase.options import ClusterOptions, ClusterTimeoutOptions, QueryOptions

from ..config import CB_USERNAME, CB_PASSWORD, CB_BUCKET_NAME, CB_CLIENT_COLLECTION, CB_CLUSTER, AUTHSECRET, AUTHSECRET

import json
import uuid

class CouchbaseClientRepository(ClientRepository):

    def __init__(self):
        self.blacklist = CouchbaseBlacklistRepository()
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
        self.cb_coll = self.cb.scope("_default").collection(CB_CLIENT_COLLECTION)
        try:
            self.cluster.query("CREATE PRIMARY INDEX ON {bucket_name}._default.{CB_COLLECTION}")
        except QueryIndexAlreadyExistsException:
            print("Index already exists")

    def authenticate(self, clientId, clientSecret):
        scope = self.cb.scope("_default")
        sql_query = "SELECT * FROM clients WHERE clientId= $1 and clientScret = $2"
        row_iter = scope.query(sql_query, QueryOptions(positional_parameters=[clientId, clientSecret]))

        isAdmin = False

        if len(row_iter) == 1:
            for row in row_iter:
                payload = AuthPayload(row[0], row[1], isAdmin)
                break;

            encoded_jwt = jwt.encode(payload.__dict__, AUTHSECRET, algorithm='HS256')
            response = AuthResponse(encoded_jwt, EXPIRESSECONDS, isAdmin)

            return response.__dict__
        else:
            return False

    def verify(self, token):
        try:
            isBlacklisted = self.blacklist.checkBlacklist(token)
            if isBlacklisted == True:
                return {"success": False}
            else:
                decoded = jwt.decode(token, AUTHSECRET, algorithms=['HS256'])
                return decoded
        except (Exception) as error:
            print(error)
            return {"success": False}

    def create(self, clientId, clientSecret, isAdmin):
        data = {
            "clientId": clientId,
            "clientSecret": clientSecret,
            "isAdmin": isAdmin
        }
        key = str(uuid.uuid4())
        self.cb_coll.upsert(key, data)
        return True
