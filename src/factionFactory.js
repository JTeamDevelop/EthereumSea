/*
    name: "Jinyuan",
    namebase: 11,
    color: "Gold",
    notes: `<p>
      If there is a rivalry between any nations in the Outlands it would be between 
      Chelton and Jinyuan.  Both are talented inventors and their factories 
      churn out goods and devices that the rest of the planes depend upon.  
      However, while Cheltonian wares are functional and durable - they often 
      lack the flare in design that Jinyuanese goods have.  Also, the Jinuanese 
      are talented marketers which gives them another advantage in trade.
    </p>`,
    tags: ["major"],
    people : {
      names : ["Elf","Earth Genasi","L'na"],
      p : [30,40,30],
      r : [0,1,0],
      nature : [1,2,0,1,0,2,2,1,0],
      themes : [
        [["Tactician","Commander","Sharpshooter"],["Sharpshooter","Untouchable","Skirmisher"],["Weakener","Tactician","Hunter"]],
        [["Scholar","Advisor","Spy"],["Artificer","Apothecary","Advisor"],["Apothecary","Scholar","Advisor"]],
        [["Lorekeeper","Trickster","War Mage"],["Naturalist","Lorekeeper","War Mage"],["Naturalist","Trickster","Lorekeeper"]],
      ]
    },
    henchmen : [],
    plots : []
*/

//"name","nb"

const APPROACHES = ["Careful", "Clever", "Flashy", "Forceful", "Quick", "Sneaky"]

