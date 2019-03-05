//Implements a simple Entity Component System
/* Components must be in the form
  {
    name: "Player",
    description: "The player's state",
    state: {
        life: 100,
        strength: 18,
        charisma: 3,
    }
  }
*/

let ECSFactory = (app) => {
  
  let entities = { generic: {} }
  let mods = {}
  let state = {
    lastUser : "",
    users : {}
  }
  let components = {}

  //handle storage 
  app.DB.getItem("state").then(res => {
    if(res) state = res;
    app.state = state
    //load mods
    app.DB.getItem("mods").then(mres => {
      if(mres) mods = mres;
      console.log("Mods Loaded")
    })
    //now initialize after load
    app.init()
  })

  setInterval(()=>{
    app.DB.setItem("mods",mods)
    app.DB.setItem("state",state)
  },20000)

  //follow state 
  app.state = state

  return {
    save () { 
      app.DB.setItem("mods",mods)
      app.DB.setItem("state",state)
    }, 
    get entities () { return entities },
    get mods () { return mods },
    newEnity (cname) {
      //id not in a collection - give it a collection 
      cname = cname || "generic"
      //random hash 
      let id = app.chance.hash()
      let E = {
        id: id,
        name : "",
        //components 
        _c : []
      }
      //set entity 
      entities[cname][id] = E 
      //return 
      return entities[cname][id]
    },
    //COLLECTIONS
    //collection is a specific grouping of entities for quicker searching // access 
    get collections () { return Object.keys(entities) },
    getCollection (name) { return name ? entities[name] : entities.generic },
    newCollection (name) {
      entities[name] = {}
    },
    //reasigns an entity from one collection to another 
    reassign (id, from, to) {
      entities[to][id] = entities[from][id]
      //delete old 
      delete entities[from][id]
    },
    //COMPONENTS
    get components () { return components },
    //add components to an entity
    addComponent (entity, name) {
      //if it doesnot exist - return 
      let ec = components[name]
      if(!ec) return
      //add to entity 
      entity._c.push(name)
      //assign state 
      Object.assign(entity, ec.state)
    },
    hasComponent (entity, name) { return entity._c.includes(name) },
    newComponent (component) {
      if(component.name == "_c") return
      components[component.name] = component
    },
    deleteComponent (name) {
      delete components[name]
    }
  }

}

export {ECSFactory}