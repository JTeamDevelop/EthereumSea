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
  units: [],
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
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Celestia",
  opts: {
    what: "S"
  },
  children: ["Tien"],
  factions: [11, 2, 15],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Kunlun",
  opts: {
    what: "S"
  },
  children: ["Penglai"],
  factions: [11, 15, 5],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Shambhala",
  opts: {
    what: "S"
  },
  children: [],
  factions: [11, 3, 19],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Lemuria",
  opts: {
    what: "S"
  },
  children: ["Hawaiki"],
  factions: [6, 23, 1],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Arcadia",
  opts: {
    what: "S"
  },
  children: ["Avalon"],
  factions: [2, 10, 13],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Svarga",
  opts: {
    what: "S"
  },
  children: [],
  factions: [6, 7],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Elysium",
  opts: {
    what: "S"
  },
  children: ["Olympus"],
  factions: [14, 7],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Asgard",
  opts: {
    what: "S"
  },
  children: ["Kitezh"],
  factions: [3, 7],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Mechanus",
  opts: {
    what: "S"
  },
  children: [],
  factions: [12, 18],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Acheron",
  opts: {
    what: "S"
  },
  children: ["Niflheim"],
  factions: [19, 16, 17],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Gehenna",
  opts: {
    what: "S"
  },
  children: ["Muspelheim"],
  factions: [25, 4, 13],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Maelstrom",
  opts: {
    what: "S"
  },
  children: [],
  factions: [9, 22],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Abyss",
  opts: {
    what: "S"
  },
  children: [],
  factions: [],
  units: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Tartarus",
  opts: {
    what: "S"
  },
  children: ["Irkalla"],
  factions: [8, 14, 21],
  units: [],
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

