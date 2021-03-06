//set up worker
let worker = new Worker('src/vastWorker.js')

//chance
import "../lib/chance.min.js"
//data 
import {
  CHARACTERS,
  CHARACTERITEMS,
  CHARACTERABILITIES,
  CREWS,
  CREWCLAIMS,
  CREWABILITIES,
  CREWUPGRADES,
  UNITS,
  FACTIONS,
  LOCATIONS,
  TEMPLATES,
  RULESETS
} from "../src/OutlandsData.js"

//data 
import {plateMap} from "../src/terrain.js"

let chance = new Chance()

/*
const baseNoise = new SimplexNoise('0r.8bc9a082a427986d')
const jitter = new SimplexNoise('0r.8bc9a082a427986d.1')
const fbm = (simplex,x,y,z,oct) => {
    z = z || 0
    oct = oct || 4

    let r = 0
    for(let i = 1; i <= oct; i++) {
        r += Math.pow(2,-i) * (simplex.noise3D(Math.pow(2,i)*x,Math.pow(2,i)*y,Math.pow(2,i)*z) * 0.5 + 0.5)
    }
    return Math.min(r,1)
}
//fbm( p + fbm( p + fbm( p )) )
//height(x,y,strength,size) = noise(x,y,strength*noise(size*x,size*y))
const elevation = (simplex,x,y,z,oct,str,size) => {
    str = str || 0
    size = size || 10
    
    return fbm(simplex,x,y,str*fbm(simplex,size*x,size*y,0,oct),oct)
} 

//earth - ~25000 mi circumference
//10 mi per pixel
let height = 400, width = 800;
let canvas = d3.select("#map").append("canvas").attr("width",width).attr("height",height),
    ctx = canvas.node().getContext('2d');    

const setImagePixel = (x,y,w,color,data) => {
    data[(x + y * w) * 4 + 0] = color.r;
    data[(x + y * w) * 4 + 1] = color.g;
    data[(x + y * w) * 4 + 2] = color.b;
    data[(x + y * w) * 4 + 3] = 255;
}

const updateMapPiece = (c,max) => {
    let imgdata = ctx.getImageData(0, 0, width, height);

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            let cx = c+x > max ? c+x-max : c+x 
            var el = elevation(baseNoise,cx/1200,y/600,0,8,1.45,0.85);
            //el = el > 0  ? Math.pow(el,2) : el
            //set to water at join
            let d = cx < 20 ? cx : max-cx 
            if(d < 20 && el > 0.5) {
                el = Math.max(d/20,0.5) * el 
            }

            el = el/0.5 - 1
            //adjust for peaks
            if(el > 0) el = Math.pow(el,1.75)
            //scale the colors 
            let color = el > 0 ? d3.interpolateRdYlGn(1-el) : d3.interpolateBlues(0.6) 
            color = d3.color(color)
            //set pixel
            setImagePixel(x,y,width,color,imgdata.data)
        }
    }

    ctx.putImageData(imgdata, 0, 0);
}
*/

//blades roll 
const BitDRoll = (n) => {
  let descending = function(a, b){return b - a} 
  let r = [], pass = false, six = 0;
  
  if(n == 0){
    r = chance.rpg("2d6").sort(descending)
    pass = r[0] > 3 ? true : false
    six = r[0] == 6 ? 1 : 0
  }
  else {
    r = chance.rpg(n+"d6").sort(descending)
    six = r.reduce((n,cr)=>{
      if(cr > 3) pass = true;
      return cr === 6 ? n+1 : n;
    },0)
  }

  return {
    r : r,
    pass : pass,
    six : six,
  }
}

//setup data for current map 
let display = null

