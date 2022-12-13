from prometheus_client import Summary, Gauge, Counter

WEBSOCKETS_ACTIVE = Gauge('websockets_active', 'current active websockets')
WEBSOCKETS_MSGS_RECEIVED = Counter('websockets_msgs_receive', 'websocket msgs receive from client')
WEBSOCKETS_ACTIVE_ROOMS = Gauge('websockets_active_rooms', 'current ative websocket rooms')