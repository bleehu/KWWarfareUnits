import pytest
from pdb import set_trace

from json import loads
from ..kw_units_app import add_new_color_scheme
from ..kw_units_app import app
from ..kw_units_app import delete_color_scheme
from ..kw_units_app import get_color_schemes
from ..kw_units_app import get_traits
from KingdomsAndWarfare.Units.Unit import Unit
from KingdomsAndWarfare.Units.Infantry import Infantry
from .test_unit_helper import save_test_trait_file


@pytest.fixture()
def example_unit():
    return Infantry("Splonks", "Splonk infantry").to_dict()


@pytest.fixture
def client():
    app.config["TESTING"] = True

    yield app.test_client()  # tests run here


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()

def test_index(client):
    response = client.get("/")
    assert b"<script type=\"text/javascript\" src=\"static/kwunitGenerator.js\"></script>" in response.data
    assert b'<dt class="traitName"> Relentless </dt>' in response.data



#test unittools API
def test_upgrade(client, example_unit):
    response = client.post("/api/v1/unittools/upgrade", json=example_unit)
    response_json = loads(response.data)
    assert response_json['equipment'] == "MEDIUM"
    assert response_json['experience'] == "REGULAR"

def test_downgrade(client, example_unit):
    example_unit["equipment"] = "HEAVY"
    response = client.post("/api/v1/unittools/downgrade", json=example_unit)
    response_json = loads(response.data)
    assert response_json['equipment'] == "MEDIUM"
    assert response_json['experience'] == "REGULAR"

def test_level_up(client, example_unit):
    response = client.post("/api/v1/unittools/level_up", json=example_unit)
    response_json = loads(response.data)
    assert response_json['equipment'] == "LIGHT"
    assert response_json['experience'] == "VETERAN"

def test_level_down(client, example_unit):
    example_unit["experience"] = "VETERAN"
    response = client.post("/api/v1/unittools/level_down", json=example_unit)
    response_json = loads(response.data)
    assert response_json['equipment'] == "LIGHT"
    assert response_json['experience'] == "REGULAR"

def test_traits_api(client):
    response = client.get("/traits")
    assert b"Siege Engine" in response.data
    

def test_get_traits(tmp_path):
    save_test_trait_file(tmp_path)
    traits, lastUpdated = get_traits(f"{tmp_path}/tmp.json")


#test color helper classes
def test_get_color_schemes(tmp_path):
    save_temporary_color_file(tmp_path)
    get_color_schemes(tmp_path, "tempColors.json")

def test_add_new_color_scheme(tmp_path):
    save_temporary_color_file(tmp_path)
    new_color_dict = {"name":"Splonks",
                    "backgroundColor":"#0a0a0a",
                    "lightColor":"#ffffff",
                    "darkColor":"#010101",
                    "filigreeColor":"#00ffff"}
    add_new_color_scheme(new_color_dict, tmp_path, "tempColors.json")

def save_temporary_color_file(tmp_path) -> None:
    temp_json_filepath = tmp_path / "tempColors.json"
    temp_json_filepath.write_text("""{
    "Color Schemes": [
        {
            "name": "Elf",
            "Background Color": "#fde8cb",
            "Light Color": "#b6cdb7",
            "Dark Color": "#0c443e",
            "Filigree Color": "#babfbf"
        },
        {
            "name": "Dragonborn",
            "Background Color": "#bebebe",
            "Light Color": "#e5e5e5",
            "Dark Color": "#155768",
            "Filigree Color": "#99d9e1"
        }
        ]
        }""")
