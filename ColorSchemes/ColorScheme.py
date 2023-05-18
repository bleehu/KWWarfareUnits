class ColorScheme:
    
    def __init__(self, name:str, background_color:str, light_color: str, dark_color: str, filigree_color:str):
        self.name = name
        self.light_color = light_color
        self.dark_color = dark_color
        self.background_color = background_color
        self.filigree_color = filigree_color

    def __init__(self, data_dict:dict):
        background_color = data_dict["backgroundColor"]
        light_color = data_dict["lightColor"]
        dark_color = data_dict["darkColor"]
        filigree_color = data_dict["filigreeColor"]
        self.background_color = background_color
        self.light_color = light_color
        self.dark_color = dark_color
        self.filigree_color = filigree_color
        self.name = data_dict["name"]
    
    def toJSON(self):
        return {"name": self.name,
                      "Background Color": self.background_color,
                      "Light Color": self.light_color,
                      "Dark Color": self.dark_color,
                      "Filigree Color": self.filigree_color}