import json
import pdb
import sys
from datetime import datetime

TRAITS_FILE = "static/traits.json"
TRAITS = {"traits":[]}

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
	newTrait = {
		"name":traitName.title(), 
		"description": description,
		"homebrew": False,
		"created": str(datetime.now())
		}
	TRAITS["traits"].append(newTrait)
	print(f"Trait {traitName} added!")


def showTraits():
	traitsDisplayList = []
	for trait in TRAITS["traits"]:
		traitsDisplayList.append(trait["name"])
	sortedTraitNames = sorted(traitsDisplayList)
	for traitName in sortedTraitNames:
		print(traitName)


def loadTraits():
	with open(TRAITS_FILE, "r+", encoding="utf-8") as traitsFile:
		oldTraits  = json.loads(traitsFile.read())
		for trait in oldTraits["traits"]:
			if "homebrew" not in trait:
				trait["homebrew"] = True
			TRAITS["traits"].append(trait)


def saveTraits():
	print("saving work.")
	TRAITS["updated"] = str(datetime.now())
	with open(TRAITS_FILE, "w", encoding="utf-8") as traitsFile:
		newtraits = json.dumps(TRAITS)
		traitsFile.write(newtraits)
	print("work saved.")

def loadFromFile():
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
			TRAITS["traits"].append(newTrait)



if __name__ == "__main__":
	loadTraits()
	print("Either type a new trait name, or type \"show\" to see current trait list, or \"x\" to exit.")
	chooseCount = 0
	#loadFromFile()
	while True:
		choose()
		chooseCount += 1
		if chooseCount > 5:
			saveTraits()
			chooseCount = 0