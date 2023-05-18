class Color:

    def __init__(self, red: str, green: str, blue: str):
        self.red = red
        self.green = green
        self.blue = blue
    
class ColorScheme:
    
    def __init__(self, name:str, background_color:Color, light_color: Color, dark_color: Color, filigree_color:Color):
        self.name = name
        self.light_color = light_color
        self.dark_color = dark_color
        self.background_color = background_color
        self.filigree_color = filigree_color

    def __init__(self, data_dict:dict):
        background_color = Color(data_dict["background_red"], data_dict["background_green"], data_dict["background_blue"])
        light_color = Color(data_dict["light_red"], data_dict["light_green"], data_dict["light_blue"])
        dark_color = Color(data_dict["dark_red"], data_dict["dark_green"], data_dict["dark_blue"])
        filigree_color = Color(data_dict["filigree_red"], data_dict["filigree_green"], data_dict["filigree_blue"])
        self.background_color = background_color
        self.light_color = light_color
        self.dark_color = dark_color
        self.filigree_color = filigree_color
        self.name = data_dict["name"]    