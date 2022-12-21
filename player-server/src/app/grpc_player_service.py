from .player_pb2 import *
from .player_pb2_grpc import PlayerCacheGRPC
class GrpcPlayerService(PlayerCacheGRPC):

    def __init__(self, *args, **kwargs):
        pass

    def updatePlayer(self, request, context):
        pass

    def getPlayer(self, request, context):
        pass