//creates the VUE js instance
const UIMain = new Vue({
  el: '#ui-main',
  data: {
    isWide: false,
    showDelete : false,
    menu : 0,
    newType : 1, //new crew/character id 
    cid : "",
    sid: -1,
    pid : "",
    fid: -1,
    clocks : [],
    cli : -1,
    factions : {},
    nfid:1,
    nu: ["g",0,0,1,1],
    units : {},
    crew : {},
    character : {},
    charData : {
      newHarm: 0,
      newTrauma: ""
    },
    activeObjects : {
      characters : [],
      crews : [],
      locations : [],
      factions : []
    }
  },
  mounted() {
    this.updateFactions()
    let KU = LOCATIONS[0]

    /*
    worker.postMessage({
      f: "generate",
      data : {
        opts : {
          what : "L",
          npts : 8000,
          generator: "continent",
          seed: chance.hash()//"bdf850a4f9bf2c7090ec290ecac1b4bc06490469"//
        }
      }
    });
    */
  },
  computed: {
    rules () { return RULESETS.Outlands },
    allColors () { return COLORS },
    allCrews () { return [] },
    allUnits () { return UNITS },
    allFactions () { 
      return FACTIONS.map(f => {
        let sfi = this.activeObjects.factions.findIndex(ao => ao.id == f.id)
        let sfo = sfi > -1 ? this.activeObjects.factions[sfi] : {}
        return Object.assign({},f,sfo)
      }) 
    },
    allCharacterTypes () { return CHARACTERS },
    allCrewTypes () { return CREWS },
    allUpgrades () {return CREWUPGRADES},
    allCharacterPlaybooks() {
      return CHARACTERS.map(c => {
        c._abilities = c.abilities.map(id => CHARACTERABILITIES.find(a=> a[0]==id)) 
        c._gear = c.gear.map(id => CHARACTERITEMS.find(a=> a[0]==id)) 
        return c
      })
    },
    allCrewPlaybooks() {
      return CREWS.map(c => {
        c._abilities = c.abilities.map(id => CREWABILITIES.find(a=> a[0]==id)) 
        
        //CLAIMS
        let allClaimNames = []
        c.claimList = []
        c._claims = c.claims.ids.map((id,i) => {
          //original claim 
          let claim = CREWCLAIMS.find(a=> a[0]==id).slice()
          //find if alterante text exists
          let ati = c.claims.altText.findIndex(ai => ai[0] == i) 
          if(ati > -1) {
            claim[1] = c.claims.altText[ati][1]
            //check for flavor text
            if(c.claims.altText[ati].length>2) claim[2] = c.claims.altText[ati][2]
          }
          //keep track of all claims 
          if(!allClaimNames.includes(claim[1]) && claim[1] != "Base"){
            allClaimNames.push(claim[1])
            c.claimList.push(claim)
          }

          //return result
          return claim
        })

        //UPGRADES
        c._upgrades = c.upgrades.ids.map((id,i) => {
          //original claim 
          let upgrade = CREWUPGRADES.find(a=> a[0]==id).slice()
          //find if alterante text exists
          let ati = c.upgrades.altText.findIndex(ai => ai[0] == i) 
          if(ati > -1) {
            upgrade[2] = c.upgrade.altText[ati][1]
            //check for flavor text
            if(c.upgrade.altText[ati].length>3) upgrade[3] = c.upgrade.altText[ati][3]
          }
          //return result
          return upgrade
        })

        return c
      })
    },
    playbook () { 
      if(!this.character.type) return {}
      let C = CHARACTERS.find(c=>c.id == this.character.type)
      C._abilities = C.abilities.map(id => CHARACTERABILITIES.find(a=> a[0]==id)) 
      return C       
    },
    crewBook () { 
      if(!this.crew.type) return {}
      let C = CREWS.find(c=>c.id == this.crew.type)
      C._abilities = C.abilities.map(id => CREWABILITIES.find(a=> a[0]==id)) 
      return C       
    },
    current () { 
      if(!this.cid) return {}
      return LOCATIONS.find(d=>d.seed == this.cid)
    },
    selected () { 
      //pull from data 
      if(this.sid>-1) return display.map[this.sid]._data;
      else return {};
    },
    parent () { 
      if(!this.pid) return {}
      return LOCATIONS.find(d=>d.seed == this.pid)
    },
    faction () {
      if(this.fid<0) return {}
      //pull data from factions 
      let F = Object.assign({},this.allFactions.find(f=>f.id == this.fid))
      //assign clocks and update 
      this.clocks = F.clocks || []
      Vue.nextTick(this.updateClocks)
       
      return F
    },
  },
  methods: {
    info() {},
    remove(what,id) {
      worker.postMessage({
        f: "delete",
        what : what,
        data : id,
      });
    },
    save(what) {
      let data = null
      if(what==="crews") data = JSON.parse(JSON.stringify(this.crew));
      else if (what==="characters") data = JSON.parse(JSON.stringify(this.character));
      else if (what==="factions") {
        let F = this.faction
        //pull template
        data = JSON.parse(JSON.stringify(TEMPLATES.faction))
        //save limited data 
        data.id = F.id
        data.cfw = F.cfw.slice().map(Number)
        data.clocks = this.clocks.slice()
      }
      else return;

      worker.postMessage({
        f: "save",
        what : what,
        data : data,
      });
    },
    roll(n) {
      console.log(BitDRoll(n))
    },
    updateFactions () {
      this.factions = {
        parent : this.parent.factions ? this.parent.factions.map(id => FACTIONS.find(f=> f.id == id)) : [],
        current : this.current.factions ? this.current.factions.map(id => FACTIONS.find(f=> f.id == id)) : [],
        selected : this.selected.factions ? this.selected.factions.map(id => FACTIONS.find(f=> f.id == id)) : []
      }

      let su = this.selected.units ? this.selected.units.map(u=> {
        return {
          color : FACTIONS.find(f=>f.id == u[1]).color,
          name: UNITS.find(f=>f.id == u[2]).name,
          q: u[4],
          sz: u[3]
        }
      }) : []

      this.units = {
        parent: [],
        selected: su,
        current: []
      }
    },
    updateClocks() {
      //update display
      Vue.nextTick(()=>drawClocks())
    },
    addClock() {
      let i = this.clocks.length
      //don't create new if one exists
      if(i>0 && this.clocks[i-1][0].length == 0) return;
      //create a new one
      this.clocks.push(['',8,0])
      //set edit index
      this.cli=i
      this.updateClocks()
    },
    addUnit() {
      let i = LOCATIONS.findIndex(d=>d.seed == this.selected.seed)
      //does not exist - create it
      if(i < 0) {
        LOCATIONS.push(Object.assign({},this.selected))
        i = LOCATIONS.length - 1
      }
      let S = LOCATIONS[i]

      //push unit to location 
      S.units.push(this.nu)
      this.updateFactions()
    },
    addFaction() {
      let i = LOCATIONS.findIndex(d=>d.seed == this.selected.seed)
      //does not exist - create it
      if(i < 0) {
        LOCATIONS.push(Object.assign({},this.selected))
        i = LOCATIONS.length - 1
      }
      let S = LOCATIONS[i]

      S.factions.push(this.nfid)
      this.updateFactions()
    },
    addCharacter() {
      this.menu = 3
      //assign to the crew 
      this.character = JSON.parse(JSON.stringify(TEMPLATES.character))
      this.character.id = chance.hash()
      this.character.type = this.newType
    },
    addCrew() {
      this.menu = 1
      //assign to the crew 
      this.crew = JSON.parse(JSON.stringify(TEMPLATES.crew))
      this.crew.id = chance.hash()
      this.crew.type = this.newType
    },
    addCrewSpecial(what,i,m) {
      //get current count 
      let cc = this.hasSpecial(what,i)
      //get the right object
      what = what == "a" ? "abilities" : "upgrades"
      let C = this.crew[what]
      //see if they can have more than 1 
      let n = what == "abilities" ? 1 : CREWUPGRADES[i][1]
      let ai = C.indexOf(i)
      //add or remove abilities
      if(cc+1 > n || m == cc ) C.splice(ai,1);
      else C.push(i);
    },
    //check if a crew has an upgrade 
    hasSpecial(what,i) {
      //load the right object
      what = what == "a" ? "abilities" : "upgrades"
      let C = this.crew[what]
      //count the number 
      return C.reduce((sum,val)=>{
        sum = val === i ? sum+1 : sum
        return sum 
      },0)
    },
    fillable(what,val) {
      if(this.menu === 1){
        val = val == 1 && this.crew[what] == val ? 0 : val
        Vue.set(this.crew,what,val)
      }
      //multiple xp values for a character
      else if(this.menu === 3){
        let data = null
        let id = null
        if(["stress","trauma","recovery"].includes(what)){
          data = this.character
          id = what
        }
        else {
          what = what.split(".")
          data = this.character[what[0]]
          id = Number(what[1])
        }
        val = val == 1 && data[id] == val ? 0 : val
        //set the object
        Vue.set(data,id,val)
      }
    },
    enter(obj) {
      let i = LOCATIONS.findIndex(d=>d.seed == obj.seed)
      //does not exist - create it
      if(i < 0) {
        LOCATIONS.push(Object.assign({},obj))
        i = LOCATIONS.length - 1
      }
      let S = LOCATIONS[i]

      worker.postMessage({
        f: "generate",
        data : S
      });
    },
    showCrews() {
      this.menu = 2
    }
  }
})

