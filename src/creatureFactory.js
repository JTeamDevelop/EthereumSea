const PHYLUM = {
  //Animals - Arthropods, Chordates, Echinoderms, Molluscs, Worms
  "a": ["c", "a", "c", "a", "a", "c", "c", "a", "c", "c", "c", "c", "m", "m", "e", "w"],
  //droids - Humanoid, Quad, Insectoid, Block, Cylinder, Sphere
  "d": ["h", "q", "i", "b", "c", "s"],
  //Plants - flower, tree, Fern, Conifer, Algae, Moss, Palm
  "p": ["f", "f", "f", "f", "t", "t", "t", "t", "e","c", "c", "c", "p", "p",  "a", "m"],
  //Fungi - mushroom, puff
  "f": ["m", "p"],
  //Mineral - Igneous, Sedimentary, Metamorphic
  "m": ["i", "s", "m"],
  //FLuidic - liquid, gas
  "l": ["l", "g"]
}
const CLASSES = {
  //whale, orca, dolphin
  "ac01": ["w", "o", "d"],
  //shark, ray, tuna, coelacanths, sturgeon, salmon, catfish, gar, eel, pufferfish
  "ac02": ["s", "r", "t", "c", "u", "l", "f", "g", "e", "p"],
  //frog, toad, salamander
  "ac03": ["f", "t", "s"],
  //alligator, snake, lizard, turtle 
  "ac04": ["a", "s", "l", "t"],
  //ostrich, kiwi, turkey, chicken, 
  "ac05": ["o", "k", "t", "c"],
  //duck/goose, crane, penguin, albatross, pellican, stork
  "ac06": ["d", "c", "p", "a", "l", "s"],
  //vulture, eagle, hawk, owl, plover, pigeon, parrot, swift, 
  "ac07": ["v", "e", "h", "o", "p", "i", "r", "s"],
  //quetzal, kingfisher, woodpecker, raven, songbird, bat  
  "ac08": ["q", "k", "w", "r", "s", "b"],
  //opossum, kangaroo, mole, aardvark/anteater, hyrax, armadillo, sloth, hedgehog
  "ac09": ["o", "k", "m", "a", "h", "r", "s", "d"],
  //lemur, monkey, ape
  "ac10": ["l", "m", "a"],
  //rabbit, rat, squirrel, prarie dog, porcupine, beaver
  "ac11": ["r", "t", "s", "d", "p", "b"],
  //wolf, fox, badger, weasel, otter, raccoon, 
  "ac12": ["w", "f", "b", "w", "o", "r"],
  //bear, seal, walrus, cat, mongoose, hyeana,   
  "ac13": ["b", "s", "w", "c", "m", "h"],
  //tapir, pig, camel, llama, deer,  antelope, sheep/goat
  "ac14": ["t", "p", "c", "l", "d", "a", "s"],
  //elephant, horse, rhinoceros, hippopotamus, giraffe, cattle/bison/buff
  "ac15": ["e", "h", "r", "p", "g","b"],
  //spider, scorpian, tick, millipede, centipede, 
  "aa1": ["s", "c", "t", "m", "p"],
  //horseshoe crab, lobster, crab, shrimp
  "aa2": ["h", "l", "c", "s"],
  //beetle, ant, 
  "aa3": ["b", "a"],
  //grashopper/cricket, stickbug, earwig, mantis, cockroach, 
  "aa4": ["g", "s", "e", "m", "c"],
  //dragonfly, wasp, bee, butterfly, fly  
  "aa5": ["d", "w", "b", "t", "f"],
  //shield bug, assassin bug, cicada, treehopper, aphid 
  "aa6": ["s", "a", "c", "t", "p"],
  //snail, slug, clam, mussel, squid, octopus 
  "am": ["s", "l", "c", "m", "q", "q", "o", "o"],
  //star, urchin, cucumber
  "ae": ["s", "u", "c"],
  //flatworm, round/segmented 
  "aw": ["f", "s"],
}
const NAMES = {
  "dh":"humanoid", "dq":"quad", "di":"insectoid", "db":"block", "dc":"cylinder", "ds":"sphere",
  "pf":"flower", "pt":"tree", "pe":"fern", "pc":"conifer tree", "pa":"algae", "pm":"moss", "pp":"palm tree",
  "fm":"mushroom","fp":"puff mushroom",
  "mi":"igneous rock","ms":"sedimentary rock","mm":"metamorphic rock","mc":"crystalline",
  "ll":"liquid","lg":"gaseous",
  "ac01w": "whale",
  "ac01o": "orca",
  "ac01d": "dolphin",
  "ac02s": "shark",
  "ac02r": "ray",
  "ac02t": "mahi mahi",
  "ac02c": "coelacanths",
  "ac02u": "sturgeon",
  "ac02l": "salmon",
  "ac02f": "catfish",
  "ac02g": "gar",
  "ac02e": "eel",
  "ac02p": "pufferfish",
  "ac03f": "frog",
  "ac03t": "toad",
  "ac03s": "salamander",
  "ac04a": "alligator",
  "ac04s": "snake",
  "ac04l": "lizard",
  "ac04t": "turtle",
  "ac05o": "ostrich",
  "ac05k": "kiwi",
  "ac05t": "turkey",
  "ac05c": "chicken",
  "ac06d": "duck/goose",
  "ac06c": "crane/stork",
  "ac06p": "penguin",
  "ac06a": "albatross",
  "ac06l": "pellican",
  "ac07v":"vulture", "ac07e":"eagle", "ac07h":"hawk", "ac07o":"owl", "ac07p":"plover", "ac07i":"pigeon", "ac07r":"parrot", "ac07s":"swift", 
  "ac08q":"quetzal", "ac08k":"kingfisher", "ac08w":"woodpecker", "ac08r":"raven", "ac08s":"songbird",
  "ac08b":"bat", "ac09o":"opossum", "ac09k":"kangaroo", "ac09m":"mole", "ac09a":"aardvark/anteater", "ac09h":"hyrax", "ac09r":"armadillo", "ac09s":"sloth", "ac09d":"hedgehog",
  "ac10l":"lemur", "ac10m":"monkey", "ac10a":"ape",
  "ac11r":"rabbit", "ac11t":"rat", "ac11s":"squirrel", "ac11d":"prarie dog", "ac11p":"porcupine", "ac11b":"beaver",
  "ac12w":"wolf", "ac12f":"fox", "ac12b":"badger", "ac12w":"weasel", "ac12o":"otter", "ac12r":"raccoon", 
  "ac13b":"bear", "ac13s":"seal", "ac13w":"walrus", "ac13c":"cat", "ac13m":"mongoose", "ac13h":"hyeana",
  "ac14t":"tapir", "ac14p":"pig", "ac14c":"camel", "ac14l":"llama", "ac14d":"deer", "ac14a":"antelope", "ac14s":"sheep/goat",
  "ac15e":"elephant", "ac15h":"horse", "ac15r":"rhinoceros", "ac15p":"hippopotamus", "ac15g":"giraffe", "ac15b":"cattle/bison/buff",
  "aa1s":"spider", "aa1c":"scorpian", "aa1t":"tick", "aa1m":"millipede", "aa1p":"centipede", 
  "aa2h":"horseshoe crab", "aa2l":"lobster", "aa2c":"crab", "aa2s":"shrimp",
  "aa3a":"ant", "aa3b":"beetle",
  "aa4g":"grashopper/cricket", "aa4s":"stickbug", "aa4e":"earwig", "aa4m":"mantis", "aa4c":"cockroach",
  "aa5d":"dragonfly", "aa5w":"wasp", "aa5b":"bee", "aa5t":"butterfly", "aa5f":"fly",
  "aa6s":"shield bug", "aa6a":"assassin bug","aa6c": "cicada","aa6t": "treehopper","aa6p": "aphid", 
  "ams":"snail", "aml":"slug", "amc":"clam", "amm":"mussel", "amq":"squid", "amo":"octopus",
  "aes":"seastar", "aeu":"urchin","aec": "sea cucumber",
  "awf":"flatworm", "aws":"round/segmented worm",
}

