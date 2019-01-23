const MAJORSKILLS = ["Arcane","Combat","Diplomacy","Exploration","Science","Thievery"]
const COREPEOPLE = []

let characterFactory = (app) => {
  app.ECS.newCollection("characters")
  app.ECS.newCollection("teams")
  
  //general character component 
  app.ECS.newComponent({
    name : "character",
    description: "CPX character data",
    state: {
        skills : [0,0,0,0,0,0],
        stress : 0,
        xp : 0,
        extras : []
    }
  })
  //player characters
  app.ECS.newComponent({
    name : "PC",
    description: "Designates a Player Character",
    state: {
        isPC : true,
    }
  })
  //team component 
  app.ECS.newComponent({
    name : "teamCharacters",
    description: "Collection of characters working together",
    state: {
        //team character ids
        tCIds : []
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