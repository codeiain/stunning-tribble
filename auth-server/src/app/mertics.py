from prometheus_client import Summary, Gauge, Counter, Info
PORT = Info('port', 'port')

AUTH_REQUEST_RESEVED = Counter('auth_request_reseved', 'number of auth request')
AUTH_TOKEN_BLACKLISTED = Counter('auth_token_blacklisted', 'number of tokens blacklisted')