const TAGS = {
  "mh" : "multiple heads",
  "nh" : "no head",
  "hm" : "humanoid",
  "am" : "amorphous",
  "ma" : "many-arms/legs",
  "aq" : "aquatic",
  "fl" : "flying" 
}

const names = (p) => {
  //get bio names - whether chimera or not
  return p.bio.map(b => NAMES[b]).join("-")
}

const creatureGen = (seed, opts) => {
  opts = opts || {}
  //set up the RNG to generate
  seed = seed || ethers.utils.hexlify(Date.now())
  let RNG = new Chance(seed)

  //hold the final bio info 
  let bio = [], tags = [];
  let ti = RNG.d100()-1
  //determine the Kingdom = Animals, Droid, Plants, Fungi, Mineral, Fluidic
  let k = ""
  if(ti < 60) k = "a"
  else if (ti < 75) k = "d"
  else if (ti < 85) k = "p"
  else if (ti < 92) k = "f"
  else if (ti < 98) k = "m"
  else k = "l"
  
  if(opts.k) k = opts.k
  let ph = RNG.pickone(PHYLUM[k]);
  if(opts.p) ph = opts.p

  let animalClasses = (p) => {
    //classes for non c and a 
    if(["m","e","w"].includes(p)) return RNG.pickone(CLASSES["a"+p])
    //c and a are broken up 
    let ci = p === "c" ? RNG.rpg("1d15")[0] : RNG.rpg("1d6")[0]
    if(p === "c" && ci < 10) ci = "0"+ci

    return ci+RNG.pickone(CLASSES["a"+p+ci])
  }

  if(k === "a") {
    //chimera 
    let pc = RNG.d20()
    if(pc >= 15){
      //chimera phylums and classes
      bio = [ph,RNG.pickone(PHYLUM.a)]
      bio = bio.map(p => "a"+p+animalClasses(p))
    }
    else {
      //class 
      bio = [k+ph+animalClasses(ph)]
    }
  }
  else bio = [k+ph]

  let addTag = (t) => { if(!tags.includes(t)) tags.push(t) }

  bio.forEach(b => {
    if(["ll","lg"].includes(b)) addTag("am")
    if(["ll","pa","am","ae"].includes(b.slice(0,2))) addTag("aq")
    if(["aa2","ac01","ac02"].includes(b.slice(0,4))) addTag("aq")
    if(b === "lg" || ["aa5","ac06","ac07","ac08"].includes(b.slice(0,4))) addTag("fl")
  })

  if(opts.aquatic) addTag("aq")

  return {bio,tags}
}

export {
  creatureGen as gen,
  names
}
