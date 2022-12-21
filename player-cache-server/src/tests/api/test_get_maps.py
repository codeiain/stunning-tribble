def test_get_msgs_0(client):
    response = client.get("/maps")
    assert response.status_code == 200
    assert len(response.json()) == 0


def test_get_msgs_1(client):
    client.post("/create")
    response = client.get("/maps")
    assert response.status_code == 200
    assert response.json() != None


def test_get_votes_10(client):
    for i in range(1, 10):
        client.post("/create")

    response = client.get("/maps")
    assert response.status_code == 200
    assert response.json() != None
