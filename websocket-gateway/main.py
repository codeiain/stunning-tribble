from .src.app.adapter.inmemory_websocket_repository import InMemoryWebsocketRepository
from .src.app.domain.websocket_msg import WebSocketMsg


def main():
    websocket_repository = InMemoryWebsocketRepository()

    WebSocketMsg().save(websocket_repository)
    WebSocketMsg().save(websocket_repository)

    print(websocket_repository.all())
    print(f"Total votes: {websocket_repository.total()}")


if __name__ == "__main__":
    main()