let factionFactory = (app)=>{
  let chance = new Chance(Math.round(Math.random() * Date.now()))

  class Faction {
    constructor(data) {
      data = data || {}
      this.type = "faction"

      this._id = data.id
      this.seed = data.seed || chance.hash()
      //keep data
      this._data = data

      let RNG = new Chance(this.seed)
      //rank 
      this._r = RNG.weighted([1, 2, 3, 4], [650, 300, 49, 1])
      this._rank = data.rank || this._r
      //name it
      this._nb = RNG.pickone(app.names.defaultCultures).base
      this._name = this.placeName(RNG)
      //identifying color
      this._idColor = d3.interpolateRainbow(RNG.random())
      //aspects
      this._approach = RNG.d6()-1
      this._cpxColor = RNG.d6()-1
      //skills 
      let SG = this._skillGroups = d3.shuffle([0, 1, 2, 3, 4, 5])
      let sid = app.CPX.skillGroupIds
      this._skills = SG.slice(0,2).map(i => RNG.pickone(app.CPX.skillGroups[sid[i]]))
      //claims
      this.assets = []
      //people
      this._people = {
        _raw : [],
        p: [55, 30, 15],
      }
      //determine people
      let pi = -1
      for(let i = 0; i < 3; i++) {
        //64 people to choose from 
        pi = parseInt(this.seed.slice(2+(i*2),4+(i*2)),16)%64
        this._people._raw.push(app.people.generate(pi))
      }
    }
    get entity () { return app.factions.all[this._id] }
    get rank() {
      return this._rank
    }
    set nb(nb) {
      this._data.nb = nb
    }
    get nb() {
      return this._data.nb || this._nb
    }
    set name(name) {
      this._data.name = name
    }
    get name() {
      return this._data.name || this._name
    }
    get aspects () { 
      return [APPROACHES[this._approach],app.colors[this._cpxColor]].concat(this._skills)
    }
    set idColor(color) {
      this._data.color = color
    }
    get idColor() {
      return this._data.color || this._color
    }
    get people() {
      return this._people._raw.map(P => app.people.name(P))
    }
    addPlot() {
      let p = {
        text: "",
        steps: 8,
        ticks: 0
      }

      if (this._data.plots)
        this._data.plots.push(p)
      else
        this._data.plots = [p]
    }
    get plots() {
      return this._data.plots || []
    }
    placeName(RNG) {
      RNG = RNG || chance
      return app.names.generateName(this.nb, RNG)
    }
    npc(RNG, opts) {
      RNG = RNG || chance
      opts = opts || {}
      let CL = opts.CL || null

      let P = this._people
      //ids of people names
      let pids = P.names.map((p,i)=>i)
      //pick a people id
      let pi = RNG.weighted(pids, P.p)
      //get nature
      let nat = opts.nature || RNG.weighted(P.nature.slice(pi * 3, (pi * 3) + 3), [55, 30, 15])
      //pull theme array for nature
      let pthm = P.themes[nat][pi]
      //probability based on theme length
      let ptp = [[100], [65, 35], [55, 30, 15], [40, 20, 10, 5]][pthm.length - 1]
      //now get the theme
      let thm = RNG.weighted(pthm, ptp)
      //theme data
      let td = Object.assign({}, app.themes.find(t=>t.name === thm))
      //account for sub arrays in approaches
      td.approach = td.approach.map(a=>Array.isArray(a) ? RNG.pickone(a) : a)
      //if a spellcaster set spells 
      td.spells = td.spells ? RNG.pickone(td.spells) : null
      //pick a secondary rank
      let r2 = CL ? 0 : RNG.weighted([1, 2, 3, 4, 5], [40, 20, 10, 5, 3])
      //data
      return {
        name: P.names[pi],
        people: P.names[pi],
        nature: NATURES[nat],
        theme: thm,
        themeData: td,
        r: CL ? Math.ceil(CL / 5) : this.r,
        CL: CL ? CL : (this.r - 1) * 5 + r2,
      }
    }
    tool(RNG, opts) {
      RNG = RNG || chance
      let npc = this.npc(RNG, opts)
      let a = RNG.weighted(npc.themeData.approach, [6, 4])

      return {
        a: a,
        get approach() {
          return APPROACHES[this.a]
        },
        CL: npc.CL,
        bonus: RNG.pickone(["roll", "effect", "defense"]),
        get text() {
          return APPROACHES[this.a] + " +" + this.bonus
        }
      }
    }
    spell(RNG, opts) {
      opts = opts || {}
      opts.nature = 2
      let npc = this.npc(RNG, opts)
      return npc.themeData.spells
    }
    addBase(id) {
      if(!this.assets) this.assets = []

      this.assets.push({what:"base",where:id})
    } 
    get claims () {
      let pids = this.assets.reduce((all,asset) => {
        if(!all.includes(asset.where)) all.push(asset.where);
        return all
      },[])
      return pids.map(id => app.planes._current[id])
    }
    get isAncient () { return this.entity.isAncient || false }
    get isTrouble () { return this.entity.isTrouble || false }
    get activeTrouble () { return this.entity.at }
    makeTrouble(id) {
      //get active trouble 
      let AT = this.activeTrouble
      let i = AT.get("i")
      id = id || i 
      //step AT
      if(id === i) AT.set("i",i+1)
      //make hash 
      let hash = ethers.utils.solidityKeccak256(['bytes32', 'string', 'uint256'], [this.seed, "trouble", id])
      //trouble is a combination of skill, subskill, and color, add stress 
      let stress = [3,3,4,4,4,5,5,6][parseInt(hash.slice(2,4),16)%8]
      //pull current state
      let state;
      if(AT.has(id)) state = AT.get(id);
      else {
        state = [stress,0]
        AT.set(id,state)
      }
      //[32,16,8,4,2,1]
      let ix = parseInt(hash.slice(4*(state[1]*2),6*(state[1]*2)),16)
      let si = ix%64
      let skill = -1
      if(si <= 32) skill = 0;
      else if(si < 48) skill = 1;
      else if(si < 56) skill = 2;
      else if(si < 60) skill = 3;
      else if(si < 62) skill = 4;
      else skill = 5;

      let sub = ix%3
      let color = ix%2
      //difficulty based upon index 
      let dc = [0,0,-1,-1,-2,-2]

      return {
        state,
        skill : this._skills[skill],
        dc : this.rank+dc[skill],
        sub, 
        color : this._colors[color]
      }
    }
    //step trouble - take damage
    stepTrouble(id,dmg){
      let AT = this.activeTrouble
      dmg = dmg || 0
      let state = AT.get(id)
      //step to next 
      state[1]++
      //take damage
      state[0] -= dmg
      //check for end 
      if(state[0] <= 0) {
        AT.delete(id)
        //completed, do not step 
        return false
      }
      else {
        AT.set(id,state)
        //not completed, do step 
        return true
      }
    }
    get save() {
      return Object.assign({
        type: "faction",
        id: this.id,
        name: this.name,
        people: this._people
      }, this._data)
    }
  }

  app.ECS.newCollection("factions")
  //general faction 
  app.ECS.newComponent({
    name: "isESFaction",
    description: "Ethereum Sea Faction Data",
    state: {
      r : -1,
      isTrouble: false,
      isAncient : false,
    }
  })
  //general asset 
  app.ECS.newComponent({
    name: "hasAssets",
    description: "Holds Assets",
    state: {
      assets: [],
    }
  })

  //faction functions 
  app.factions = {
    _current : {},
    get all() {
      return app.ECS.getCollection("factions")
    },
    factory(opts) {
      opts = opts || {}

      let all = this.all
      let F = opts.id ? all[opts.id] : null

      if (!F) {
        let id = Object.keys(all).length
        //do not call stard entity because we want to use different ids 
        F = {
          id: id,
          //components 
          _c: []
        }
        app.ECS.addComponent(F, "inHierarchy")
        app.ECS.addComponent(F, "isESFaction")
        app.ECS.addComponent(F, "hasAssets")
        //set entity 
        all[id] = F
      }
      
      if(opts.r) F.r = opts.r 
      if(opts.isTrouble) {
        F.isTrouble = opts.isTrouble
        F.at = new Map()
        F.at.set("i",1)
      }
      if(opts.isAncient) F.isAncient = opts.isAncient

      return F       
    },
    generate(id) {
      if(this._current[id]) return this._current[id]

      let df = this.all[id]
      let hash = ethers.utils.solidityKeccak256(['bytes32', 'string', 'uint256'], [app.seed, "faction", id])
      let F = Object.assign({seed:hash, rank:df.r},df) 

      this._current[id] = new Faction(F)
      return this._current[id]
    },
    get coreIds () {
      let R = []
      
    }, 
    //get random faction 
    random (RNG, opts) {
      RNG = RNG || app.chance
      opts = opts || {}
      //no player faction 
      let F = app.factions.filter(f => !f.isPlayer)

      if(opts.r) F = F.filter(f => f.r === opts.r)
      else if (opts.lt) F = F.filter(f => f.r < opts.lt)
      else if (opts.gt) F = F.filter(f => f.r > opts.gt)

      //pick only factions / trouble 
      if(opts.all) return RNG.pickone(F.slice())
      else if (opts.trouble) return RNG.pickone(F.filter(f => f.isTrouble))
      else RNG.pickone(F.filter(f => !f.isTrouble))
    }
  }

  //now compute the factions 
  let factionsAtRank = [5, 7, 8, 7, 3, 2]
  //now compute ancients - start at rank 3
  let ancientsAtRank = [5, 7, 8, 7, 3, 2]
  //trouble 
  let troubleAtRank = [2, 4, 4, 3, 2, 1]

  let F;
  factionsAtRank.forEach((n,r)=>{
    for (let i = 0; i < n; i++) {
      F = app.factions.factory({r:r+1})
      app.factions.generate(F.id)
    }
  })
  troubleAtRank.forEach((n,r)=>{
    for (let i = 0; i < n; i++) {
      F = app.factions.factory({r:r+1, isTrouble:true})
      app.factions.generate(F.id)
    }
  })
  ancientsAtRank.forEach((n,r)=>{
    for (let i = 0; i < n; i++) {
      F = app.factions.factory({r:r+3, isAncient:true})
      app.factions.generate(F.id)
    }
  })

  console.log("Factions Generated")
}

export {factionFactory}