const CREWABILITIES = [
  [1,"Deadly", "Each PC may add +1 action rating to Hunt, Prowl, or Skirmish (up to a max rating of 3)."], 
  [2,"Crow's Veil", "Due to hard-won experience or occult ritual, your activities are hidden from the notice of the death-seeker crows. You don't take extra heat when killing is involved on a score."], 
  [3,"Emberdeath", "Due to hard-won experience or occult ritual, you know the arcane method to destroy a living victim's spirit at the moment you kill them. Take 3 stress to channel electroplasmic energy from the ghost field to disintegrate the spirit and dead body in a shower of sparking embers."], 
  [4,"No Traces", "When you keep an operation quiet or make it look like an accident, you get half the rep value of the target (round up) instead of zero. When you end downtime with zero heat, take +1 rep."], 
  [5,"Patron", "When you advance your Tier, it costs half the coin it normally would. Who is your patron? Why do they help you?"], 
  [6,"Predators", "When you use stealth or subterfuge to commit murder, take +1d to the engagement roll."], 
  [7,`Vipers`, `When you acquire or craft poisons, you get +1 result level to your roll. When you employ a poison, you are specially prepared to be immune to its effects.`], 
  [8,`Dangerous`,`Each PC may add +1 action rating to Hunt, Skirmish, or Wreck (up to a max rating of 3).`],
  [9,`Blood Brothers`,`When you fight alongside your cohorts in combat, they get +1d for teamwork rolls (setup and group actions). All of your cohorts get the Thugs type for free (if they're already Thugs, add another type).`],
  [10,`Door Kickers`,`When you execute an assault plan, take +1d to the engagement roll.`],
  [11,`Fiends`,`Fear is as good as respect. You may count each wanted level as if it was turf.`],
  [12,`Forged in the Fire`,`Each PC has been toughened by cruel experience. You get +1d to resistance rolls.`],
  [13,`War Dogs`,`When you’re at war (-3 faction status), your crew does not suffer -1 hold and PCs still get two downtime activities, instead of just one.`],
  [14,`Silver Tongues`,`Each PC may add +1 action rating to Command, Consort, or Sway (up to a max rating of 3).`],
  [15,`Accord`,`Sometimes friends are as good as territory. You may count up to three +3 faction statuses you hold as if they are turf.`],
  [16,`The Good Stuff`,`Your merchandise is exquisite. The product quality is equal to your Tier+2. When you deal with a crew or faction, the GM will tell you who among them is hooked on your product (one, a few, many, or all).`],
  [17,`Ghost Market`,`Through arcane ritual or hard-won experience, you have discovered how to prepare your product for sale to ghosts and/or demons. They do not pay in coin. What do they pay with?`],
  [18,`High Society`,`It's all about who you know. Take -1 heat during downtime and +1d to gather info about the city's elite.`],
  [19,`Hooked`,`Your gang members use your product. Add the savage, unreliable, or wild flaw to your gangs to give them +1 quality.`],
  [20,`Chosen`,`Each PC may add +1 action rating to Attune, Study, or Sway (up to a max rating of 3).`],
  [21,`Anointed`,`You get +1d to resistance rolls against supernatural threats. You get +1d to healing rolls when you have supernatural harm.`],
  [22,`Bound in Darkness`,`You may use teamwork with any cult member, regardless of the distance separating you. By taking 1 stress, your whispered message is heard by every cultist.`],
  [23,`Conviction`,`Each PC gains an additional Vice: Worship. When you indulge this vice and bring a pleasing sacrifice, you don't overindulge if you clear excess stress. In addition, your deity will assist any one action roll you make—from now until you indulge this vice again.`],
  [24,`Glory Incarnate`,`Your deity sometimes manifests in the physical world. This can be a great boon, but the priorities and values of a god are not those of mortals. You have been warned.`],
  [25,`Sealed in Blood`,`Each human sacrifice yields -3 stress cost for any ritual you perform.`],
  [26,`Zealotry`,`Your cohorts have abandoned their reason to devote themselves to the cult. They will undertake any service, no matter how dangerous or strange. They gain +1d to rolls against enemies of the faith.`],
  [27,`Everyone Steals`,`Each PC may add +1 action rating to Prowl, Finesse, or Tinker (up to a max rating of 3).`],
  [28,`Ghost Echoes`,`From weird experience or occult ritual, all crew members gain the ability to see and interact with the ghostly structures, streets, and objects within the echo of Doskvol that exists in the ghost field.`],
  [29,`Pack Rats`,`Your lair is a jumble of stolen items. When you roll to acquire an asset, take +1d.`],
  [30,`Second Story`,`When you execute a clandestine infiltration, you get +1d to the engagement roll.`],
  [31,`Slippery`,`When you roll entanglements, roll twice and keep the one you want. When you reduce heat on the crew, take +1d.`],
  [32,`Synchronized`,`When you perform a group action, you may count multiple 6s from different rolls as a critical success.`],
  [33,`Like Part of the Family`,`Create one of your vehicles as a cohort (use the vehicle edges and flaws, below). Its quality is equal to your Tier +1.`],
  [34,`All Hands`,`During downtime, one of your cohorts may perform a downtime activity for the crew to acquire an asset, reduce heat, or work on a long-term project.`],
  [35,`Ghost Passage`,`From harsh experience or occult ritual, all crew members become immune to possession by spirits, but may choose to "carry" a second ghost as a passenger within their body.`],
  [36,`Just Passing Through`,`During downtime, take -1 heat. When your heat is 4 or less, you get +1d to deceive people when you pass yourselves off as ordinary citizens.`],
  [37,`Leverage`,`Your crew supplies contraband for other factions. Your success is good for them. Whenever you gain rep, gain +1 rep.`],
  [38,`Reavers`,`When you go into conflict aboard a vehicle, you gain +1 effect for vehicle damage and speed. Your vehicle gains armor.`],
  [39,`Renegades`,`Each PC may add +1 action rating to Finesse, Prowl, or Skirmish (up to a max rating of 3).`],
  [40,`Licensed`,`Take -2 heat on any legitimate bounty hunting job. Your ship can carry particle weapons, and your crew can carry and legally use heavy blasters in the pursuit of a target.`],
  [41,`On The Trail`,`Your crew gains an extra downtime activity to work on long term projects that track bounties that have gone to ground.`],
  [42,`Light Touch`,`You gain potency when tailing a target, or when gathering info at a target's previous location.`],
  [43,`Snatch'N'Grab`,`When you use a deception, infiltration, or social plan to execute a kidnapping, add +1d to the engagement roll.`],
  [44,`Loaded for Bear`,`Your crew can carry +1 load. They have distinctive and high quality armor. When you wear armor, it counts as heavy armor (2 uses).`],
  [45,`Play Both Sides`,`When you release a bounty target, make them a crew contact and add +2 heat.`],
  [46,`Deadly`,`Each crew member may add 1 action rating to command, scrap, or skulk (up to a max of 3).`],
  [47,`The Getaway`,`You gain potency when you scramble or helm to avoid capture or run a blockade. When doing a delivery job, take +1d to the engagement roll.`],  [48,`Cargo Eye`,`Your crew gains +1 cred for smuggling or delivery jobs. Whenever you gather info you can always ask: what is most valuable here?`],
  [49,`Graduate`,`Each PC may add +1 action rating to Interface, Study, or Sway (up to a max rating of 3).`],
  [50,`Experimentation`,`Each PC gains an additional tragedy: Experimentation. When you cut loose with a focus on experimentation and gather a significant data set, you don't overindulge if you clear excess stress. In addition, your theories will give you +1d on any one action roll you make—from now until you cut loose again.`],
  [51,`Irons In The Fire`,`Your squad is excellent at multitasking. When you work on long term projects during downtime and have multiple incomplete projects, you get +1d but must split the resulting ticks between the projects as evenly as possible.`],
]

