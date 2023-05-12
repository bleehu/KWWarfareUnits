import uuid


class Kingdom:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.available = {}
        self.armies = {}
