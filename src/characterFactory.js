//Simplified ECS 
import * as SWN from "./SWN.js"

const OSRATTRIBUTES = ["strength","dexterity","constitution","intelligence","wisdom","charisma"]

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
        hp : [1,1],
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
  app.ECS.newComponent({
    name : "hasGear",
    description: "Has Gear",
    state: {
        gear : [],
    }
  })
  app.ECS.newComponent({
    name : "hasSWNClasses",
    description: "Has SWN Classes",
    state: {
        swnBackground : "",
        swnLevel : 1,
        swnClasses : [],
        swnGifts : []
    }
  })

  //character functions 
  app.characters = { 
    //CHARACTERS
    get all () { return app.ECS.getCollection("characters") },
    factory (opts) {
      //check for 6
      if(Object.keys(this.all).length >= 6) return 

      //new 
      let C = app.ECS.newEnity("characters")
      //build 
      let components = ["hasXP","hasHP","hasOSRAttributes","hasSkills","hasGear","hasSWNClasses"]
      components.forEach(cid => app.ECS.addComponent(C,cid))

      return C
    },
    get coreData() {
      let components = ["hasXP","hasHP","hasOSRAttributes","hasSkills","hasGear","hasSWNClasses"]
      //return data ids 
      return components.reduce((all,c)=>{
        //pull data 
        let C = app.ECS.components[c]
        Object.assign(all,C.state)
        return all
      },{name:""})
    },
    get SWNClasses () { return SWN.classes },
    get OSRAttributeNames () {
      return OSRATTRIBUTES
    },
    get SWNSkills () {
      return SWN.skills
    },
    deleteCharacter (character) { delete app.ECS.entities.characters[character.id] },
  }
}

export {characterFactory}