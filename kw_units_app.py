
import pdb
from json import loads, dumps
from flask import Flask
from flask import render_template
from flask import request
from KingdomsAndWarfare.Traits.Trait import Trait
from KingdomsAndWarfare.Units.Unit import Unit
from KingdomsAndWarfare.Units.UnitFactory import unit_from_dict
from KingdomsAndWarfare.Units.Infantry import Infantry
from KingdomsAndWarfare.Units.Artillery import Artillery
from KingdomsAndWarfare.Units.Cavalry import Cavalry


from .ColorSchemes.ColorScheme import ColorScheme

app = Flask(__name__)


@app.route("/")
def render_index():
    (traits, lastUpdated) = get_traits("static/traits.json")
    colorSchemes = get_color_schemes("static/", "colorSchemes.json")
    return render_template(
        "index.html", traits=traits, colorSchemes=colorSchemes, lastUpdated=lastUpdated
    )


@app.route("/api/v1/colors", methods=["GET", "POST", "DELETE"])
def api_colors():
    if request.method == "GET":
        return json.dumps(get_color_schemes("static/", "colorSchemes.json"))
    elif request.method == "POST":
        return add_new_color_scheme(request.get_json(), "static/", "colorSchemes.json")
    elif request.method == "DELETE":
        return delete_color_scheme(request.get_json(), "static/", "colorSchemes.json")

@app.route("/api/v1/unittools/level_up", methods=["POST"])
def api_level_up():
    unit = unit_from_json(request.get_json())
    unit.level_up()
    raw = dumps(unit.to_dict())
    return raw


@app.route("/api/v1/unittools/level_down", methods=["POST"])
def api_level_down():
    unit = unit_from_json(request.get_json())
    unit.level_down()
    raw = dumps(unit.to_dict())
    return raw


@app.route("/api/v1/unittools/upgrade", methods=["POST"])
def api_upgrade():
    unit = unit_from_json(request.get_json())
    unit.upgrade()
    raw = dumps(unit.to_dict())
    return raw


@app.route("/api/v1/unittools/downgrade", methods=["POST"])
def api_downgrade():
    unit = unit_from_json(request.get_json())
    unit.downgrade()
    raw = dumps(unit.to_dict())
    return raw

def unit_from_json(unit_json: dict) -> Unit:
    new_unit = unit_from_dict(unit_json)
    return new_unit


def get_traits(traits_json_filepath):
    lastUpdated = ""
    traits = {}
    with open(traits_json_filepath, "r", encoding="utf-8") as traitsFile:
        traitsJson = loads(traitsFile.read())
        lastUpdated = traitsJson["updated"]
        for traitName in sorted(traitsJson["traits"].keys()):
            newTrait = Trait.from_dict(traitsJson["traits"][traitName])
            traits[traitName] = newTrait
    return traits, lastUpdated


def add_new_color_scheme(new_scheme_dict: dict, schemes_filepath: str, schemes_filename: str):
    new_scheme = ColorScheme(new_scheme_dict)
    with open(f"{schemes_filepath}/{schemes_filename}", "r+", encoding="utf-8") as schemes_file:
        schemes_json = loads(schemes_file.read())
        schemes_json["Color Schemes"].append(new_scheme.toJSON())
        schemes_file.seek(0)
        schemes_file.truncate()
        schemes_file.write(dumps(schemes_json))
    return {"Success": True}


def delete_color_scheme(form_dict: dict, schemes_filepath: str, schemes_filename: str):
    name_of_scheme_to_delete = form_dict["to_delete"]
    with open(f"{schemes_filepath}/{schemes_filename}", "r+", encoding="utf-8") as schemes_file:
        schemes_json = loads(schemes_file.read())
        schemes_json.pop(name_of_scheme_to_delete)
        schemes_file.seek(0)
        schemes_file.truncate()
        schemes_file.write(dumps(schemes_json))
    return {"Success": True}


def get_color_schemes(schemes_filepath: str, schemes_filename: str):
    with open(f"{schemes_filepath}/{schemes_filename}", "r", encoding="utf-8") as schemes_file:
        schemesJson = loads(schemes_file.read())
        return schemesJson["Color Schemes"]


if __name__ == "__main__":
    app.run()
