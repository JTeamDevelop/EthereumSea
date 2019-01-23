const RANK = [[0,1,2,3,4], [500, 350, 139, 10, 1]]
const RARITY = ["co", "un", "ra", "vr", "my"]

const APPROACHES = ["Careful","Clever","Flashy","Forceful","Quick","Sneaky"]
const NATURES = ["Combatant", "Expert", "Spellcaster"]
const MAJORSKILLS = ["Arcane","Combat","Diplomacy","Exploration","Science","Thievery"]

const THEMES = {
  "Combatant": [{
    name: "Beater",
    nature : "Combatant",
    approach: [3, 0],
    options: ["damage reduction", "diehard", "extra hit points", "power attack", "rend"]
  }, {
    name: "Commander",
    nature : "Combatant",
    approach: [3, 2],
    options: ["challenge", "combatant's touch", "improved initiative", "bolstering presence", "heroic recovery"]
  }, {
    name: "Hunter",
    nature : "Combatant",
    approach: [[3, 5], 1],
    options: ["bleed", "critical striker", "favored enemy", "trap squares", "alertness"]
  }, {
    name: "Rider",
    nature : "Combatant",
    approach: [4, 3],
    options: ["improved initiative", "mounted master", "powerful charge"]
  }, {
    name: "Sharpshooter",
    nature : "Combatant",
    approach: [4, [0, 1]],
    options: ["extra attack", "far shot", "fast reload", "firearm savvy", "precise shot", "magic weapon"]
  }, {
    name: "Skirmisher",
    nature : "Combatant",
    approach: [2, 4],
    options: ["dodge expert", "extra attack", "mobile attack", "repositioning attack", "terrain stride"]
  }, {
    name: "Tactician",
    nature : "Combatant",
    approach: [1, 5],
    options: ["defense breaker", "deflect projectiles", "improved combat maneuver", "mage-killer", "sneak attack"]
  }, {
    name: "Untouchable",
    nature : "Combatant",
    approach: [3, 0],
    options: ["damage reduction", "dodge expert", "extra armor", "immunity", "spell resistance", "uncanny dodge"]
  }, {
    name: "Weakener",
    nature : "Combatant",
    approach: [3, 1],
    options: ["ability damage", "blood drain", "defense breaker", "energy drain", "fear attack", "paralysis", "stun attack"]
  }, ],
  "Expert": [//["Careful","Clever","Flashy","Forceful","Quick","Sneaky"]
  {
    name: "Advisor",
    nature : "Expert",
    approach: [0, 1],
    options: ["improved initiative", "alertness", "inspire competence", "persuasive", "slippery mind"]
  }, {
    name: "Apothecary",
    nature : "Expert",
    approach: [1, 0],
    options: ["bombs", "mutagen", "potent healing", "potions", "remove minor condition", "remove moderate condition", "secondary magic"]
  }, {
    name: "Artificer",
    nature : "Expert",
    approach: [1, [2, 3]],
    options: ["firearm savvy", "magical aptitude", "mercantile savvy", "magic weapon"]
  }, {
    name: "Deceiver",
    nature : "Expert",
    approach: [5, 1],
    options: ["sneak attack", "alertness", "inspire fear", "persuasive", "slippery mind"]
  }, {
    name: "Guide",
    nature : "Expert",
    approach: [1, 0],
    options: ["extra hit points", "alertness", "animal friend", "sound mimicry", "terrain stride"]
  }, {
    name: "Performer",
    nature : "Expert",
    approach: [2, 4],
    options: ["dodge expert", "mobility", "bolstering presence", "fascinate", "persuasive"]
  }, {
    name: "Scholar",
    nature : "Expert",
    approach: [1, 0],
    options: ["magical aptitude", "protective ward", "knowledgeable", "secondary magic"]
  }, {
    name: "Spy",
    nature : "Expert",
    approach: [5, 1],
    options: ["constant invisibility", "poison", "sneak attack", "alertness", "persuasive", "slippery mind"]
  }, ],
  "Spellcaster": [//["Careful","Clever","Flashy","Forceful","Quick","Sneaky"]
  {
    name: "Cultist",
    nature : "Spellcaster",
    approach: [1, 2],
    options: ["poison", "rage", "bestow major condition", "bestow minor condition", "bestow moderate condition", "misfortune", "weakening presence"],
    spells: ["aberrant", "abyssal", "chaos", "death", "destruction", "evil", "infernal", "madness", "necromancy"]
  }, {
    name: "Lorekeeper",
    nature : "Spellcaster",
    approach: [1, 0],
    options: ["at-will magic", "energy explosion", "magical aptitude", "metamagic spell", "spell penetration", "knowledgeable"],
    spells: ["abjuration, arcane, divination, knowledge, magic, transmutation"]
  }, {
    name: "Naturalist",
    nature : "Spellcaster",
    approach: [1, 3],
    options: ["mounted master", "poison", "bestow major condition", "bestow minor condition", "bestow moderate condition", "animal talker", "terrain stride"],
    spells: ["animal, earth, nature, plant, weather"]
  }, {
    name: "Righteous",
    nature : "Spellcaster",
    approach: [1, 2],
    options: ["extra armor", "fortune", "protective ward", "turn undead", "weakening presence"],
    spells: ["celestial", "community", "glory", "healing", "law", "protection"]
  }, {
    name: "Trickster",
    nature : "Spellcaster",
    approach: [1, 5],
    options: ["sneak attack", "evil eye", "misfortune", "persuasive", "slippery mind"],
    spells: ["chaos", "charm", "enchantment", "illusion", "stealth", "trickery"]
  }, {
    name: "War Mage",
    nature : "Spellcaster",
    approach: [1, [3, 2]],
    options: ["energy resistance", "improved initiative", "combat casting", "magic attack", "spell penetration"],
    spells: ["battle", "evocation", "strength", "war"]
  }, ],
}

