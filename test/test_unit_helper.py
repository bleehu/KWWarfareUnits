from operator import contains

import pytest

from ..helper_add_traits import loadTraitsFromJSON
from ..helper_add_traits import showTraits


def test_load_traits_from_json(tmp_path):
    save_test_trait_file(tmp_path)
    loadTraitsFromJSON(tmp_path / "tmp.json")


def test_showTraits(capfd, tmp_path):
    save_test_trait_file(tmp_path)
    loadTraitsFromJSON(tmp_path / "tmp.json")
    showTraits()
    stdout, stderr = capfd.readouterr()
    assert "Archers" in stdout
    assert "Camel Riders" in stdout


def save_test_trait_file(tmp_path) -> None:
    temp_json_filepath = tmp_path / "tmp.json"
    temp_json_filepath.write_text(
        """
    {
    "updated": "2023-05-27 17:22:21.816304",
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
            "created": "2023-04-01 16:31:16.149699",
            "homebrew": true
        }
    }}
    """
    )
