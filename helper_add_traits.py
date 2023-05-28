import json
from datetime import datetime

from Traits.Trait import Trait

TRAITS_FILE = "static/traits.json"
DATABASE = {"traits": {}}


def choose():
    userInput = input(">").strip()
    if userInput == "show":
        showTraits()
    elif userInput == "x" or userInput == "exit" or userInput == "q" or userInput == "quit":
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


def loadTraitsFromJSON(traits_json_filepath):
    with open(TRAITS_FILE, "r+", encoding="utf-8") as traitsFile:
        oldTraits = json.loads(traitsFile.read())
        for traitName in oldTraits["traits"].keys():
            trait = oldTraits["traits"][traitName]
            newTrait = Trait(traitName, trait["description"])
            newTrait.created = trait["created"]
            newTrait.homebrew = trait["homebrew"]
            DATABASE["traits"][newTrait.name] = newTrait


def saveTraits():
    print("saving work.")
    saveData = {"updated": str(datetime.now()), "traits": {}}
    for traitName in DATABASE["traits"]:
        trait = DATABASE["traits"][traitName]
        saveData["traits"][traitName] = trait.toDict()
    with open(TRAITS_FILE, "w", encoding="utf-8") as traitsFile:
        newtraits = json.dumps(saveData)
        traitsFile.write(newtraits)
    print("work saved.")


def loadFromTextFile():
    """expects a text file containing names of traits where every odd-numbered line
    contains the name of a trait, and every even-numbered line contains the description
    of the trait named on the line above it. example:
    Adaptable
    this unit gets advantage on stuff.
    This was really useful when copying large numbers of traits."""
    with open("static/backup.txt", encoding="utf-8") as textFile:
        textLines = [line.rstrip() for line in textFile]
        index = 0
        while index < len(textLines):
            traitName = textLines[index]
            index += 1
            traitDescription = textLines[index]
            index += 1
            newTrait = Trait(traitName, traitDescription)
            DATABASE["traits"][traitName] = newTrait


if __name__ == "__main__":
    loadTraitsFromJSON(TRAITS_FILE)
    print('Either type a new trait name, or type "show" to see current trait list, or "x" to exit.')
    chooseCount = 0
    # loadFromTextFile()
    while True:
        choose()
        chooseCount += 1
        if chooseCount > 5:
            saveTraits()
            chooseCount = 0
