from .test_kw_unit_app import client
from json import loads
from pdb import set_trace

def test_get_colors_api(client):
    response = client.get("/api/v1/colors")
    colors = loads(response.data)
    dwarf_colors = colors["Dwarf"]
    assert dwarf_colors["name"] == "Dwarf"
    assert dwarf_colors["Background Color"] == "#f7e3c6"
    assert dwarf_colors["Dark Color"] == "#7d2408"
    assert dwarf_colors["Light Color"] == "#e5d0c9"
    assert dwarf_colors["Filigree Color"] == "#cc9b59"

def test_post_colors_api(client):
    color_to_add = {
            "name": "Attalus",
            "backgroundColor": "#e4ccba",
            "lightColor": "#fdec71",
            "darkColor": "#65057c",
            "filigreeColor": "#ca87d3"
        }
    create_response = client.post("/api/v1/colors", json=color_to_add)
    assert create_response.status_code == 200
    color_to_delete = {"to_delete":"Attalus"}
    delete_response = client.delete("/api/v1/colors", json=color_to_delete)
    assert delete_response.status_code == 200
