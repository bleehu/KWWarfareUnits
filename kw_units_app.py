import json
import pdb

from flask import Flask
from flask import render_template
from flask import request
from KingdomsAndWarfare.Traits.Trait import Trait

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


def get_traits(traits_json_filepath):
    lastUpdated = ""
    traits = {}
    with open(traits_json_filepath, "r", encoding="utf-8") as traitsFile:
        traitsJson = json.loads(traitsFile.read())
        lastUpdated = traitsJson["updated"]
        for traitName in sorted(traitsJson["traits"].keys()):
            newTrait = Trait.from_dict(traitsJson["traits"][traitName])
            traits[traitName] = newTrait
    return traits, lastUpdated


def add_new_color_scheme(new_scheme_dict: dict, schemes_filepath: str, schemes_filename: str):
    new_scheme = ColorScheme(new_scheme_dict)
    with open(f"{schemes_filepath}/{schemes_filename}", "r+", encoding="utf-8") as schemes_file:
        schemes_json = json.loads(schemes_file.read())
        schemes_json["Color Schemes"].append(new_scheme.toJSON())
        schemes_file.seek(0)
        schemes_file.truncate()
        schemes_file.write(json.dumps(schemes_json))
    return {"Success": True}


def delete_color_scheme(form_dict: dict, schemes_filepath: str, schemes_filename: str):
    name_of_scheme_to_delete = form_dict["to_delete"]
    with open(f"{schemes_filepath}/{schemes_filename}", "r+", encoding="utf-8") as schemes_file:
        schemes_json = json.loads(schemes_file.read())
        schemes_json.pop(name_of_scheme_to_delete)
        schemes_file.seek(0)
        schemes_file.truncate()
        schemes_file.write(json.dumps(schemes_json))
    return {"Success": True}


def get_color_schemes(schemes_filepath: str, schemes_filename: str):
    with open(f"{schemes_filepath}/{schemes_filename}", "r", encoding="utf-8") as schemes_file:
        schemesJson = json.loads(schemes_file.read())
        return schemesJson["Color Schemes"]


if __name__ == "__main__":
    app.run()
