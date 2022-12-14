import grpc
import player_pb2_grpc as pb2_grpc
import player_pb2 as pb2
from ..metrics import CACHE_PLAYER_GRPC_REQUEST, CACHE_GET_PLAYER_GRPC_REQUEST

class PlayerService(pb2_grpc.PlayerServicer):
    
    def __init__(self, *args, **kwargs):
        pass

    def CachePlayer(self, request, context):
        CACHE_PLAYER_GRPC_REQUEST.inc()


    def GetCachePlayer(self, request, context):
        CACHE_PLAYER_GRPC_REQUEST.inc()

    

