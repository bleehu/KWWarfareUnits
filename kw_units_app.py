import json
import pdb

from flask import csrf
from flask import Flask
from flask import render_template
from flask import request

from Traits.Trait import Trait
from ColorSchemes.ColorScheme import ColorScheme

app = Flask(__name__)


@app.route("/")
def render_index():
    (traits, lastUpdated) = getTraits()
    colorSchemes = getColorSchemes("static/", "colorSchemes.json")
    return render_template(
        "index.html", traits=traits, colorSchemes=colorSchemes, lastUpdated=lastUpdated
    )

@csrf.exempt #https://stackoverflow.com/questions/22854749/flask-and-ajax-post-http-400-bad-request-error
@app.route("/api/v1/colors", methods=["GET", "POST", "DELETE"])
def api_colors():
    if request.method == 'GET':
        return json.dumps(getColorSchemes("static/", "colorSchemes.json"))
    elif request.method == 'POST':
        return add_new_color_scheme(request.form, "static/", "colorSchemes.json")
    elif request.method == 'DELETE':
        return delete_color_scheme(request.form, "static/", "colorSchemes.json")



def getTraits():
    lastUpdated = ""
    traits = {}
    with open("static/traits.json", "r", encoding="utf-8") as traitsFile:
        traitsJson = json.loads(traitsFile.read())
        lastUpdated = traitsJson["updated"]
        for traitName in sorted(traitsJson["traits"].keys()):
            newTrait = Trait.fromDict(traitsJson["traits"][traitName])
            traits[traitName] = newTrait
    return traits, lastUpdated


def add_new_color_scheme(new_scheme_dict: dict, schemes_filepath: str, schemes_filename: str):
    new_scheme = ColorScheme(new_scheme_dict)
    with open(f"{schemes_filepath}/{schemes_filename}", "r+", encoding="utf-8") as schemes_file:
        schemes_json = json.loads(schemes_file.read())
        schemes_json["Color Schemes"][new_scheme.name] = new_scheme
        pdb.set_trace()
        schemes_file.write(json.dumps(schemes_json))

def delete_color_scheme(form_dict: dict, schemes_filepath: str, schemes_filename: str):
    name_of_scheme_to_delte = form_dict["to_delete"]

def getColorSchemes(schemes_filepath: str, schemes_filename: str):
    with open(f"{schemes_filepath}/{schemes_filename}", "r", encoding="utf-8") as schemes_file:
        schemesJson = json.loads(schemes_file.read())
        return schemesJson["Color Schemes"]


if __name__ == "__main__":
    app.run()
