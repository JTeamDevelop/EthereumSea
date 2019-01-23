const MAJORSKILLS = ["Arcane","Combat","Diplomacy","Exploration","Science","Thievery"]

async function forceFactory (app) {
  app.forces = new Map()

  class Force {
    constructor (stats, lv, id) {
      this._id = id || app.forces.size

      this._name = this._id
      
      this._stats = stats
      this._xp = 0
      this._lv = lv || 1     
      this._extras = []

      this._stress = 0
      this._cool = 0

      this._location = {
        i : -1,
        si : -1,
        p : [0,0],
      }
    }
    get name () { return this._name }
    get stats () {
      let r = [0,0,0,0,0,0]
      r[this._stats[0]] = this._lv
      r[this._stats[1]] = this._lv - 2
      r[this._stats[2]] = Math.floor(this._lv/2) - 2

      return r.map((val,i) => val === 0 ? Math.floor(this._lv/2) : val < 0 ? 0 : val)
    }
    get namesAndVals () {
      let S = this.stats
      return MAJORSKILLS.map((n,i) => [n,S[i]])
    }
    //STRESS
    get maxStress () {
      return 3 + Math.floor(this._lv/3)
    }
    get stress () { return this._stress }
    addStress (val) { 
      this._stress += val
    }
    //COOLDOWN
    get canAct () { return Date.now() > this._cool || this.stress >= this.maxStress }
    get cooldown () { return this._cool }
    set cooldown (cool) {
      this._cool = cool
    }
    disband () {
        //kill force by setting data to null 
        app.forces.set(this._id, null)
    }
    get save () {
      return {
        id : this._id,
        stats : this._stats,
        xp : this._xp,
        lv : this._lv,
        extras : this._extras,
        stress : this._stress,
        cool : this._cool,
        loc : this._location,
      }
    }
    load (data) {}
  }

  app.createForce = (stats, lv) => {
    //id is total number
    let id = app.forces.size
    //now create new and set 
    app.forces.set(id, new Force(stats,lv))
    //update the IDs in the UI
    app.UI.main.playerForces = []
    app.forces.forEach((F,i) => {
      if(F) app.UI.main.playerForces.push(i)
    })
    return app.forces.get(id)
  }

  //see if there are forces 
  app.DB.getItem("forces").then(Forces => {
    if(Forces) {
      Forces.forEach(F => {
        //create new based upon data
        let nF = new Force(F.stats,F.lv,F.id)
        //load 
        nF.load(F)
        //set 
        app.forces.set(F.id, nF)
      })
    }
  })
  
}

export {forceFactory}