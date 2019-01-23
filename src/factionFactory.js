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

const APPROACHES = ["Careful", "Clever", "Flashy", "Forceful", "Quick", "Sneaky"]
const NATURES = ["Combatant", "Expert", "Spellcaster"]
const MAJORSKILLS = ["Arcane", "Combat", "Diplomacy", "Exploration", "Science", "Thievery"]

let factionFactory = (app)=>{
  let chance = new Chance(Math.round(Math.random() * Date.now()))

  class Faction {
    constructor(data) {
      data = data || {}
      this.type = "faction"

      this.id = data.id || chance.hash()
      //keep data
      this._data = data

      let RNG = new Chance(this.id)
      //rank 
      this._r = RNG.weighted([1, 2, 3, 4], [650, 300, 49, 1])
      this._rank = data.rank || this._r
      //name it
      this._nb = RNG.pickone(app.names.defaultCultures).base
      this._name = this.placeName(RNG)
      //identifying color
      this._color = d3.interpolateRainbow(RNG.random())
      //skillset
      this._skills = d3.shuffle([0, 1, 2, 3, 4, 5])
      //approaches
      this._approaches = d3.shuffle([0, 1, 2, 3, 4, 5]).slice(0, 2)
      //claims
      this._claims = []
      //people
      this._people = {
        names: [],
        p: [55, 30, 15],
        special: [],
      }
      d3.range(3).map((i)=>{
        let hash = ethers.utils.solidityKeccak256(['bytes32', 'uint256'], [this.id, i])
        let P = this._people
        let p = app.peopleGen(hash)
        P.names.push(p.name)
      }
      )
    }
    set notes(notes) {
      this._data.notes = notes
    }
    get notes() {
      return this._data.notes || ""
    }
    set r(r) {
      this._data.r = r
    }
    get r() {
      return this._data.r || this._r
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
    set color(color) {
      this._data.color = color
    }
    get color() {
      return this._data.color || this._color
    }
    set tech(tech) {
      this._data.tech = tech
    }
    get tech() {
      return this._data.tech || this._tech
    }
    get people() {
      return this._people.names
    }
    get isPlayer () { return app.player._fi === this._i }
    addTag(tag) {
      if (this._data.tags)
        this._data.tags.push(tag)
      else
        this._data.tags = [tag]
    }
    get tags() {
      return this._data.tags || this._prof
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
    addClaim(fid) {
      let id = fid.split(".").map(n => parseInt(n,16))
      let lv = id[0], j = id[1], n = id[2];
      //claims by level, area, step 
      if(!app.claims[lv]) app.claims[lv] = {}
      if(!app.claims[lv][j]) app.claims[lv][j] = []
      if(!app.claims[lv][j][n]) app.claims[lv][j][n] = []

      let claims = app.claims[lv][j][n]
      if(claims.length === 0) {
        //name it
        app.findNames.set(fid, this.placeName()) 
      }
      //add claim 
      if(!claims.includes(this._i)) claims.push(this._i)
      //add claim to self
      this._claims.push(fid) 
    } 
    get claims () {
      return this._claims.map(id => app.Outlands.identifyFind(id))
    }
    get dimensions () {
      return this.claims.reduce((all,claim) => {
          if(!all.includes(claim.i)) all.push(claim.i)
          return all
        },[])
    }
    get isTrouble () { return this._trouble || false }
    get save() {
      return Object.assign({
        type: "faction",
        id: this.id,
        name: this.name,
        people: this._people
      }, this._data)
    }
  }

  app.Faction = Faction

  //now compute the factions 
  let factionsAtRank = [30, 45, 19, 19, 10, 5]
  app.factions = []
  //get random faction 
  app.randomFaction = (RNG, opts) => {
    RNG = RNG || chance
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
  //trouble 
  let troubleAtRank = [12, 16, 8, 8, 4, 2]
  //handle island claims and names 
  app.claims = {}
  app.findNames = new Map()

  factionsAtRank.forEach((n,r)=>{
    for (let i = 0; i < n; i++) {
      let nf = app.factions.length
      let fid = ethers.utils.solidityKeccak256(['address', 'string', 'uint256'], [app.ETH.addresses.ESPlanes, "factions", nf])
      app.factions.push(new app.Faction({
        id: fid,
        rank: r+1
      }))
      //now set index
      app.factions[nf]._i = nf
      /*Handle faction islands 
      */
      let di = parseInt(fid[2],16)%4
      let j = parseInt(fid.slice(3,7),16)%128
      let find = app.Outlands._setFind(di,j,3)
      //push claim 
      app.factions[nf].addClaim(find)
    }
  })
  troubleAtRank.forEach((n,r)=>{
    for (let i = 0; i < n; i++) {
      let nf = app.factions.length
      let fid = ethers.utils.solidityKeccak256(['address', 'string', 'uint256'], [app.ETH.addresses.ESPlanes, "trouble", nf])
      app.factions.push(new app.Faction({
        id: fid,
        rank: r
      }))
      //now set index
      app.factions[nf]._i = nf
      app.factions[nf]._trouble = true
      /*Handle faction islands 
      */
      let di = parseInt(fid[2],16)%4
      let j = parseInt(fid.slice(3,7),16)%128
      let find = app.Outlands._setFind(di,j,3)
      //push claim 
      app.factions[nf].addClaim(find)
    }
  })

  console.log("Factions Generated")
}

export {factionFactory}