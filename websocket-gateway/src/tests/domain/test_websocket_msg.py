import uuid

from ...app.domain.websocket_msg import WebSocketMsg


def text_WebSocketMsg_existing_WebSocketMsg_cid():
    WebSocketMsg_cid = str(uuid.uuid4())
    assert WebSocketMsg(WebSocketMsg_cid).WebSocketMsg_cid == WebSocketMsg_cid


def test_WebSocketMsg_defaults():
    assert uuid.UUID(WebSocketMsg().WebSocketMsg_cid)
