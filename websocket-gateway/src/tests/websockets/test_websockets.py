from fastapi.websockets import WebSocket
from fastapi.testclient import TestClient
import unittest
from ...app.main import app

class TestWebsocket(unittest.TestCase):

    def test_send_websocket(self):
        client = TestClient(app)
        with client.websocket_connect("/ws") as websocket:
            websocket.send_text("testing")
            data = websocket.receive_text()
            assert data == "Message text was: testing"
            websocket.close()