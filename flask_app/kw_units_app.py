import json
import pdb

from flask import Flask
from flask import render_template
from flask import request

from ..KingdomsAndWarfare.Trait.Trait import Trait

app = Flask(__name__)


@app.route("/")
def render_index():
    (traits, lastUpdated) = get_traits("static/traits.json")
    colorSchemes = get_color_schemes("static/colorSchemes.json")
    return render_template(
        "index.html", traits=traits, colorSchemes=colorSchemes, lastUpdated=lastUpdated
    )


def get_traits(traits_filepath: str):
    lastUpdated = ""
    traits = {}
    with open(traits_filepath, "r", encoding="utf-8") as traitsFile:
        traitsJson = json.loads(traitsFile.read())
        lastUpdated = traitsJson["updated"]
        for traitName in sorted(traitsJson["traits"].keys()):
            newTrait = Trait.fromDict(traitsJson["traits"][traitName])
            traits[traitName] = newTrait
    return traits, lastUpdated


def get_color_schemes(colors_filepath:str):
    with open(colors_filepath, "r", encoding="utf-8") as schemesFile:
        schemesJson = json.loads(schemesFile.read())
        return schemesJson["Color Schemes"]


if __name__ == "__main__":
    app.run()
