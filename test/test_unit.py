import pytest

from ..KingdomsAndWarfare.Trait.Trait import Trait
from ..KingdomsAndWarfare.Unit.Unit import Unit


# testing the unit class, not to be confused with unit tests...
# ... ok, these are unit tests, too, but still...
def test_unit():
    unit_name = "Splonks Infantry"
    unit_description = "Splonks with swords, mostly."
    splonks = Unit(unit_name, unit_description, Unit.Type.INFANTRY)

    assert splonks.name == unit_name
    assert splonks.description == unit_description

    magic_resistant = Trait("Magic Resistant", "this unit is resitant to magic")
    splonks.add_trait(magic_resistant)
    test_trait = splonks.traits[0]
    assert test_trait == magic_resistant

def test_levelup():
    splonks = Unit("Splonks Infantry", "Splonks with knives.", Unit.Type.INFANTRY)
    assert splonks.battles == 0
    assert splonks.experience == Unit.Experience.REGULAR
    splonks.battle()
    assert splonks.battles == 1
    assert splonks.experience == Unit.Experience.VETERAN
    splonks.battle()
    splonks.battle()
    splonks.battle()
    assert splonks.battles == 4
    assert splonks.experience == Unit.Experience.ELITE
    for index in range(4):
        splonks.battle()
    assert splonks.battles == 8
    assert splonks.experience == Unit.Experience.SUPER_ELITE
    with pytest.raises(Exception):
        splonks.level_up()

def test_levelup_levies():
    splonks = Unit("Splonks levies", "Splonk levies use pumpkins as balaclavas.", Unit.Type.INFANTRY)
    splonks.experience = Unit.Experience.LEVIES
    with pytest.raises(Exception):
        splonks.level_up()

def test_upgrade_infantry():
    infantry = Unit("Splonks Infantry", "Splonkitude", Unit.Type.INFANTRY)
    assert infantry.Equipment == Unit.Equipment.LIGHT
    infantry.upgrade()
    assert infantry.Equipment == Unit.Equipment.MEDIUM
    infantry.upgrade()
    assert infantry.Equipment == Unit.Equipment.HEAVY
    infantry.upgrade()
    assert infantry.Equipment == Unit.Equipment.SUPER_HEAVY
    with pytest.raises(Exception):
        infantry.upgrade()

def test_upgrade_levies():
    levies = Unit("Splonks Levies", "Cucumbers", Unit.Type.INFANTRY)
    levies.experience = Unit.Experience.LEVIES
    with pytest.raises(Exception):
        levies.upgrade()