const CREWUPGRADES = [
  //core
  [1,2,`Carriage House`],
  [2,2,`Boat House`],
  [3,1,`Hidden`],
  [4,1,`Quarters`],
  [5,2,`Secure`],
  [6,2,`Vault`],
  [7,1,`Workshop`],
  [8,1,`Insight`],
  [9,1,`Prowess`],
  [10,1,`Resolve`],
  [11,1,`Playbook`],
  [12,4,`Mastery`],
  [13,1,`Documents`],
  [14,1,`Gear`],
  [15,1,`Implements`],
  [16,1,`Supplies`],
  [17,1,`Tools`],
  [18,1,`Armory`],
  //Scum and Villainy
  [19,2,`Shuttle`,`A small space-craft capable of carrying a few people from planet to orbit. Limited systems capacity - treat any system as quality 0 vs actual ships. Can attach to airlocks, but best stored in a landing bay if you don't want stray asteroids/fire affecting it.`],
  [20,2,`Land Transport`,`Enough land-transportation for the entire crew. Tires or close-to-ground hover. These may be motorized bikes, land-skimmers, or very small cars.`],
  [21,1,`Recon Drone: A small drone for surveillance, mapping, and intelligence gathering. Can be given simple instructions. Search the mine for heat signatures. Uses Comms quality when contested.`],
  [22,1,`Survival Gear: Camping gear, rebreathers, climbing equipment, scuba gear. Everything an enterprising crew needs to survive on an inhospitable, but not uninhabitable, rock. Stillsuits included.`],
  [23,1,`Armory`],
  //S&V Cerberus
  [24,1,`Tracers`,`A wide array of ways to track your targets. Includes tiny bugs that can be hidden on clothes with a suave pat on the back, beacons that can attach to hulls, and even bugs for comms. Legality varies.`],
  [24,1,`Stun Weapons`,`A variety of weapons for capturing and securing prisoners without (serious) harm. Includes, but is not limited to: restraints (0 load), stun batons (1 load), stun settings on normal blasters (not the heavy kind), and even stun grenades (replace detonators on sheet), knockout drugs (0 load, may not work on some xenos). Not required to bring on jobs, but useful if you want to claim bounties. Generally legal.`],
  [24,2,`Personal Vehicles`,`Sleek small craft that can fold up tight enough to fit into a reasonable parking space. Limited fuel, but can break atmo. Can carry basic weapons, though they can't seriously damage anything freighter-sized or larger. You may want a landing bay.`],
  [24,2,`Hard Knocks (+1 gambit)`,`Sometimes luck is just hard-earned experience. Your crew starts each job with +1 gambit.`],
  [24,3,`Smooth Criminal (+1 stress)`,`Sometimes legality is only a question of who has the gun. +1 stress box (total 10).`],
  //
  [1,1,`Assassin rigging (2 free load of weapons or gear)`],
  [2,1,`Ironhook Contacts (+1 Tier in prison)`],
  [3,1,`Elite Skulks`],
  [4,1,`Elite Thugs`],
  [5,2,`Hardened (+1 trauma box)`]
]

const CREWS = [{
  id: 1,
  name: "Envoys",
  abilities : [14,15,18,5],
  text: ""
}, {
  id: 2,
  name: "Falcons",
  text: "Private Investigators, Bounty Hunters, Mercs",
  abilities : [8,9,10,11,12,13,5],
  upgrades : []
}, {
  id: 3,
  name: "Profiteers",
  text: "Merchants, Smugglers",
  abilities : [16,34,36,37,47,48],
}, {
  id: 4,
  name: "Owls",
  text: "Scientists, Engineers, Arcane",
  abilities : [49,50,51],
}, {
  id: 5,
  name: "Shadows",
  abilities : [27,29,30,31,32],
  text: ""
}, ]

