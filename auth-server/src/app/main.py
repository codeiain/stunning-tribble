from flask import Flask, request
from fastapi import FastAPI
from fastapi import FastAPI, Form, Request
import json
import hashlib

from starlette_prometheus import metrics, PrometheusMiddleware
from fastapi.middleware.cors import CORSMiddleware

from .config import BUILD_VERSION, METRICS_PATH, NAME
from .mertics import PORT

from .adapter.couchbase_client_repository import CouchbaseClientRepository
from .adapter.couchbase_blacklist_repository import CouchbaseBlacklistRepository

from .mertics import AUTH_REQUEST_RESEVED, AUTH_TOKEN_BLACKLISTED

app = FastAPI()
PORT.info({'port': '8013'})
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(PrometheusMiddleware)
app.add_route("/" + METRICS_PATH, metrics)

blacklist_repository = CouchbaseBlacklistRepository()
client_repository = CouchbaseClientRepository()


@app.post("/auth")
def auth(request: Request):
    AUTH_REQUEST_RESEVED.inc()
    client_id = request.form.get("client_id")
    client_secret_input = request.form.get("client_secret")

    hash_object = hashlib.sha1(bytes(client_secret_input, 'utf-8'))
    hashed_client_secret = hash_object.hexdigest()

    authentication = client_repository.authenticate(client_id, hashed_client_secret)
    if authentication == False:
        return {'success': False}
    else:
        return json.dumps(authentication)

@app.post("/verify")
def verify(request: Request):
    # verify the token 
    authorizationHeader = request.headers.get('authorization')	
    token = authorizationHeader.replace("Bearer ","")
    verification = client_repository.verify(token)
    return verification

@app.post("/logout")
def logout(request: Request):
    AUTH_TOKEN_BLACKLISTED.inc()
    token = request.form.get("token")
    status = blacklist_repository.blacklist(token)
    return {'success': status}

@app.post("/create")
def create(client_id: str = Form(), client_secret_input: str = Form(), is_admin: str = Form()):

    # the client secret in the database is "hashed" with a one-way hash
    hash_object = hashlib.sha1(bytes(client_secret_input, 'utf-8'))
    hashed_client_secret = hash_object.hexdigest()

    # make a call to the model to authenticate
    createResponse = client_repository.create(client_id, hashed_client_secret, is_admin)
    return {'success': createResponse}

@app.post("/client")
def client(request: Request):
    if request.method == 'POST':

        # verify the token 
        authorizationHeader = request.headers.get('authorization')	
        token = authorizationHeader.replace("Bearer ","")
        verification = client_repository.verify(token)
        
        if verification.get("isAdmin") == True:
            # get the client_id and secret from the client application
            client_id = request.form.get("client_id")
            client_secret_input = request.form.get("client_secret")
            is_admin = request.form.get("is_admin")

            # the client secret in the database is "hashed" with a one-way hash
            hash_object = hashlib.sha1(bytes(client_secret_input, 'utf-8'))
            hashed_client_secret = hash_object.hexdigest()

            # make a call to the model to authenticate
            createResponse = client_repository.create(client_id, hashed_client_secret, is_admin)
            return {'success': createResponse}
        else:
            return {'success': False, 'message': 'Access Denied'} 
        
    elif request.method == 'DELETE':
        # not yet implemented
        return {'success': False}
    else:        
        return {'success': False}
