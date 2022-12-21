import sys

sys.path.append("...")

from app.adapter.inmemory_map_repository import InMemoryMapRepository
from app.domain.map import Map


def test_map_save():
    map_data = Map()
    repo = InMemoryMapRepository()

    assert map_data.save(repo)[0].map_id == map_data.map_id


def test_map_repository_total():
    repo = InMemoryMapRepository()
    Map().save(repo)
    Map().save(repo)

    assert repo.total() == 2
