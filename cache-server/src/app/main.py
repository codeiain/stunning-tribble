from .adapter.redis_player_repository import RedisPlayerRepository
from .domain.player import Player
from .adapter.redis_map_repository import RedisMapRepository
from .domain.map import Map
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

import grpc

import services.player_pb2_grpc as pb2_grpc
import services.player_service

from starlette_prometheus import metrics, PrometheusMiddleware

from .config import BUILD_VERSION, METRICS_PATH, NAME, GRPC_PORT
from .metrics import PORT

app = FastAPI()
PORT.info({'port': '8011'})

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Cache-Server</title>
    </head>
    <body>
        <h1>Cache-Server</h1>
    </body>
</html>
"""
player_repository = RedisPlayerRepository()
map_repository = RedisMapRepository()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(PrometheusMiddleware)
app.add_route("/" + METRICS_PATH, metrics)

@app.get("/")
async def get():
    return HTMLResponse(html)

@app.post("/cache/player")
async def add_player_to_cache(player: Player):
    result = player_repository.set(player)
    return result

@app.get("/cache/player/{player_id}")
async def get_player_from_cache(player_id):
    result = player_repository.get(player_id)
    return result

@app.post("/cache/map")
async def add_map_to_cache(map: Map):
    result = map_repository.set(map)
    return result

@app.get("/cache/map/{map_id}")
async def get_map_from_cache(map_id):
    result = map_repository.get(map_id)
    return result

grpc_server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
pb2_grpc.add_PlayerServicer_to_server(PlayerService(), server)
grpc_server.add_insecure_port('[::]:{GRPC_PORT}')
grpc_server.start()
grpc_server.wait_for_termination()