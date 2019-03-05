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

// id, name, cat, skills to use 
const POWERS = [
  ["Abb","Ability Boost","alteration",["Arcane","Will"]],
  ["Abi","Ability Increase","alteration",["Arcane","Will"]],
  ["Abso","Absorption","defensive",["Fight","Shoot"]],
  ["Adap","Adaptation","defensive",["Will","Physique"]],
  ["Affl","Affliction","offensive",["Shoot"]],
  //["Alte","Alter Ego","alteration"],
  //["Altr","Alteration Ray","control"],
  //["Altf","Alternate Form","alteration"],
  ["Aqua","Aquatic","alteration",["Will","Physique"]],
  ["Astr","Astral Projection","mental",["Arcane","Will"]],
  ["Aura","Aura","offensive",["Fight","Physique"]],
  ["Bind","Binding","offensive",["Shoot"]],
  ["Blas","Blast","offensive",["Shoot"]],
  ["Burr","Burrowing","movement",["Athletics"]],
  //["Cont","Continuum Control","control"],
  ["Corr","Corrosion","offensive",["Shoot"]],
  ["Dang","Danger Sense","sensory",["Notice"]],
  ["Dazz","Dazzle","offensive",["Shoot"]],
  ["Dens","Density","alteration",["Will","Physique"]],
  ["Dete","Detection","sensory",["Notice"]],
  ["Dimc","Dimension Control","alteration",["Arcane","Will"]],
  ["Dimt","Dimensional Travel","movement",["Arcane","Will"]],
  //["Drea","Dream Control","mental"],
  //["Dupl","Duplication","alteration"],
  ["Elem","Element Control","control",["Arcane","Will"]],
  ["Emot","Emotion Control","mental",["Arcane","Will"]],
  ["Enec","Energy Control","control",["Arcane","Will"]],
  ["Ened","Energy Drain","offensive",["Shoot","Will"]],
  ["Envi","Environmental Awareness","sensory",["Notice"]],
  ["ESP","ESP","sensory",["Arcane","Will"]],
  //["Evol", "Evolution", "alteration"],
  //["Extr", "Extra Body Parts", "alteration"],
  ["Fast", "Fast Attack", "offensive",["Fight","Shoot"]],
  ["Flig", "Flight", "movement",["Athletics"]],
  ["Forc", "Force Field", "defensive",["Fight","Shoot"]],
  //["Gest", "Gestalt", "alteration"],
  ["Grow", "Growth", "alteration",["Arcane","Will"]],
  ["Heal", "Healing", "control",["Arcane","Will"]],
  ["Illu", "Illusion/Images", "mental",["Arcane","Will"]],
  ["Immo", "Immortality", "defensive",["Will"]],
  ["Inte", "Interface", "sensory",["Arcane","Tech","Will"]],
  ["Invi", "Invisibility", "alteration",["Will","Stealth"]],
  ["Leap", "Leaping", "movement",["Athletics"]],
  ["Life", "Life Support", "defensive",["Will"]],
  ["Mach", "Machine Control", "control",["Arcane","Tech","Will"]],
  ["Matt", "Matter Control", "control",["Arcane","Will"]],
  ["Ment", "Mental Blast", "mental",["Arcane","Will"]],
  //["Mimi", "Mimicry", "alteration"],
  ["Mindc", "Mind Control", "mental",["Arcane","Will"]],
  ["Minds", "Mind Shield", "mental",["Arcane","Will"]],
  ["Phas", "Phasing", "alteration",["Arcane","Will"]],
  ["Post", "Postcognition", "sensory",["Arcane","Notice","Will"]],
  //["Powe", "Power Control", "control"],
  ["Prec", "Precognition", "sensory",["Arcane","Notice","Will"]],
  ["Refl", "Reflection", "defensive",["Athletics","Fight"]],
  ["Rege", "Regeneration", "defensive",["Physique","Will"]],
  ["Resi", "Resistance", "defensive",["Fight","Shoot"]],
  ["Serv", "Servant", "control",["Arcane","Will"]],
  ["Shri", "Shrinking", "alteration",["Arcane","Will"]],
  ["Spin", "Spinning", "movement",["Athletics"]],
  //["Spir", "Spirit Control", "control"],
  ["Stri", "Strike", "offensive",["Fight"]],
  ["Stun", "Stunning", "offensive",["Shoot"]],
  ["Sups", "Super-Senses", "sensory",["Notice"]],
  ["Susp", "Super-Speed", "movement",["Athletics"]],
  ["Swin", "Swinging", "movement",["Athletics"]],
  ["Tele", "Telepathy", "mental",["Arcane","Will"]],
  ["Tp", "Teleportation", "movement",["Athletics","Will"]],
  ["Wall", "Wall-Crawling", "movement",["Athletics"]],
  ["Wiza", "Wizardry", "control",["Arcane","Will"]]
]

const skills = {
  "Administer" : ``,
  "Arcane" : ``,
  "Athletics" : ``,
  "Burglary" : ``,
  "Culture" : `A student of society, art, language and philosophy`,
  "Crafts" : ``,
  "Deceive" : ``,
  "Empathy" : ``,
  "Fight" : ``,
  "Influence" : `Combines Rapport and Provoke.`,
  "Nature" : ``,
  "Notice" : ``,
  "Physique" : ``,
  "Pilot" : ``,
  "Science" : ``,
  "Shoot" : ``,
  "Stealth" : ``,
  "Survival" : ``,
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

const BACKGROUNDS = [
  ["Backwater",["Survival","Athletics","Tech","Science"]],
  ["Wartorn"],
  ["High-tech"],
  ["Spaceborn",["Tech","Pilot","Craft","Survival"]],
  ["Impoverished"],
  ["Priviliged"],
  ["Crowded"],
  ["Strict"],
]
const CAREERS = [
  ["Empowered"],
  ["Paladin",["Protection","Trickery"]],
  ["Barbarian",["Physique","Fight","Empathy","Tech"]],
  ["Psychic"],
  ["Evoker"],
  ["Kinetic"],
  ["Academic"],
  ["Merchant"],
  ["Spy",["Stealth","Burglary","Administer","Nature"]],
  ["Explorer"],
  ["Industrial"],
  ["Military"],
  ["Personality"],
  ["Rogue"],
  ["Pilot"],
  ["Hacker"],
]

/* Core Characters 
  {
    name : "Paladin",
    people : "Aasimar",
    bck : "Spaceborn",
    career : "Paladin"
    skills : {}
  }

*/

import {CPXGear} from "./CPXRPGGear.js"
let CPXData = (app)=>{
  CPXGear(app)

  app.colors = colors
  app.tagsByColor = colorTags
  app.tagArray = allColorTags
  app.approaches = APPROACHES

  //find the color of a 
  app.aspectColor = (a) => {
    //a is an approach
    if(APPROACHES.includes(a)) return a;
    //a is a skill 
    if(Object.keys(skills).includes(a)) return a;
    //now find the color 
    return colorTags.find(ca => ca.includes(a))[0]
  }

  app.CPX = {
    colors : COLORS,
    //map power array to objects
    powers: POWERS.map(p => {
      return {id:p[0], name:p[1], cat:p[2], skills:p[3]}
    }),
    skills,
    skillArray : Object.keys(skills),
    skillGroupIds,
    skillGroups
  }
}

export {CPXData}

