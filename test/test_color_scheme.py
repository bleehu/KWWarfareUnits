from ..ColorSchemes.ColorScheme import ColorScheme


def test_color_scheme_class():
    background_color = "#000000"
    light_color = "#ff00ff"
    dark_color = "#0a000a"
    filigree_color = "#00bb00"
    constructor_dict = {
        "name":"Splonks",
        "backgroundColor":background_color,
        "lightColor":light_color,
        "darkColor":dark_color,
        "filigreeColor":filigree_color
    }
    Splonks = ColorScheme(constructor_dict)
    assert Splonks.name == "Splonks"
    assert Splonks.background_color == background_color
    assert Splonks.light_color == light_color
    assert Splonks.dark_color == dark_color
    assert Splonks.filigree_color == filigree_color
    splonk_map = Splonks.toJSON()
    assert splonk_map["name"] == "Splonks"
    assert splonk_map["Background Color"] == background_color
    assert splonk_map["Light Color"] == light_color
    assert splonk_map["Dark Color"] == dark_color
    assert splonk_map["Filigree Color"] == filigree_color
