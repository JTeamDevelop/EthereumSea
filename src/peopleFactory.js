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

let peopleFactory = (app) => {

  app.ECS.newCollection("people")
  //general people component 
  app.ECS.newComponent({
    name: "isESPeople",
    description: "Ethereum Sea People Data",
    state: {
      bio : [],
      phys: "",
      notes: ""
    }
  })

  app.people = {
    get all() {
      return app.ECS.getCollection("people")
    },
    factory (opts) {
      opts = opts || {}

      let all = this.all
      let P = opts.id ? all[opts.id] : null

      if (!P) {
        let id = Object.keys(all).length
        //do not call stard entity because we want to use different ids 
        P = {
          id: id,
          //components 
          _c: []
        }
        app.ECS.addComponent(P, "isESPeople")
        //set entity 
        all[id] = P
      }
      if(opts.bio) P.bio = opts.bio 
      if(opts.phys) P.phys = opts.phys

      return P
    },
    generate (id) {
      let P = this.all[id]
      let seed = ethers.utils.solidityKeccak256(['bytes32', 'string', 'uint256'], [app.seed, "people", id])
      let base = app.creatures.gen(seed)
      //level
      let lv = app.rarity(seed)

      let RNG = new Chance(seed)
      let skills = RNG.shuffle([0,1,2,3,4,5]).slice(0,2)
      let colors = RNG.shuffle([0,1,2,3,4,5]).slice(0,2)
      //are they humanoid?
      let bio = base.bio, phys = "";
      if(bio[0][0] !== "d" && bio.length === 1){
        if(RNG.random() < 0.6) phys = "hu"
      }

      //check from entity 
      if(P.bio.length > 0) base.bio = P.bio
      if(P.phys.length > 0) phys = P.phys

      let ppl = Object.assign({id,skills,colors,lv,phys,_raw:this.all[id]},base)
      
      return ppl  
    },
    name (P) {
      let name = app.creatures.names(P)
      //determine humanoid, hybrid, droid, people
      if(P.phys === "hu") name = "humanoid, "+name+" features" 
      else if(P.bio[0][0] === "d") name += " droid"
      else if(P.bio.length>1) name += " hybrid"
      else name += " people"

      if(P._raw.notes) name = P._raw.notes + " ("+name+")"
      
      return name 
    } 
  }

  //64 people 
  //core people for the planes 
  let corePeople = [
    {phys:"hu",bio:["pt"],notes:"Fae"},
    {phys:"hu",bio:["mm"],notes:"Urim"},
    {phys:"hu",bio:["ll"],notes:"Puri"},
    {bio:["ac04l","ac13c"],notes:"Drake"},
    {bio:["dh"],notes:"Klik Roller"},
    {bio:["dc"],notes:"Klik Tripod"},
  ], P;
  for(let i = 0; i< 64; i++) {
    P = app.people.factory()
    if(i < corePeople.length) {
      P = Object.assign(P,corePeople[i])
    }
  }

}

export {peopleFactory}

