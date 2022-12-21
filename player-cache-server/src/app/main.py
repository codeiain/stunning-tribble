from .middleware.logger_middleware import LoggingMiddleware
from .adapter.redis_player_repository import RedisPlayerRepository
from .domain.player import Player
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from concurrent import futures

from starlette_prometheus import metrics, PrometheusMiddleware

from .config import BUILD_VERSION, METRICS_PATH, NAME, GRPC_PORT
from .metrics import PORT

app = FastAPI()
PORT.info({'port': '8011'})

app.add_middleware(LoggingMiddleware)

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Player-Cache-Server</title>
    </head>
    <body>
        <h1>Cache-Server</h1>
    </body>
</html>
"""
player_repository = RedisPlayerRepository()

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