const CHARACTERABILITIES = [
  //EMPATH
  [1,`Psychologist`,`When you gather information to discover the personality, motivation, or ambition of a person gain +1 effect. When you get +1d to rolls when you socially interact with that person.`],
  [2,`Socialite`,`You gain +1d to Consort when you gather information on a target for a score. You get +1d to the engagement roll for that operation.`],
  [3,`Empathic Read`,`You always know when someone is lying to you.`],
  [4,`Telepathic Influence`,`You may push yourself to cloud a target's mind and sway them in the face of contradictory evidence. Spend 1 stress for each additional feature: they have only vague memories of the event — it works on a small group.`],
  [5,`Connected`,`During downtime, you get +1d when you acquire assets or lay low. Any time you gather info take +1d.`],
  [6,`Subterfuge`,`You may expend your special armor to resist a consequence of persuasion or suspicion. When you resist with insight, gain +1d.`],
  [7,`Councilor`,`When you provide meaningful insight or heartfelt advice that a crewmate follows, you both clear 1 stress.`],
  [8,`Old Friends`,`Whenever you land in a new location, write down a friend you know there (see Influential Friends below).`],
  [9,`Disarming`,`Whenever you use a gambit while speaking, hostilities and danger also pause while you speak.`],
  //FIGHTER
  [10,`Battleborn`,`You may expend your special armor to reduce harm from an attack in combat or to push yourself during a fight.`],
  [11,`Bodyguard`,`When you protect a teammate, take +1d to your resistance roll. When you gather info to anticipate possible threats in the current situation, you get +1 effect.`],
  [12,`Leader`,`When you Command a cohort in combat, they continue to fight when they would otherwise break (they're not taken out when they suffer level 3 harm). They gain +1 effect and 1 armor.`],
  [13,`Mule`,`Your load limits are higher. Light: 5. Normal: 7. Heavy: 8.`],
  [14,`Vigorous`,`You recover from harm faster. Permanently fill in one of your healing clock segments. Take +1d to healing treatment rolls.`],
  [15,`Sharpshooter`,`You can push yourself to do one of the following: make a ranged attack at extreme distance beyond what’s normal for the weapon—unleash a barrage of rapid fire to suppress the enemy.`],
  [16,`Tough as Nails`,`Penalties from harm are one level less severe (though level 4 harm is still fatal).`],
  [17,`Not to be Trifled With`,`You can push yourself to do one of the following: perform a feat of physical force that verges on the superhuman - engage a small gang on equal footing in close combat.`],
  [18,`Wrecking Crew`,`Your strength and ferocity are infamous. When striking in melee, you gain +1d. Whenever you spend a gambit in combat, you also gain potency on that action.`],
  //OPERATIVE
  [19,`Infiltrator`,`You are not affected by quality or Tier when you bypass security measures.`],
  [20,`Ambush`,`When you attack from hiding or spring a trap, you get +1d.`],
  [21,`Daredevil`,`When you roll a desperate action, you get +1d to your roll if you also take -1d to any resistance rolls against consequences from your action.`],
  [22,`Boosted Agility`,`When you push yourself, choose one of the following additional benefits: perform a feat of athletics that verges on the superhuman—maneuver to confuse your enemies so they mistakenly attack each other.`],
  [23,`Expertise`,`Choose one of your action ratings. When you lead a group action using that action, you can suffer only 1 stress at most regardless of the number of failed rolls.`],
  [24,`Ghost`,`You may shift partially into the Ethereal, becoming shadowy and insubstantial for a few moments. Take 2 stress when you shift, plus 1 stress for each extra feature: It lasts for a few minutes rather than moments—you are invisible rather than shadowy—you may float through the air like a ghost.`],
  [25,`Reflexes`,`When there's a question about who acts first, the answer is you (two characters with Reflexes act simultaneously).`],
  [26,`Shadow`,`You may expend your special armor to resist a consequence from detection or security measures, or to push yourself for a feat of athletics or stealth.`],
  //OUTLANDER
  [27,`Ranger`,`You have the ability to locate and navigate the paths to reach the Outlands. Use Attune to hone in on the location of the paths. You can take a number of people with you to the Outlands but it causes Stress to do so.`],
  [28,`Pathfinder`,`Choose an environment in which you act as a quality guide. If you Protect the crew from consequences due to engagement in one of these zones take +1d and mark XP. Take this ability again to choose additional environments.`],
  [29,`Scout`,`When you gather info to locate a target or way forward, you get +1 effect. When you hide in a prepared position or use camouflage, you get +1d to rolls to avoid detection.`],
  [30,`Outland Bond`,`Your pet is imbued with the essence of the Outlands. It gains potency when tracking or fighting the supernatural, and gains an arcane ability: ghost-form, mind-link, or arrow-swift. Take this ability again to choose an additional arcane ability for your pet.`],
  [31,`Fortitude`,`You may expend your special armor to resist a consequence of fatigue, weakness, or chemical effects, or to push yourself for ranged combat or tracking.`],
  [32,`Otherworldly`,`The Outlands has imbued you with a presence that others find unnerving. When you Command an unsettled target, take +1d.`],
  [33,`Rook's Gambit`,`Take 2 stress to roll your best action rating while performing a different action. Say how you adapt your skill to this us.`],
  [34,`Tough as Nails`,`Penalties from harm are one level less severe (though level 4 harm is still fatal).`],
  [35,`Survivor`,`From hard won experience you are immune to poison and you are always able to find and subsist on the flora and fauna of the Outlands. You get +1 stress box.`],
  //PROXY
  [36,`Mystic`,`You can spend a gambit instead of paying any stress cost. When you start select Mystic or Cosmic Bond.`],
  [37,`Cosmic Bond`,`You are bound/have bound yourself in the service of a Cosmic or Cosmic organization. Say their name and describe how the power within physically manifests to identify you (noticeable aura, striking physical appearance, etc). In return they have empowered you. When you spend a downtime action communicating / reporting to your benefactor set your Power to 3. You may spend 1 Power instead of 2 stress to push yourself. You may also spend a Power to resist a source of physical or mundane harm. If do not spend a downtime action to communicate you lose 1 Power. When you start select Mystic or Cosmic Bond.`],
  [38,`Burn Bright`,`You may push yourself twice.`],
  [39,`Might`,`You may spend a Power to attempt of superhuman strength, agility, or endurance (run across ropes, bend iron with your hands, deflect bullets with your empty palms, etc) or project your cosmic power in a wave of energy.`],
  [40,`Beyond Flesh and Blood`,`While you have at least one Power your flesh and bones are filled with cosmic essence. You do not need to eat, sleep, or breathe. Your body is a fine holy weapon and grants Potency against the enemies of your Cosmic’s Faction.`],
  [41,`Cosmic Oracle`,`When you Gather Information you may Attune to communicate with your benefactor and tap into their vast information network. Take +1d when acting on the answers.`],
  [42,`Protector`,`when you protect a teammate, take +1d to your Resistance roll. When you gather info to anticipate possible threats in the current situation you get +1 effect.`],
  [43,`Lay on Hands`,`When you have a moment of respite and calm you may spend 2 Power to remove one harm from an ally you can touch skin to skin.`],
  [44,`Greater Favor`,`The Power you gain from your downtime in communication is increased to 4. If you take this ability a second time it becomes 5. Each time you take this ability you lose 1 contact as you devote more of your life to working your benefactor’s goals.`],
  [45,`Thaumaturgy`,`While you have at least 1 Power you may make yourself a conduit for the cosmic energy you store. You may Attune to call on your benefactor's elemental domains and bend them to your will. Say the effect you want and the GM will tell you what you risk and/or what harm you suffer.`],
  [46,`Enhanced`,`The bond with your benefactor has enhanced your natural capability. Choose an Action and say how it represents your benefactor’s focus / attributes. You gain +1d in this Action as long as you have at least 1 Power. If you ever have 0 Power take -1d in this Action. You may take this twice choosing a different action each time.`],
  //ROGUE
  [47,`Serendipitous`,`Your crew starts with +1 gambit when the pool resets.`],
  [48,`Never Tell Me the Odds`,`You also generate gambits on desperate rolls. You may also generate gambits even if you spent a gambit. `],
  [49,`I Know a Guy`,`When you first dock at a port after being away, pick one and ask the GM about a job: it's not deadly -- it pays well enough -- it's not a rush job -- it comes from a faction you trust -- it targets an enemy you have. You may spend 1 cred per additional feature.`],
  [50,`Tenacious`,`Penalties from harm are one level less severe (though level 4 harm is still fatal).`],
  [51,`Devil's Own Luck`,`You may expend your special armor to resist the consequences of blaster fire, or to push yourself when talking your way out of or running from trouble.`],
  [52,`Shoot First`,`When you attack from hiding or spring a trap, take +1d. When there's a question about who acts first, the answer is you (two characters with Shoot First act simultaneously).`],
  [53,`Daredevil`,`When you make a desperate roll you may take +1d. If you do so, do not mark xp in that action's attribute.`],
  [54,`Ask Questions Later`,`When you consort to gather info, you gain potency and can in addition ask: Who might this benefit?`],
  [55,`When the Chips are Down`,`You gain a second use of special armor on each job.`],
  //TECH
  [56,`Tinker`,`When you work on a clock with rig or hack, or when you study a schematic, fill +1 segment.`],
  [57,`Bailing Wire and Twine`,`During downtime the repair action costs you 0 cred.`],
  [58,`Machine Bond`,`Machines speak to you when you study them. The first time you roll a critical while fixing or building a particular machine, you may add a simple modification to it (see Crafting).`],
  [59,`Junkyard Find`,`When you acquire parts or equipment during downtime, you may either gain 2 assets, or gain +1 effect level on the roll.`],
  [60,`Fixed`,`You may expend your special armor to resist a consequence from constructs breaking or being damaged, or to push yourself when repairing or building a device.`],
  [61,`Hacker`,`You may expend your special armor to resist the consequences of hacking, or to push yourself when hacking or gathering info through the Astral.`],
  [62,`Mechanic's Heart`,`When you speak from your heart, your words can reach even the most hardened criminal, and you gain potency.`],
  [63,`Overclock`,`When you spend a gambit on a rig roll to repair or upgrade, treat the system you worked on as 1 quality higher for the remainder of the job.`],
  [64,`Analyst`,`When you hack a system, you may also ask a question about the owner or location of the system as though you had rolled a 6 on gather info. When you resist the consequences of hacking, roll +1d.`],
  //WIZARD
  [65,`Spellcaster`,`You are a scholarly wizard who has spent years pouring over arcane tomes. When you spend a downtime action in arcane study set your spell-reserve to 3. You may spend 1 spell-reserve instead of 2 stress to push yourself. Also, select one school ability as an initial focus – select from: Abjuror, Conjuror, Diviner, Evoker, Illusionist, or Transmuter.`],
  [66,`Artificer`,`When you invent or craft a creation with arcane features, take +1 result level to your roll. You begin with one arcane design already known.`],
  [67,`Abjuror`,`when you protect a teammate, take +1d to your Resistance roll. When you gather info to anticipate possible threats in the current situation you get +1 effect.`],
  [68,`Conjuror`,`you can summon tools or items in a time of need - add +2 to your load capacity.`],
  [69,`Diviner`,`You can use Attune when you gather information on a target for a score. You get +1d to the engagement roll for that operation.`],
  [70,`Evoker`,`You can push yourself to do one of the following: unleash elemental blast (fire, ice, electricity, force, etc) as a weapon—create a wall of raw elemental material (fire, ice, stone, force, etc) large enough to enclose a small room in your immediate vicinity.`],
  [71,`Illusionist`,`You can push yourself to do one of the following: turn invisible to the eyes and ears—create illusions that look, sound, and feel real. When you push yourself to activate this ability, you also get one of the normal benefits of pushing yourself (+1d, +1 effect, etc.).`],
  [72,`Transmuter`,`You can make superficial changes to an inanimate object, like small changes in texture or color that last for up to an hour. You can also use Attune to manipulate inanimate objects to grasp or trip an opponent or to destroy an object (+1d and use Attune instead of Wreck).`],
  [73,`Spell for Every Occasion`,`Take 2 stress to roll Attune while performing a different action. Describe the spell you have studied that would be just perfect for the occasion.`],
  [74,`Ritual`,`You can Study an arcane ritual (or create a new one) to summon a supernatural effect or being. You know the arcane methods to perform ritual sorcery. You begin with one ritual already learned.`],
  [75,`Warded`,`You may expend your special armor to resist a supernatural consequence, or to push yourself when you deal with arcane force.`],
]

