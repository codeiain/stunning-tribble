from pydantic import BaseModel
from typing import List


class UserListResponse(BaseModel):
    """Response model for /list_users endpoint."""

    users: List[str]
