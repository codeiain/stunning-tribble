def test_post_msg(client):
    response = client.post("/msg")
    assert response.status_code == 200
