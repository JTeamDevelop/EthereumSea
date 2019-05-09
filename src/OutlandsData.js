const COLORS = {
  "aliceblue": "#f0f8ff",
  "antiquewhite": "#faebd7",
  "aqua": "#00ffff",
  "aquamarine": "#7fffd4",
  "azure": "#f0ffff",
  "beige": "#f5f5dc",
  "bisque": "#ffe4c4",
  "black": "#000000",
  "blanchedalmond": "#ffebcd",
  "blue": "#0000ff",
  "blueviolet": "#8a2be2",
  "brown": "#a52a2a",
  "burlywood": "#deb887",
  "cadetblue": "#5f9ea0",
  "chartreuse": "#7fff00",
  "chocolate": "#d2691e",
  "coral": "#ff7f50",
  "cornflowerblue": "#6495ed",
  "cornsilk": "#fff8dc",
  "crimson": "#dc143c",
  "cyan": "#00ffff",
  "darkblue": "#00008b",
  "darkcyan": "#008b8b",
  "darkgoldenrod": "#b8860b",
  "darkgray": "#a9a9a9",
  "darkgreen": "#006400",
  "darkgrey": "#a9a9a9",
  "darkkhaki": "#bdb76b",
  "darkmagenta": "#8b008b",
  "darkolivegreen": "#556b2f",
  "darkorange": "#ff8c00",
  "darkorchid": "#9932cc",
  "darkred": "#8b0000",
  "darksalmon": "#e9967a",
  "darkseagreen": "#8fbc8f",
  "darkslateblue": "#483d8b",
  "darkslategray": "#2f4f4f",
  "darkslategrey": "#2f4f4f",
  "darkturquoise": "#00ced1",
  "darkviolet": "#9400d3",
  "deeppink": "#ff1493",
  "deepskyblue": "#00bfff",
  "dimgray": "#696969",
  "dimgrey": "#696969",
  "dodgerblue": "#1e90ff",
  "firebrick": "#b22222",
  "floralwhite": "#fffaf0",
  "forestgreen": "#228b22",
  "fuchsia": "#ff00ff",
  "gainsboro": "#dcdcdc",
  "ghostwhite": "#f8f8ff",
  "goldenrod": "#daa520",
  "gold": "#ffd700",
  "gray": "#808080",
  "green": "#008000",
  "greenyellow": "#adff2f",
  "grey": "#808080",
  "honeydew": "#f0fff0",
  "hotpink": "#ff69b4",
  "indianred": "#cd5c5c",
  "indigo": "#4b0082",
  "ivory": "#fffff0",
  "khaki": "#f0e68c",
  "lavenderblush": "#fff0f5",
  "lavender": "#e6e6fa",
  "lawngreen": "#7cfc00",
  "lemonchiffon": "#fffacd",
  "lightblue": "#add8e6",
  "lightcoral": "#f08080",
  "lightcyan": "#e0ffff",
  "lightgoldenrodyellow": "#fafad2",
  "lightgray": "#d3d3d3",
  "lightgreen": "#90ee90",
  "lightgrey": "#d3d3d3",
  "lightpink": "#ffb6c1",
  "lightsalmon": "#ffa07a",
  "lightseagreen": "#20b2aa",
  "lightskyblue": "#87cefa",
  "lightslategray": "#778899",
  "lightslategrey": "#778899",
  "lightsteelblue": "#b0c4de",
  "lightyellow": "#ffffe0",
  "lime": "#00ff00",
  "limegreen": "#32cd32",
  "linen": "#faf0e6",
  "magenta": "#ff00ff",
  "maroon": "#800000",
  "mediumaquamarine": "#66cdaa",
  "mediumblue": "#0000cd",
  "mediumorchid": "#ba55d3",
  "mediumpurple": "#9370db",
  "mediumseagreen": "#3cb371",
  "mediumslateblue": "#7b68ee",
  "mediumspringgreen": "#00fa9a",
  "mediumturquoise": "#48d1cc",
  "mediumvioletred": "#c71585",
  "midnightblue": "#191970",
  "mintcream": "#f5fffa",
  "mistyrose": "#ffe4e1",
  "moccasin": "#ffe4b5",
  "navajowhite": "#ffdead",
  "navy": "#000080",
  "oldlace": "#fdf5e6",
  "olive": "#808000",
  "olivedrab": "#6b8e23",
  "orange": "#ffa500",
  "orangered": "#ff4500",
  "orchid": "#da70d6",
  "palegoldenrod": "#eee8aa",
  "palegreen": "#98fb98",
  "paleturquoise": "#afeeee",
  "palevioletred": "#db7093",
  "papayawhip": "#ffefd5",
  "peachpuff": "#ffdab9",
  "peru": "#cd853f",
  "pink": "#ffc0cb",
  "plum": "#dda0dd",
  "powderblue": "#b0e0e6",
  "purple": "#800080",
  "rebeccapurple": "#663399",
  "red": "#ff0000",
  "rosybrown": "#bc8f8f",
  "royalblue": "#4169e1",
  "saddlebrown": "#8b4513",
  "salmon": "#fa8072",
  "sandybrown": "#f4a460",
  "seagreen": "#2e8b57",
  "seashell": "#fff5ee",
  "sienna": "#a0522d",
  "silver": "#c0c0c0",
  "skyblue": "#87ceeb",
  "slateblue": "#6a5acd",
  "slategray": "#708090",
  "slategrey": "#708090",
  "snow": "#fffafa",
  "springgreen": "#00ff7f",
  "steelblue": "#4682b4",
  "tan": "#d2b48c",
  "teal": "#008080",
  "thistle": "#d8bfd8",
  "tomato": "#ff6347",
  "turquoise": "#40e0d0",
  "violet": "#ee82ee",
  "wheat": "#f5deb3",
  "white": "#ffffff",
  "whitesmoke": "#f5f5f5",
  "yellow": "#ffff00",
  "yellowgreen": "#9acd32"
}

