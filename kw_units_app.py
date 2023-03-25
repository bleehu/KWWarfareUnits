import json
import pdb

from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def render_index():
	traits = getTraits()
	return render_template('index.html', traits=traits)

@app.route("/api/v1/traits/search", methods=['POST'])
def search_traits():
	traits = getTraits()
	searchName = request.form['traitName']


def getTraits():
	traits = {"traits"}
	with open("static/traits.json", "r", encoding="utf-8") as traitsFile:
		traits = json.loads(traitsFile.read())
	return traits

if __name__ == "__main__":
	app.run()