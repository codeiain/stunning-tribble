import grpc
from .player_pb2 import *
from .player_pb2_grpc import PlayerCacheGRPCServicer

from ..metrics import CACHE_PLAYER_GRPC_REQUEST, CACHE_GET_PLAYER_GRPC_REQUEST

class PlayerService(PlayerCacheGRPCServicer):
    
    def __init__(self, *args, **kwargs):
        pass

    def CachePlayer(self, request, context):
        CACHE_PLAYER_GRPC_REQUEST.inc()


    def GetCachePlayer(self, request, context):
        CACHE_PLAYER_GRPC_REQUEST.inc()

    

