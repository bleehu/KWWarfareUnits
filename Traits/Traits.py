from datetime import datetime

class Trait:

	def __init__(self, name, description):
		self.name = name
		self.description = description
		self.created = str(datetime.now())
		self.homebrew = True

	def toDict(self):
		return {
			"name": self.name,
			"description": self.description,
			"created": self.created,
			"homebrew": self.homebrew
			}

	def fromDict(traitDict):
		newTrait = Trait(traitDict["name"], traitDict["description"])
		newTrait.homebrew = traitDict["homebrew"]
		newTrait.created = traitDict["created"]
		return newTrait