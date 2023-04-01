import json
import pdb
import sys
from datetime import datetime
from Traits import Trait

TRAITS_FILE = "static/traits.json"
DATABASE = {"traits":{}}

def choose():
	userInput = input(">").strip()
	if userInput == "show":
		showTraits()
	elif userInput == "x" or "userInput" == exit:
		saveTraits()
		exit()
	else:
		newTrait(userInput)

def newTrait(traitName):
	description = input(">")
	newTrait = Trait(traitName.title(), description.strip())
	DATABASE["traits"][newTrait.name] = newTrait
	print(f"Trait {traitName} added!")


def showTraits():
	for traitName in sorted(DATABASE["traits"].keys()):
		print(traitName)

def loadTraitsFromJSON():
	with open(TRAITS_FILE, "r+", encoding="utf-8") as traitsFile:
		oldTraits  = json.loads(traitsFile.read())
		for traitName in oldTraits["traits"].keys():
			traitDict = oldTraits["traits"][traitName]
			newTrait = Trait(traitName, traitDict["description"])
			newTrait.created = traitDict["created"]
			newTrait.homebrew = traitDict["homebrew"]
			DATABASE["traits"].append(trait)

def saveTraits():
	print("saving work.")
	DATABASE["updated"] = str(datetime.now())
	with open(TRAITS_FILE, "w", encoding="utf-8") as traitsFile:
		newtraits = json.dumps(DATABASE)
		traitsFile.write(newtraits)
	print("work saved.")

def loadFromTextFile():
	with open("static/allTraits.txt", encoding="utf-8") as textFile:
		textLines = [line.rstrip() for line in textFile]
		index = 0
		while index < len(textLines):
			traitName = textLines[index]
			index += 1
			traitDescription = textLines[index]
			index += 1
			newTrait = {
				"name":traitName.title(), 
				"description": traitDescription,
				"homebrew": False,
				"created": str(datetime.now())
				}
			DATABASE["traits"].append(newTrait)



if __name__ == "__main__":
	loadTraitsFromJSON()
	print("Either type a new trait name, or type \"show\" to see current trait list, or \"x\" to exit.")
	chooseCount = 0
	#loadFromTextFile()
	while True:
		choose()
		chooseCount += 1
		if chooseCount > 5:
			saveTraits()
			chooseCount = 0