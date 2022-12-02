from .adapter.inmemory_map_repository import InMemoryMapRepository
from .domain.map import Map

from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse

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


@app.get("/")
async def get():
    return HTMLResponse(html)


@app.get("/map/{map_id}", response_model=int)
async def get_map(map_id):
    return map_repository.get(map_id)

@app.post("/create")
async def create():
    map = Map()
    return map_repository.add(map)

@app.get("/maps")
async def get_all_maps():
    return map_repository.all()