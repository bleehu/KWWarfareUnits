from enum import Enum

from ..Trait import Trait


class Unit:
    class Type(Enum):
        INFANTRY = 1
        ARTILLERT = 2
        CAVALRY = 3
        AERIAL = 4

    class Experience(Enum):
        LEVIES = 1
        REGULAR = 2
        VETERAN = 3
        ELITE = 4
        SUPER_ELITE = 5

    class Equipment(Enum):
        LIGHT = 1
        MEDIUM = 2
        HEAVY = 3
        SUPER_HEAVY = 4

    def __init__(self, name: str, description: str, type: Type):
        self.name = name
        self.description = description
        self.battles = 0
        self.traits = []
        self.type = type
        self.experience = Unit.Experience.REGULAR
        self.equipment = Unit.Equipment.LIGHT
        self.damage = 1
        self.attacks = 1

    def add_trait(self, trait: Trait):
        if len(self.traits) < 5:
            self.traits.append(trait)
        else:
            raise Exception("This unit already has 4 traits!")

    def battle(self):
        self.battles = self.battles + 1

    def upgrade(self):
        if self.Experience == Unit.Experience.LEVIES:
            raise Exception("Cannot upgrade Levies")
        if self.Equipment == Unit.Equipment.SUPER_HEAVY:
            raise Exception("Cannot upgrade equipment past super-heavy.")
        self.equipment = self.equipment + 1

    def level_up(self):
        if self.experience == Unit.Experience.LEVIES:
            raise Exception("Cannot level up levies.")
        if self.experience == Unit.Experience.SUPER_ELITE:
            raise Exception("Cannot level up a unit past Super-elite.")
        self.experience = self.experience + 1

    def level_down(self):
        if self.experience == Unit.Experience.LEVIES:
            raise Exception("Cannot level down levies.")
        if self.experience == Unit.Experience.REGULAR:
            raise Exception("Cannot lower level below regular.")
        self.experience = self.experience - 1
