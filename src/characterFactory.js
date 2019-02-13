//Simplified ECS 
import * as SWN from "./SWN.js"

const OSRATTRIBUTES = ["strength","dexterity","constitution","intelligence","wisdom","charisma"]
//const SWNSKILLS = ["administer","connect","exert","fix","heal","know","lead","notice","perform","pilot","program","punch","shoot","sneak","stab","survive","talk","trade","work"]
//const SWNPSISKILLS = ["biospionics","metapsionics","precognition","telekinesis","telepathy","teleportation"]
//const SWNCLASSES = ["warrior","expert","psychic","arcane expert","arcane warrior","arcanist","free nexus","godhunter","pacter","rectifier","sunblade","war mage","arbiter"]

const MAJORSKILLS = ["Arcane","Combat","Diplomacy","Exploration","Science","Thievery"]

const PHYSICAL = [0,1,2]
const MENTAL = [3,4,5]
const COMBAT = ["punch","shoot","stab"]

const SWNBACKROUNDS = {
  "Barbarian" : {
    free:"survive",
    growth:["attribute","physical","physical","mental","exert","skill"],
    learning : ["combat","connect","exert","lead","notice","punch","sneak","survive"]
  }
}

const RandomBackground = (char,RNG,background) => {
  B = SWNBACKROUNDS[background]

  //set free 
  char.swnSkills[B.free] = 0

  let gl, what;
  //get growth or learning 
  for(let i = 0; i<3; i++){
    gl = RNG.pickone(["growth","learning"])
    what = RNG.pickone(B[gl])
    //check for special cases 
    if(what === "attribute") {
      let i = RNG.d6()-1
      char.OSRAttributes[i]++
    }
    else if(what === "physical"){
      let i = RNG.pickone(PHYSICAL)
      char.OSRAttributes[i]++
    }
    else if(what === "mental"){
      let i = RNG.pickone(MENTAL)
      char.OSRAttributes[i]++
    }
    else {
      if(what === "skill") what = RNG.pickone(SWNSKILLS)
      else if (what === "combat") what = RNG.pickone(COMBAT) 
      //give the skill 
      if(char.swnSkills.hasOwnProperty(what)) char.swnSkills[what]++;
      else char.swnSkills[what] = 0;
    }
  }
}

let characterFactory = (app) => {
  app.ECS.newCollection("characters")
  
  app.ECS.newComponent({
    name : "hasHP",
    description: "Has Hit Points",
    state: {
        hp : 0,
    }
  })
  app.ECS.newComponent({
    name : "hasXP",
    description: "Has Experience Points",
    state: {
        xp : 0,
    }
  })
  app.ECS.newComponent({
    name : "hasOSRAttributes",
    description: "Has Basic Attributes",
    state: {
        osrAttributes : [10,10,10,10,10,10],
    }
  })
  app.ECS.newComponent({
    name : "hasSkills",
    description: "Has Skills",
    state: {
        skills : {},
    }
  })

  //character functions 
  app.characters = { 
    //CHARACTERS
    get all () { return app.ECS.getCollection("characters") },
    factory (opts) {
      let C = app.ECS.newEnity("characters")
      app.ECS.addComponent(C,"character")
      //see if it is pc 
      if(opts.PC) app.ECS.addComponent(C,"PC")
      //now see if options provided 
      if(opts.skills) C.skills = opts.skills.slice()
      else if (opts.PC){
        //give it random skills
        C.skills = app.chance.shuffle([2,1,1,0,0,0])
      }

      if(opts.extras) C.extras = opts.extras.slice()

      return C
    },
    get SWNClasses () { return SWN.classes },
    get OSRAttributeNames () {
      return OSRATTRIBUTES
    },
    get SWNSkills () {
      return SWN.skills
    },
    deleteCharacter (character) { delete app.ECS.entities.characters[character.id] },
    //TEAMS
    get teams () { return app.ECS.getCollection("teams") },
    get teamCharacters () {
      let T = app.ECS.entities.teams
      let C = app.ECS.entities.characters
      //return the characters on a team, in an array
      return Object.keys(T).map(tid => { 
        return T[tid].tCIds.map(cid => C[cid])
      })
    },
    addToTeam (T, character) {
      if(T.tCIds.includes(character.id)) return
      //add 
      T.tCIds.push(character.id)
    },
    removeFromTeam (T, character) {
      let i = T.tCIds.indexOf(character.id)
      //find and remove 
      if(i > -1) T.tCIds.splice(i,1)
      //returns team 
      return T
    },
    createTeam (characters) {
      let T = app.ECS.newEnity("teams")
      app.ECS.addComponent(T,"teamCharacters")
      //add each of the characters
      characters.forEach(C => app.characters.addToTeam(T,C))
      //return team 
      return T 
    },
    deleteTeam (team) { delete app.ECS.entities.teams[team.id] },
  }
}

export {characterFactory}