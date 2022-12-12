def test_post_msg(client):
    response = client.post("/create")
    assert response.status_code == 200
