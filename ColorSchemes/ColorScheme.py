class ColorScheme:
    def __init__(self, data_dict: dict):
        name = list(data_dict)[0]
        self.name = name
        colors = data_dict[name]
        background_color = colors["Background Color"]
        light_color = colors["Light Color"]
        dark_color = colors["Dark Color"]
        filigree_color = colors["Filigree Color"]
        self.background_color = background_color
        self.light_color = light_color
        self.dark_color = dark_color
        self.filigree_color = filigree_color

    def toJSON(self):
        return { self.name:
            {
                "Background Color": self.background_color,
                "Light Color": self.light_color,
                "Dark Color": self.dark_color,
                "Filigree Color": self.filigree_color,
            }
        }
