from ..kw_units_app import get_traits
from ..kw_units_app import add_new_color_scheme
from ..kw_units_app import delete_color_scheme
from ..kw_units_app import get_color_schemes
from .test_unit_helper import save_test_trait_file
import pytest

def test_get_traits(tmp_path):
    save_test_trait_file(tmp_path)
    traits, lastUpdated = get_traits(f"{tmp_path}/tmp.json")

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
