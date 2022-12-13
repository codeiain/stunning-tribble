from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, ".env"))

BUILD_VERSION = environ.get("BUILD_VERSION")
METRICS_PATH = environ.get("METRICS_PATH")
NAME = environ.get("NAME")
REDIS_HOST = environ.get("REDIS_HOST")
REDIS_PORT = environ.get("REDIS_PORT")
REDIS_PASSWORD = environ.get("REDIS_PASSWORD")
