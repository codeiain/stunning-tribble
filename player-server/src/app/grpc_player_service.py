from .protos.player_pb2_grpc import player_pb2_grpc as pb2_grpc

class GrpcPlayerService(pb2_grpc.PlayerCacheGRPC):

    def __init__(self, *args, **kwargs):
        pass

    def updatePlayer(self, request, context):
        pass

    def getPlayer(self, request, context):
        pass