from pydantic import BaseModel


class UserInfo(BaseModel):
    """Chatroom user metadata."""

    user_id: str
    connected_at: float
    message_count: int