const drawClaimMaps = () => {
}

const drawClocks = () => {
  UIMain.clocks.forEach((c,i) => {
    var arc = d3.arc().innerRadius(0).outerRadius(16)
    var data = d3.range(c[1]).map(()=>1)
    let pie = d3.pie()(data)

    //select and clear 
    let svg = d3.select("#clock-"+i)
    svg.html("")
        
    //append the g to shift center
    let vis = svg.append("g").attr("transform", "translate(" + 17 + "," + 17 + ")")
    //append the arcs
    vis.selectAll("path").data(pie).enter().append("path")
      .attr("d",arc)
      .attr("class",(d,j)=> "slice " + (j<c[2] ? "filled" : "") )
      //add interaction 
      .on("click",(d,j) => {
        //update clocks
        c[2] = j==0 && c[2] == 1 ? 0 : j+1
        drawClocks()
      })
  })
}

const drawPlate = () => {
  //set size
  let svg = d3.select("#map svg").attr("width", 800)
  plateMap(svg,display)
}

const drawCircleMap = ()=>{
  let R = 400
  //set size
  let svg = d3.select("#map svg").attr("height", 2 * R).attr("width", 2 * R)
  //clear
  svg.html("")

  //add data
  let data = display.data  
  let map = display.map.map((d,i)=>{
    let lid = LOCATIONS.findIndex(l=>l.seed == d._data.seed)
    d._data = lid > -1 ? LOCATIONS[lid] : d._data

    //else if ()
    return Object.assign({
      i,
      get name () { return this._data.name || this._data.seed },
      get what () { return this._data.opts.what }
    },d)
  })

  //look for sectors/subsectors
  let c = map.filter((d,i) => ["B","S"].includes(d.what))
  //orbitals 
  let o = map.filter((d,i) => d.what === "O")
  //systems 
  let y = map.filter((d,i) => d.what === "Y")

  let mapSelect = (d)=>{
    d3.selectAll("circle").classed("selected", false)
    d3.select("#s_" + d.name).classed("selected", true)
    //set to index 
    UIMain.sid = d.i
    UIMain.updateFactions()
  }

  //for ease initially 
  //TODO different icons 
  let all = c.concat(o,y)
  svg.selectAll("circle").data(all).enter().append("circle")
    .attr("id", d=>"s_" + d.name)
    //have to adjust for map being 2R in width/height
    .attr("cx", d=>d.x*2*R).attr("cy", d=>d.y*2*R)
    .attr("r", d=>{
      if(["B","S"].includes(d.what)) return d.r *2*R * d.data.rm;
      else if (d.what === "O") return 7;
      else if (d.what === "Y") return 4;
    })
    .attr("class",d => {
      if(["B","S"].includes(d.what)) return "sector";
      else if(d.what === "O") return "orbital";
      else if(d.what === "Y") return "system";
    })
    .on("click tap", mapSelect)
  svg.selectAll("text").data(all).enter().append("text").attr("x", d=>d.x*2*R - d.name.length * 4).attr("y", d=>d.y*2*R).text(d=>d.name).on("click tap", mapSelect)

  //set selected
  display.map = map
  UIMain.cid = data.seed
  UIMain.sid = -1
  UIMain.pid = data.parent || "" 
  UIMain.updateFactions()
}

