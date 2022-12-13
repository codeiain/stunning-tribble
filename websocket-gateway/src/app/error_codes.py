from fastapi import  HTTPException

GLOBAL_ROOM_UNAVAILABLE = HTTPException(500, detail="Global Room instance unavailable!")
USER_NOT_FOUND = HTTPException(404, detail=f"No such user")