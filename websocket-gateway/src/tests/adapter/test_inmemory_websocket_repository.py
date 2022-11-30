from ...app.adapter.inmemory_websocket_repository import InMemoryWebsocketRepository
from ...app.domain.websocket_msg import WebSocketMsg


def test_msg_save():
    msg = WebSocketMsg()
    repo = InMemoryWebsocketRepository()

    assert msg.save(repo).WebSocketMsg_cid == msg.WebSocketMsg_cid


def test_msg_repository_total():
    repo = InMemoryWebsocketRepository()
    WebSocketMsg().save(repo)
    WebSocketMsg().save(repo)

    assert repo.total() == 2
