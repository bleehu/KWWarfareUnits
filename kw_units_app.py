import json
import pdb

from flask import Flask
from flask import render_template
from flask import request

from KingdomsAndWarfare.Trait.Trait import Trait

app = Flask(__name__)


@app.route("/")
def render_index():
    (traits, lastUpdated) = getTraits()
    colorSchemes = getColorSchemes()
    return render_template("index.html", traits=traits, colorSchemes=colorSchemes, lastUpdated=lastUpdated)


@app.route("/api/v1/traits/search", methods=["POST"])
def search_traits():
    traits = getTraits()
    searchName = request.form["traitName"]


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


def getColorSchemes():
    schemes = {}
    with open("static/colorSchemes.json", "r", encoding="utf-8") as schemesFile:
        schemesJson = json.loads(schemesFile.read())
        return schemesJson["Color Schemes"]


if __name__ == "__main__":
    app.run()
