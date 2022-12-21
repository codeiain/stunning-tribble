import pytest
from starlette.testclient import TestClient
import sys

sys.path.append("...")


@pytest.fixture
def client():
    from app.main import app

    return TestClient(app)
