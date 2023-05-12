from pathlib import Path

import pytest

from ..flask_app.kw_units_app import get_color_schemes
from ..flask_app.kw_units_app import get_traits


def test_get_traits(tmp_path):
    test_trait_filepath = f"{tmp_path}/static/"
    Path(test_trait_filepath).mkdir(parents=True, exist_ok=True)
    test_trait_filename = "traits.json"
    trait_data_example = """{"updated": "2023-05-11 18:10:20.136478",
        "traits": {
            "Archers": {
                "name": "Archers",
                "description": "This unit can attack any opposed unit. Successful Power tests the unit makes against opposed units that are not exposed inflict only 1 casualty.",
                "created": "2023-04-01 16:31:16.149699",
                "homebrew": false
            },
            "Camel Riders": {
                "name": "Camel Riders",
                "description": "This unit has advantage on Defense and Command Tests while in desert or planes terrain.",
                "created": "2023-04-01 16:31:16.149699", "homebrew": true
            },
            "First Strike": {
                "name": "First Strike",
                "description": "When deployment ends, this unit activates.",
                "created": "2023-04-01 16:31:16.149699", "homebrew": false
            }
        }}"""
    with open(f"{test_trait_filepath}/{test_trait_filename}", "w+") as test_file:
        test_file.write(trait_data_example)

    traits, lastUpdated = get_traits(f"{test_trait_filepath}/{test_trait_filename}")


def test_get_color_schemes(tmp_path):
    test_color_filepath = f"{tmp_path}/static/"
    Path(test_color_filepath).mkdir(parents=True, exist_ok=True)
    test_color_filename = "colorSchemes.json"

    color_schemes_data_example = """{
    "Color Schemes":[
        {"name":"Elf",
            "Background Color":{"red":253, "green": 232, "blue": 203},
            "Dark Color":{"red":12, "green": 68, "blue": 62},
            "Light Color":{"red":1, "green": 1, "blue": 1},
            "Filigree Color":{"red":186, "green": 191, "blue": 191}
        }
        ]}"""

    with open(f"{test_color_filepath}/{test_color_filename}", "w+") as test_file:
        test_file.write(color_schemes_data_example)

    color_schemes = get_color_schemes(f"{test_color_filepath}/{test_color_filename}")
