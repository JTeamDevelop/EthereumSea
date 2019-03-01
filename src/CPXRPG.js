const COLORS =[ 
  {
    c : "Ruby",
    m: ["Evocation"],
    p: ["Psychokinesis"],
    e: ["Fire"],
    l: ["Dragon", "Humanoid"],
    d: ["Ambition", "Destruction", "Might", "Cities", "War"]
  },
  {
    c : "Topaz",
    m: ["Conjuration"],
    p: ["Metacreativity", "Psychoportation"],
    e: ["Light"],
    l: ["Elemental", "Ooze"],
    d: ["Creation", "Passion", "Travel", "Freedom", "Indulgence", "Wealth"]
  },
  {
    c : "Citrine",
    m: ["Abjuration"],
    e: ["Air"],
    l: ["Magical Beast", "Animal"],
    d: ["Zeal", "Protection", "Justice", "Perfection", "Tyranny"]
  },
  {
    c : "Emerald",
    m: ["Transmutation"],
    p: ["Psychometabolism"],
    e: ["Plants", "Earth"],
    l: ["Plants", "Vermin", "Aberration"],
    d: ["Healing", "Family", "Nature", "Pain", "Chaos"]
  },
  {
    c : "Sapphire",
    m: ["Enchantment", "Divination"],
    p: ["Telepathy", "Clairsentience"],
    e: ["Water"],
    l: ["Fey", "Giant"],
    d: ["Dreams", "Knowledge", "Confidence", "Magic", "Digital"]
  },
  {
    c : "Amethyst",
    m: ["Illusion", "Necromancy"],
    e: ["Darkness"],
    l: ["Undead", "Construct"],
    d: ["Death", "Fate", "Secrecy", "Moon", "Luck", "Trickery"]
  }]

const POWERS = [{
  id: "Abb",
  name: "Ability Boost",
  cat: "alteration"
}, {
  id: "Abi",
  name: "Ability Increase",
  cat: "alteration"
}, {
  id: "Abso",
  name: "Absorption",
  cat: "defensive"
}, {
  id: "Adap",
  name: "Adaptation",
  cat: "defensive"
}, {
  id: "Affl",
  name: "Affliction",
  cat: "offensive"
}, {
  id: "Alte",
  name: "Alter Ego",
  cat: "alteration"
}, {
  id: "Altr",
  name: "Alteration Ray",
  cat: "control"
}, {
  id: "Altf",
  name: "Alternate Form",
  cat: "alteration"
}, {
  id: "Aqua",
  name: "Aquatic",
  cat: "alteration"
}, {
  id: "Astr",
  name: "Astral Projection",
  cat: "mental"
}, {
  id: "Aura",
  name: "Aura",
  cat: "offensive"
}, {
  id: "Bind",
  name: "Binding",
  cat: "offensive"
}, {
  id: "Blas",
  name: "Blast",
  cat: "offensive"
}, {
  id: "Burr",
  name: "Burrowing",
  cat: "movement"
}, {
  id: "Cont",
  name: "Continuum Control",
  cat: "control"
}, {
  id: "Corr",
  name: "Corrosion",
  cat: "offensive"
}, {
  id: "Dang",
  name: "Danger Sense",
  cat: "sensory"
}, {
  id: "Dazz",
  name: "Dazzle",
  cat: "offensive"
}, {
  id: "Dens",
  name: "Density",
  cat: "alteration"
}, {
  id: "Dete",
  name: "Detection",
  cat: "sensory"
}, {
  id: "Dimc",
  name: "Dimension Control",
  cat: "alteration"
}, {
  id: "Dimt",
  name: "Dimensional Travel",
  cat: "movement"
}, {
  id: "Drea",
  name: "Dream Control",
  cat: "mental"
}, {
  id: "Dupl",
  name: "Duplication",
  cat: "alteration"
}, {
  id: "Elem",
  name: "Element Control",
  cat: "control"
}, {
  id: "Emot",
  name: "Emotion Control",
  cat: "mental"
}, {
  id: "Enec",
  name: "Energy Control",
  cat: "control"
}, {
  id: "Ened",
  name: "Energy Drain",
  cat: "offensive"
}, {
  id: "Envi",
  name: "Environmental Awareness",
  cat: "sensory"
}, {
  id: "ESP",
  name: "ESP",
  cat: "sensory"
}, {
  id: "Evol",
  name: "Evolution",
  cat: "alteration"
}, {
  id: "Extr",
  name: "Extra Body Parts",
  cat: "alteration"
}, {
  id: "Fast",
  name: "Fast Attack",
  cat: "offensive"
}, {
  id: "Flig",
  name: "Flight",
  cat: "movement"
}, {
  id: "Forc",
  name: "Force Field",
  cat: "defensive"
}, {
  id: "Gest",
  name: "Gestalt",
  cat: "alteration"
}, {
  id: "Grow",
  name: "Growth",
  cat: "alteration"
}, {
  id: "Heal",
  name: "Healing",
  cat: "control"
}, {
  id: "Illu",
  name: "Illusion/Images",
  cat: "mental"
}, {
  id: "Immo",
  name: "Immortality",
  cat: "defensive"
}, {
  id: "Inte",
  name: "Interface",
  cat: "sensory"
}, {
  id: "Invi",
  name: "Invisibility",
  cat: "alteration"
}, {
  id: "Leap",
  name: "Leaping",
  cat: "movement"
}, {
  id: "Life",
  name: "Life Support",
  cat: "defensive"
}, {
  id: "Mach",
  name: "Machine Control",
  cat: "control"
}, {
  id: "Matt",
  name: "Matter Control",
  cat: "control"
}, {
  id: "Ment",
  name: "Mental Blast",
  cat: "mental"
}, {
  id: "Mimi",
  name: "Mimicry",
  cat: "alteration"
}, {
  id: "Mindc",
  name: "Mind Control",
  cat: "mental"
}, {
  id: "Minds",
  name: "Mind Shield",
  cat: "mental"
}, {
  id: "Phas",
  name: "Phasing",
  cat: "alteration"
}, {
  id: "Post",
  name: "Postcognition",
  cat: "sensory"
}, {
  id: "Powe",
  name: "Power Control",
  cat: "control"
}, {
  id: "Prec",
  name: "Precognition",
  cat: "sensory"
}, {
  id: "Refl",
  name: "Reflection",
  cat: "defensive"
}, {
  id: "Rege",
  name: "Regeneration",
  cat: "defensive"
}, {
  id: "Resi",
  name: "Resistance",
  cat: "defensive"
}, {
  id: "Serv",
  name: "Servant",
  cat: "control"
}, {
  id: "Shri",
  name: "Shrinking",
  cat: "alteration"
}, {
  id: "Spin",
  name: "Spinning",
  cat: "movement"
}, {
  id: "Spir",
  name: "Spirit Control",
  cat: "control"
}, {
  id: "Stri",
  name: "Strike",
  cat: "offensive"
}, {
  id: "Stun",
  name: "Stunning",
  cat: "offensive"
}, {
  id: "Sups",
  name: "Super-Senses",
  cat: "sensory"
}, {
  id: "Susp",
  name: "Super-Speed",
  cat: "movement"
}, {
  id: "Swin",
  name: "Swinging",
  cat: "movement"
}, {
  id: "Tele",
  name: "Telepathy",
  cat: "mental"
}, {
  id: "Tp",
  name: "Teleportation",
  cat: "movement"
}, {
  id: "Wall",
  name: "Wall-Crawling",
  cat: "movement"
}, {
  id: "Wiza",
  name: "Wizardry",
  cat: "control"
}, ]