const LOCATIONS = [{
  seed: "BladesOfTheOutlands",
  name: "Known Universe",
  opts: {
    n: 16,
    what: "U"
  },
  units : [],
  factions: [],
  children: ["Vast", "Aztlan", "Celestia", "Kunlun", "Shambhala", "Lemuria", "Arcadia", "Svarga", "Elysium", "Asgard", "Mechanus", "Acheron", "Gehenna", "Maelstrom", "Abyss", "Tartarus"]
}, {
  seed: "Vast",
  opts: {
    what: "O"
  },
  children: [],
  factions: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Aztlan",
  opts: {
    what: "S"
  },
  children: ["Atlantis"],
  factions: [20, 7],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Celestia",
  opts: {
    what: "S"
  },
  children: ["Tien"],
  factions: [11, 2, 15],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Kunlun",
  opts: {
    what: "S"
  },
  children: ["Penglai"],
  factions: [11, 15, 5],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Shambhala",
  opts: {
    what: "S"
  },
  children: [],
  factions: [11, 3, 19],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Lemuria",
  opts: {
    what: "S"
  },
  children: ["Hawaiki"],
  factions: [6, 23, 1],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Arcadia",
  opts: {
    what: "S"
  },
  children: ["Avalon"],
  factions: [2, 10, 13],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Svarga",
  opts: {
    what: "S"
  },
  children: [],
  factions: [6, 7],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Elysium",
  opts: {
    what: "S"
  },
  children: ["Olympus"],
  factions: [14, 7],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Asgard",
  opts: {
    what: "S"
  },
  children: ["Kitezh"],
  factions: [3, 7],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Mechanus",
  opts: {
    what: "S"
  },
  children: [],
  factions: [12, 18],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Acheron",
  opts: {
    what: "S"
  },
  children: ["Niflheim"],
  factions: [19, 16, 17],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Gehenna",
  opts: {
    what: "S"
  },
  children: ["Muspelheim"],
  factions: [25, 4, 13],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Maelstrom",
  opts: {
    what: "S"
  },
  children: [],
  factions: [9, 22],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Abyss",
  opts: {
    what: "S"
  },
  children: [],
  factions: [],
  units : [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Tartarus",
  opts: {
    what: "S"
  },
  children: ["Irkalla"],
  factions: [8, 14, 21],
  units : [],
  parent: "BladesOfTheOutlands",
}]

const FACTIONS = [{
  "id": 1,
  "name": "Aboleth",
  "color": "#1E90FF",
  "cfw": [3, 2, 3],
  "forces": ["Three eyed", "tentacled fish sorcerers; crab-centaur brutes; eel-people vassals"],
  "text": "Power hungry rulers of the ocean depths."
}, {
  "id": 2,
  "name": "Archons",
  "color": "#C0C0C0",
  "vast": "Khulay",
  "lang": "Arabic",
  "cfw": [2, 4, 3],
  "forces": ["Dour", "highly skilled soldiers; Empathic", "incorruptible judges; clairvoyant", "connected investigators"],
  "text": "Judges and police of the vast frontiers of the Universe."
}, {
  "id": 3,
  "name": "Asgardian",
  "color": "#DAA520",
  "vast": "Valldalen",
  "lang": "Nordic",
  "cfw": [3, 5, 3],
  "forces": ["Battle scarred veteran; flashy", "lightning weilding evoker; boisterous brawny warrior"],
  "text": "Vigilant warriors locked in an eternal war with the Titans and Giants."
}, {
  "id": 4,
  "name": "Blackflame",
  "color": "#8B0000",
  "cfw": [2, 5, 3],
  "forces": ["Onyx armored", "fire giant reaver; fire wyrms; orc shock troopers"],
  "text": "Giant ravagers - they would burn the whole Universe with fire given the opportunity."
}, {
  "id": 5,
  "name": "Blood of Tiamat",
  "color": "#DC143C",
  "npc": "Azure Desert Fire",
  "vast": "Gahreb Desert",
  "lang": "Arabic",
  "cfw": [3, 5, 4],
  "forces": "Titanic chromatic dragon tyrants; Haughty Dragonborn proxies; Sharp eyed hunting drakes",
  "text": "Dragon tyrants who used to serve the fallen queen."
}, {
  "id": 6,
  "name": "Deva",
  "color": "#FFA500",
  "vast": "Ajayameru",
  "lang": "Hindi",
  "cfw": [2, 2, 3],
  "text": "Esoteric elementals whose quest is to uncover the secrets of the Universe."
}, {
  "id": 7,
  "name": "Fae",
  "color": "#20B2AA",
  "vast": "Grwarthaf",
  "lang": "Gaelic",
  "cfw": [2, 1, 2],
  "text": "Free spirited embodiments of nature."
}, {
  "id": 8,
  "name": "Gaolarch",
  "color": "#A0522D",
  "npc": ["Ian Holdsworth - shrewd", "determined", "optimistic"],
  "vast": "Ironhold Islands",
  "lang": "English",
  "cfw": [2, 3, 2],
  "text": "Self proclaimed jailers of the prison sector Tartarus."
}, {
  "id": 9,
  "name": "Goblyns",
  "color": "#808000",
  "cfw": [1, 2, 0],
  "text": "Animalistic beings made from the elements themselves"
}, {
  "id": 10,
  "name": "Guardians",
  "color": "#FFD700",
  "vast": "Ileje",
  "lang": "Swahili",
  "cfw": [2, 3, 4],
  "text": "Roving protectors of the innocent and oppressed."
}, {
  "id": 11,
  "name": "Jade Empire",
  "color": "#3CB371",
  "vast": "Xincai",
  "lang": "Chinese",
  "cfw": [4, 3, 5],
  "text": "Scolars, merchants and mystics seeking to return order to the Universe."
}, {
  "id": 12,
  "name": "Mechans",
  "color": "#800080",
  "vast": "Epsilon Seven",
  "lang": "English",
  "cfw": [2, 4, 5],
  "text": ["Forge Worlds", "Primes", "Hedrons"]
}, {
  "id": 13,
  "name": "Myr",
  "color": "#00008B",
  "cfw": [3, 2, 3],
  "text": "Shadow sorcerers who scour the Known Universe for powerful relics of the past."
}, {
  "id": 14,
  "name": "Olympian",
  "color": "#F08080",
  "vast": "Novus Olympus",
  "lang": "Greek",
  "cfw": [3, 3, 5],
  "text": "Children of the Titans vacillating between idyl and epic. "
}, {
  "id": 15,
  "name": "Platinum Star",
  "color": "#DCDCDC",
  "vast": "Aomori",
  "lang": "Japan",
  "cfw": [3, 3, 3],
  "text": "Draconic paladins who serve the legacy of the fallen Bahamut."
}, {
  "id": 16,
  "name": "Sect",
  "color": "#ADFF2F",
  "cfw": [1, 2, 3],
  "text": "Cosmic devouring horde of large robotic insects."
}, {
  "id": 17,
  "name": "Shadowsteel Syndicate",
  "color": "#6A5ACD",
  "npc": "Nigel Urquest",
  "vast": "yes",
  "lang": "English",
  "cfw": [3, 1, 2],
  "text": "Renowned vice dealers, thieves, spies and assassins."
}, {
  "id": 18,
  "name": "StarHive",
  "color": "#9ACD32",
  "cfw": [1, 5, 1],
  "text": "Building sized monstrosities that only seen to devour and spawn new horrors."
}, {
  "id": 19,
  "name": "Sons of Ymir",
  "color": "#B0C4DE",
  "vast": "Svalbard",
  "lang": "Nodric",
  "cfw": [3, 3, 3],
  "text": "Giants who seek to ursurp the power given to to Asgardians."
}, {
  "id": 20,
  "name": "Starlords",
  "color": "#D2691E",
  "vast": "Chicomoztoc",
  "cfw": [2, 2, 3],
  "lang": "Nahuatl"
}, {
  "id": 21,
  "name": "Cult of Cronus",
  "color": "#2F4F4F",
  "cfw": [5, 2, 2],
  "text": "Servants of the imprisoned Titan Lord who are always seeking his freedom."
}, {
  "id": 22,
  "name": "Xaoti",
  "color": "#FF00FF",
  "cfw": [1, 2, 1],
  "text": "Chaos incarnate. No goals or one goal - create more chaos."
}, {
  "id": 23,
  "name": "Wardens",
  "color": "#8FBC8B",
  "vast": "Sankuru",
  "lang": "Swahili",
  "cfw": [4, 3, 2],
  "text": "Hunters always on the lookout for signs of ancient darkness."
}, {
  "id": 24,
  "name": "Worms",
  "color": "#F5DEB3",
  "cfw": [4, 1, 3],
  "text": "Insidious possessors, flesh warpers, and powers behind the throne."
}, {
  "id": 25,
  "name": "Yuloth",
  "color": "#BDB76B",
  "vast": "Kirov",
  "lang": "Russian",
  "cfw": [2, 3, 4],
  "text": "War profiteers, arms manufacturers, and dealers in dangerous relics."
}, ]

const UNITS = [{
  id: 1,
  name: "Engineers",
  text: "builds and sabotages",
  who: ""
}, {
  id: 2,
  name: "Fighters",
  text: "attacks and maneuvers"
}, {
  id: 3,
  name: "Diplomats",
  text: "influences and socializes"
}, {
  id: 4,
  name: "Scholars",
  text: "thinks and discovers"
}, {
  id: 5,
  name: "Rogues",
  text: "sneaks and deceives"
}, {
  id: 6,
  name: "Explorers",
  text: "evades and navigates"
}, ]

export {COLORS, UNITS, LOCATIONS, FACTIONS}

/*
[
  {id:0,name:"Chaos"},
  {id:1,name:"Ryk"},
  {id:2,name:"Shadowsteel Syndicate"},
  {id:3,name:"Zytam"},
  {id:4,name:"Rylenthrax"},
  {id:5,name:"Levithan"},
  {id:6,name:"Cthonians"},
  {id:7,name:"Sect"},
  {id:8,name:"Iron Oak"},
  {id:9,name:"Dzintari"},
  {id:10,name:"Goblins"},
]
*/
