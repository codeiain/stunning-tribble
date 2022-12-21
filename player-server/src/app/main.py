from .adapter.couchbase_player_repository import CouchbasePlayerRepository
from .domain.player import Player
from .grpc_player_service import GrpcPlayerService
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from starlette_prometheus import metrics, PrometheusMiddleware

from .config import BUILD_VERSION, METRICS_PATH, NAME, GRPC_PORT
from concurrent import futures
import grpc
from .player_pb2 import *
from .player_pb2_grpc import add_PlayerCacheGRPCServicer_to_server
from threading import Thread

app = FastAPI()
html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Player-Server</title>
    </head>
    <body>
        <h1>Player-Server</h1>
    </body>
</html>
"""
player_repository = CouchbasePlayerRepository()
origins = [
    "https://8100-codeiain-stunningtribbl-3ouo8f6hgvq.ws-eu77.gitpod.io/",
    "https://8000-codeiain-stunningtribbl-3ouo8f6hgvq.ws-eu77.gitpod.io/",
    "http://localhost",
    "http://localhost:8080",
]

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

@app.post("/player")
async def add_player(player: Player):
    result = player_repository.add(player)
    return result

@app.get("/player/{player_id}")
async def get_player(player_id):
    result = player_repository.get(player_id)
    return result


@app.post("/player/{player_id}")
async def update_player(player_id: str, player: Player):
    return player_repository.add(player)


def start_grpc():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    add_PlayerCacheGRPCServicer_to_server(GrpcPlayerService(), server)
    server.add_insecure_port('[::]:'+GRPC_PORT)
    server.start()
    print("Server started, listening on " + GRPC_PORT)
    server.wait_for_termination()

thread = Thread(target = start_grpc)
thread.start()