const skills = {
  "Administer" : ``,
  "Athletics" : ``,
  "Burglary" : ``,
  "Culture" : `A student of society, art, language and philosophy`,
  "Crafts" : ``,
  "Deceive" : ``,
  "Empathy" : ``,
  "Fight" : ``,
  "Influence" : `Combines Rapport and Provoke.`,
  "Magic" : ``,
  "Nature" : ``,
  "Notice" : ``,
  "Physique" : ``,
  "Pilot" : ``,
  "Psionics" : ``,
  "Science" : ``,
  "Shoot" : ``,
  "Stealth" : ``,
  "Tech" : ``,
  "Will" : ``,
}

const skillGroupIds = ["arcane", "combat", "diplomacy", "exploration", "science", "thievery"]
const skillGroups = {
  arcane: ["Magic", "Psionics"],
  combat: ["Athletics","Fight","Shoot","Physique"],
  diplomacy: ["Administer","Deceive","Empathy","Influence"],
  exploration: ["Athletics","Culture","Crafts","Nature","Notice","Pilot"],
  science: ["Administer","Nature","Science","Tech"],
  thievery: ["Athletics","Burglary","Deceive","Stealth"]
}

let colors = COLORS.map(c => c.c)
//handle color tags 
let colorTags = COLORS.map(c => {
  let t = []
  for(let x in c) t = t.concat(c[x])
  return t 
})

let allColorTags = colorTags.reduce((all,ct,i) => {
  all = all.concat(ct.map(c => ["c"+i,c]))
  return all 
},[])

const APPROACHES = ["Careful", "Clever", "Flashy", "Forceful", "Quick", "Sneaky"]

let CPXData = (app)=>{
  app.colors = colors
  app.tagsByColor = colorTags
  app.tagArray = allColorTags
  app.approaches = APPROACHES

  app.CPX = {
    colors : COLORS,
    powers: POWERS,
    skills,
    skillArray : Object.keys(skills),
    skillGroupIds,
    skillGroups
  }
}

export {CPXData}