const CHARACTERS = [
  {
    id: 1,
    name : "Empath",
    text : "partial psychic diplomat and socialite",
    abilities: [1,2,3,4,5,6,7,8,9],
  },
  {
    id: 2,
    name : "Fighter",
    text : "durable warrior able to lead the charge in combat",
    abilities: [10,11,12,13,14,15,16,17,18],
  },
  {
    id: 3,
    name : "Operative",
    text : "expert spy and subterfuge specialist",
    abilities: [],
  },
  {
    id: 4,
    name : "Outlander",
    text : "guide, tracker, and explorer that knows the ways of the shifting Outlands",
    abilities: [],
  },
  {
    id: 5,
    name : "Proxy",
    text : "cosmic channeler or servant of a Cosmic being that wields a shard of cosmic",
    abilities: [],
  },
  {
    id: 6,
    name : "Rogue",
    text : "connected entrepreneur with flexible morals who always plays the odds",
    abilities: [],
  },
  {
    id: 7,
    name : "Tech",
    text : "savant with any machine – scientific or arcane - and proficient astral hacker",
    abilities: [],
  },
  {
    id: 8,
    name : "Wizard",
    text : "scholar of the many schools magic whose spells grant them adaptable utility",
    abilities: [],
  },
]

const RULESETS = {
  core : {},
  Outlands : {
    coin : "cred",
    actions : [
/*0*/      [`Attune`,`Attune to the mystic power to communicate with non-sentient species or robots; sense unseen danger or killing intent; safely handle mystic artifacts.`],
/*1*/      [`Command`,`Command obedience with your force of personality; intimidate or threaten; lead an action with contractors or passengers.`],
/*2*/      [`Consort`,`Consort with connections from your heritage, background, friends, or rivals to gain access to resources, information, people, or places.`],
/*3*/      [`Doctor`,`Doctor someone who's been injured; handle and identify substances; do science; comfort, support, or elicit sympathy.`],
/*4*/      [`Hack`,`Hack computers, systems, and digital locks; reprogram robots or drones; jam surveillance and communications.`],
/*5*/      [`Helm`,`Helm a ship, ship system, land vehicle, or beast; fire ship weaponry; plot a jump or in-system course.`],
/*6*/      [`Rig`,`Rig together mechanical solutions; disable, modify, repair, or create mechanisms; disable a trap, pick a lock, or crack a safe; rig explosives.`],
/*7*/      [`Scrap`,`Scrap with an opponent in blaster or physical combat; assault or hold a position; brawl, fight with melee weapons, or wrestle.`],
/*8*/      [`Scramble`,`Scramble to a positon or away from danger; lift, run, climb, jump, or swim; traverse harsh environments.`],
/*9*/      [`Skulk`,`Skulk about unseen; pick pockets; employ subtle misdirection or sleight of hand.`],
/*10*/      [`Study`,`Study a person, document, or item with close scrutiny to gather information and apply knowledge; gain a deeper understanding; do research.`],
/*11*/      [`Sway`,`Sway someone with charm, logic, deception, disguise or bluffing; change attitudes or behavior with manipulation or seduction.`],
    ],
    cross : {
      actions : [2,2,2,0,0,1,0,1,1,1,0,2],
      attributes : [[3,4,6,10],[5,8,7,9],[0,1,2,11]]
    },
    attributes : ["Insight","Prowess","Resolve"],
    trauma : ["cold","haunted","obsessed","paranoid","reckless","soft","unstable","vicious"],
    upgrades : {
      lair : [19,20,3,4,5,6,7],
    }
  }
}

const TEMPLATES = {
  character : {
    id: "",
    type: 0,
    name: "",
    info : "",
    heritage: 0,
    background: 0,
    vice : 0,
    notes : [],
    actions : [0,0,0,0,0,0,0,0,0,0,0,0],
    abilities: [],
    xp: [0,0,0,0],
    stress : 0,
    trauma: [],
    harm : [],
    recovery : 0,
    friends : [],
    coin: 0,
    stash:0,
  },
  crew: {
    id: "",
    type: 0,
    name: "",
    bases: [],
    rep: 0,
    turf: 0,
    tier: 1,
    abilities: [],
    xp: 0,
    cohorts: [],
    favor: 0,
    upgrades: [],
    contacts: [],
    factions: {}
  }
}

export {COLORS, CHARACTERS, CHARACTERABILITIES, CREWS, UNITS, LOCATIONS, FACTIONS, CREWABILITIES, CREWUPGRADES, TEMPLATES, RULESETS}

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
