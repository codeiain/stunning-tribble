from prometheus_client import Summary, Gauge, Counter, Info
PORT = Info('port', 'port')
CACHE_PLAYER_GRPC_REQUEST = Gauge("cache_player_add_grpc_request", 'count of requests')
CACHE_GET_PLAYER_GRPC_REQUEST = Gauge("Cache_player_get_grpc_request", documentation)