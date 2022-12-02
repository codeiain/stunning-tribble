import uuid
import sys
sys.path.append("...")

from app.domain.map import Map


def text_Map_existing_Map_cid():
    map_id = str(uuid.uuid4())
    assert Map(map_id).map_id == map_id


def test_Map_defaults():
    assert uuid.UUID(Map().map_id)
