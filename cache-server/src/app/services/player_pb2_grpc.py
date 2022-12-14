# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import player_pb2 as player__pb2


class PlayerStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.CachePlayer = channel.unary_unary(
                '/cache.Player/CachePlayer',
                request_serializer=player__pb2.PlayerModel.SerializeToString,
                response_deserializer=player__pb2.CacheResponse.FromString,
                )
        self.GetCachePlayer = channel.unary_unary(
                '/cache.Player/GetCachePlayer',
                request_serializer=player__pb2.Player_id.SerializeToString,
                response_deserializer=player__pb2.PlayerModel.FromString,
                )


class PlayerServicer(object):
    """Missing associated documentation comment in .proto file."""

    def CachePlayer(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetCachePlayer(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_PlayerServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'CachePlayer': grpc.unary_unary_rpc_method_handler(
                    servicer.CachePlayer,
                    request_deserializer=player__pb2.PlayerModel.FromString,
                    response_serializer=player__pb2.CacheResponse.SerializeToString,
            ),
            'GetCachePlayer': grpc.unary_unary_rpc_method_handler(
                    servicer.GetCachePlayer,
                    request_deserializer=player__pb2.Player_id.FromString,
                    response_serializer=player__pb2.PlayerModel.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'cache.Player', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Player(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def CachePlayer(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/cache.Player/CachePlayer',
            player__pb2.PlayerModel.SerializeToString,
            player__pb2.CacheResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetCachePlayer(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/cache.Player/GetCachePlayer',
            player__pb2.Player_id.SerializeToString,
            player__pb2.PlayerModel.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
