from .adapter.inmemory_map_repository import InMemoryMapRepository
from .domain.map import Map

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/")
async def get():
    return HTMLResponse(html)


@app.get("/map/{map_id}")
async def get_map(map_id):
    result = map_repository.get(map_id)
    print (result)
    return result

@app.post("/create")
async def create():
    map = Map()
    return map_repository.add(map)

@app.get("/maps")
async def get_all_maps():
    return map_repository.all()