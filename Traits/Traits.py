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