const themeNames = {
  "Combatant": THEMES.Combatant.map(t=>t.name),
  "Expert": THEMES.Expert.map(t=>t.name),
  "Spellcaster": THEMES.Spellcaster.map(t=>t.name),
}


let tags = [["bless", "curse", "entangle", "snare", "poison", "disease", "paralyze", "petrify", "mimic", "camouflage", "drain life", "drain magic", "seduce", "hypnotize", "read minds", "armored", "flying", "multiple heads", "many limbs", "great strength", "construct", "stealthy"], ["dissolve", "disintegrate", "magic", "immunity", "control minds", "amorphous"]]

const BEASTS = {
  bug: ["termite", "tick", "snail", "slug", "worm", "ant", "centipede", "scorpion", "mosquito", "firefly", "locust", "dragonfly", "moth", "bee", "wasp"],
  land: ["snake", "lizard", "rat", "weasel", "boar", "dog", "fox", "wolf", "cat", "lion", "panther", "deer", "horse", "ox", "rhino", "bear", "gorilla", "ape", "mammoth"],
  air: ["chicken", "duck", "goose", "jay", "parrot", "gull", "pelican", "crane", "raven", "falcon", "eagle", "owl", "condor"],
  water: ["jellyfish", "clam", "eel", "frog", "fish", "crab", "lobster", "turtle", "alligator", "shark", "squid", "octopus", "whale"]
}

const PEOPLES = {
  co: ["Human", "Elf", "Dwarf", "Orc", "Goblin", "Droid", "L'na"],
  un: ["Halfling", "Gnome", "Ogre", "Troll", "Air Genasi", "Earth Genasi", "Water Genasi", "Fire Genasi", "Hobgoblin", "Bugbear", "Ant-folk", "Serpent-folk", "Wolf-folk", "Eagle-folk", "Rat-folk", "Panther-folk", "Minotaur", "Rabbit-folk", "Boar-folk"],
  ra: ["Stone Golem", "Werewolf", "Wererat", "Werepanther", "Wereboar", "Bee-folk", "Shark-folk", "Shaugain", "Spider-folk", "Bear-folk", "Mer-folk", "Forest Genasi", "Hill Giant", "Stone Giant", "Fire Giant", "Frost Giant"],
  vr: ["Phase Spider", "Aboleth", "Eye Tyrant", "Storm Giant", "Cloud Giant", "Treant", "Thought Lord"],
  dragons: ["Wyrm", "Chromatic Dragon", "Metallic Dragon"],
  elemental: ["Elemental"],
}

let lnaGen = (RNG)=>{
  let n = RNG.weighted([2, 3], [4, 2])
  //get types
  return d3.range(n).map(()=>{
    let bt = RNG.weighted(["bug", "land", "air", "water"], [3, 7, 3, 2])
    return RNG.pickone(BEASTS[bt])
  }
  )
}

let rareGens = {
  vr (RNG) {
    let ppl = RNG.weighted(["vr", "dragons", "elemental"], [0.5, 0.25, 0.25])
    return RNG.pickone(PEOPLES[ppl])
  },
  my (RNG) {
    let ppl = RNG.pickone(["dragons", "elemental"])
    return RNG.pickone(PEOPLES[ppl])
  }
}

let shuffleTwo = (hash,max,start) => {
  let i = start
  let r = [parseInt(hash.slice(i,i+2), 16)%max]
  i+=2
  r.push(parseInt(hash.slice(i,i+2), 16)%max)
  i+=2

  while(r[0] === r[1] && i < hash.length) {
    r[1] = parseInt(hash.slice(i,i+2), 16)%max
    i+=2
  }

  return {
    v : r,
    i : i
  }
}

let peopleFactory = (app) => {
  app.peopleGen = (hash)=> {
    hash = hash.slice(2)
    let ti = parseInt(hash.slice(0,3), 16)%100
    //determine the Kingdom = Animals, Plants, Fungi, Mineral, Fluidic
    let k = ""
    if(ti < 55) k = "a"
    else if (ti < 70) k = "p"
    else if (ti < 75) k = "f"
    else if (ti < 98) k = "m"
    else k = "l"

    let phylum = {
      //Animals - Arthropods, Chordates, Echinoderms, Molluscs, Worms
      "a" : ["c","a","c","a","a","c","c","a","c","c","c","c","m","m","e","w"],
      //Plants - Flowering, Fern, Conifer, Algae, Moss, Palm
      "p" : ["f","f","f","f","f","f","f","f","c","c","c","p","p","e","a","m"],
      //Fungi - mushroom, puff
      "f" : ["m","p"],
      //Mineral - Igneous, Sedimentary, Metamorphic
      "m" : ["i","s","m"],
      //FLuidic - liquid, gas
      "l" : ["l","g"]
    }

    let ph = phylum[k][parseInt(hash.slice(3,4), 16)%phylum[k].length]

    let skills = shuffleTwo(hash,6,3)
    let approaches = shuffleTwo(hash,6,skills.i)

    let P = {
      name: k+ph,
      skills: skills.v,
      approaches: approaches.v 
    }

    return P
  }


  app.planeInhabitants = (hash) => {
    //people based on seed - first get the rarity
    let prp = [1,1,1,1,2,2,3,3,3] 
    //6th index 
    let r = (parseInt(hash.slice(6,8), 16) % 8)  
    //now get faction 
    let F = app.factions.filter(f => f._r === prp[r])
    //8th index
    let fi = parseInt(hash.slice(8,10), 16) % F.length
    //get the faction id
    return F[fi]
  }
}

export {peopleFactory}

