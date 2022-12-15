from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import random
import time
import string 
from ..logger import log

class LoggingMiddleware(BaseHTTPMiddleware):
    def __init__(self,app):
        super().__init__(app)


    async def dispatch(self, request: Request, call_next):
        idem = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        log.info(f"rid={idem} start request path={request.url.path}")
        start_time = time.time()

        response = await call_next(request)

        process_time = (time.time() - start_time) * 1000
        formatted_process_time = '{0:.2f}'.format(process_time)
        log.info(
            f"rid={idem} completed_in={formatted_process_time}ms status_code={response.status_code}")

        return response