const drawOrbital = () => {
  let w = 800
  //set size
  let svg = d3.select("svg").attr("height",w).attr("width",w)
  //clear
  svg.html("")
  //get plates 
  let data = display.data
  let plates = display.map
  let sqnp = Math.sqrt(plates.length)
  let pw = w / sqnp

  //do all the transform to location at the g level 
  let pg = svg.selectAll("g").data(plates).enter().append("g")
    .attr("transform",(d,i) => "translate("+pw*(i%Math.floor(sqnp))+","+pw*Math.floor(i/sqnp)+")")
  
  pg.append("rect").classed("plate",true)
    .attr("x",0)
    .attr("y",0)
    .attr("width",pw)
    .attr("height",pw)
  
  plates.forEach((p,i) => {
    //pull the plate 
    let g = d3.select(pg.nodes()[i])
    g.selectAll("polygon").data(p.polys).enter().append("polygon")
      .attr("class","land")
      .attr("points",d=>{
        return d.map(pp => [pp[0]*pw,pp[1]*pw]).join(" ")
      })
    /*
    g.selectAll("circle").data(p.land).enter().append("circle")
      .attr("class","land")
      .attr("cx",d=>d.x*pw)
      .attr("cy",d=>d.y*pw)
      .attr("r",d=>d.r*pw)
      */
  })

  //set selected
  UIMain.cid = data.seed
  UIMain.sid = -1
  UIMain.pid = data.parent || ""
}

worker.onmessage = function(e) {
  let d = e.data
  if (d.f === "generate") {
    display = Object.assign({
      get what () { return this.data.opts.what }
    },d)
    //check for which display
    if(["U","B","S"].includes(display.what)) drawCircleMap();
    else if (display.what === "O") drawOrbital();
    else if (display.what === "L") drawPlate();
    //remove spinner
    d3.select("#spinner").attr("class", "lds-dual-ring hidden")
  }
  else if (["saved","load"].includes(d.f)) {
    //load saved data
    UIMain.activeObjects[d.what] = d.data
  }
}
