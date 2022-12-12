from .adapter.inmemory_player_repository import InMemoryPlayerRepository
from .domain.player import Player

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from starlette_prometheus import metrics, PrometheusMiddleware

from os import environ, path
from dotenv import load_dotenv
from .config import BUILD_VERSION


basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, ".env"))

BUILD_VERSION = BUILD_VERSION
METRICS_PATH = environ.get("METRICS_PATH")
NAME = environ.get("NAME")

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
player_repository = InMemoryPlayerRepository()
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

