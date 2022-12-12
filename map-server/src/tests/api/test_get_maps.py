url = "/maps"
port_url = "/create"

def test_get_msgs_0(client):
    response = client.get(url)
    assert response.status_code == 200
    assert len(response.json()) == 0


def test_get_msgs_1(client):
    client.post(port_url)
    response = client.get(url)
    assert response.status_code == 200
    assert response.json() != None


def test_get_msgs_10(client):
    for _ in range(1, 10):
        client.post(port_url)

    response = client.get(url)
    assert response.status_code == 200
    assert response.json() != None
