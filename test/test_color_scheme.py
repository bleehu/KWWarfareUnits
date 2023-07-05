from ..ColorSchemes.ColorScheme import ColorScheme


def test_color_scheme_class():
    name = "Splonks"
    background_color = "#000000"
    light_color = "#ff00ff"
    dark_color = "#0a000a"
    filigree_color = "#00bb00"
    constructor_dict = { name:
        {
            "Background Color":background_color,
            "Light Color":light_color,
            "Dark Color":dark_color,
            "Filigree Color":filigree_color
        }
    }
    Splonks = ColorScheme(constructor_dict)
    assert Splonks.background_color == background_color
    assert Splonks.light_color == light_color
    assert Splonks.dark_color == dark_color
    assert Splonks.filigree_color == filigree_color
    splonk_scheme = Splonks.toJSON()
    splonk_map = splonk_scheme[name]
    assert splonk_map["Background Color"] == background_color
    assert splonk_map["Light Color"] == light_color
    assert splonk_map["Dark Color"] == dark_color
    assert splonk_map["Filigree Color"] == filigree_color
