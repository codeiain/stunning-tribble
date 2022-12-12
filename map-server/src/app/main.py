from .adapter.inmemory_map_repository import InMemoryMapRepository
from .domain.map import Map

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from starlette_prometheus import metrics, PrometheusMiddleware

from os import environ, path
from dotenv import load_dotenv


basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, ".env"))

BUILD_VERSION = environ.get("BUILD_VERSION")
METRICS_PATH = environ.get("METRICS_PATH")
NAME = environ.get("NAME")

app = FastAPI()
html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Map-Server</title>
    </head>
    <body>
        <h1>Map-Server</h1>
    </body>
</html>
"""
map_repository = InMemoryMapRepository()
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


@app.get("/map/{map_id}")
async def get_map(map_id):
    result = map_repository.get(map_id)
    return result


@app.post("/create")
async def create():
    new_map = Map()
    return map_repository.add(new_map)


@app.get("/maps")
async def get_all_maps():
    return map_repository.all()
