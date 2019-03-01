let ruinFactory = (app)=>{
  const APPROACHES = ["Careful", "Clever", "Flashy", "Forceful", "Quick", "Sneaky"]
  const REGIONS = [1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 7, 8, 9, 10]
  const ZONES = [3,3,3,4,4,5,5,6]

  let activeZones;

  let dF = (sum) => {
    let r = app.chance.rpg("4d3") 
    return sum ? r.reduce((s,v) => v+s,-8) : r 
  }

  let heroicDamage = (dice) => {
    let r = app.chance.rpg(dice)
    //run damage calc 
    return r.reduce((sum,n) => {
      if(n === 1) sum+=0;
      else if(n < 6) sum+=1;
      else if(n < 10) sum+=2;
      else sum+=4;
      return sum
    },0)    
  }

  //["Vermin","Rabble","Thugs","Soldiers","Veteran","Brute","Beast","Sorcerer","Tank","Swarm","Elite"]
  const npcBuilder = (type, n, T) => {
    T = T || 1
    let mHD = T < 3 ? 3 : T
    let hd = [], stats = {};
    //HD
    if(["Vermin","Rabble","Thugs","Soldiers"].includes(type)) {
      hd = d3.range(n).map(_ => 1);
      if(type === "Vermin") stats = {AC:0,atk:0,dmg:"1d4",ml:7,skill:0};
      if(type === "Rabble") stats = {AC:0,atk:1,dmg:"1d4",ml:8,skill:1};
      if(type === "Thugs") stats = {AC:1,atk:1,dmg:"1d6",ml:8,skill:1};
      if(type === "Soldiers") stats = {AC:3,atk:1,dmg:"1d6",ml:8,skill:1};
    }
    if(type === "Veteran") {
      hd = d3.range(n).map(_ => 2);
      stats = {AC:4,atk:2,dmg:"1d8",ml:9,skill:2}
    }
    if(type === "Brute") {
      hd = d3.range(n).map(_ => mHD+2);
      stats = {AC:3,atk:T+2,dmg:"1d10",ml:10,skill:2}
    }
    if(type === "Sorcerer") {
      hd = d3.range(n).map(_ => mHD);
      stats = {AC:1,atk:T,dmg:"1d4",ml:9,skill:3}
    }
    if(type === "Tank") {
      hd = d3.range(n).map(_ => mHD+1);
      stats = {AC:6,atk:T+1,dmg:"1d8",ml:10,skill:2}
    }
    if(type === "Beast") {
      hd = d3.range(n).map(_ => mHD);
      stats = {AC:3,atk:T,dmg:"1d6,1d6",ml:8,skill:2}
    }
    if(type === "Swarm") {
      hd = d3.range(n).map(_ => 2*mHD);
      stats = {AC:0,atk:T,dmg:"1d6",ml:9,skill:0}
    }
    if(type === "Elite") {
      hd = d3.range(n).map(_ => mHD+3);
      stats = {AC:5,atk:T+4,dmg:"1d8+2",ml:11,skill:4}
    }
    return {type,hd,stats}
  } 

  app.ruins = {
    active : {},
    random (hash, opts) {
      hash = hash || app.chance.hash()
      opts = opts || {}
      //determine size 
      let size = this.size(hash,opts)

      let RNG = new Chance(hash)
      //threat
      let rt = dF(true)
      rt = [-1,0,1].includes(rt) ? 0 : rt < 0 ? -1 : 1
      //determine faction 
      let fid = 32+16+RNG.rpg("1d32")[0]-1
      let F = app.factions._current[fid]
      let name = F.placeName(RNG)
      //trouble
      let tid = 32+RNG.rpg("1d16")[0]-1
      let T = app.factions._current[tid]

      let ruin = Object.assign({
        hash, 
        i: -1, 
        T : F.rank + rt,
        faction : F,
        name : name,
      },size)
      //position 
      this.position(ruin)
      //return result
      return ruin
    },
    size (hash, opts) {
      opts = opts || {}
      //determine size 
      let size = REGIONS[parseInt(hash.slice(2,4),16)%16]
      size = opts.size || size 
      //for each - determine the number of zones
      let nz = d3.range(size).map(i => ZONES[parseInt(hash.slice(4+i,5+i),16)%8])
      let stairs = d3.range(size).map(i => 1+parseInt(hash.slice(4+i,5+i),16)%(nz[i]-1))
      //entry points
      //0 region is always entry
      let enter = ["0.-1","0.0"]
      //if greater than 7 100% chance 3, 50% chance of 5
      if(size > 7) {
        enter.push("3.0","3.-1")
        if(parseInt(hash.slice(2,3),16)%2) enter.push("5.0","5.-1")
      }   
      //if greater than 5 50% chance of seeing 3 
      else if(size > 5 && parseInt(hash.slice(2,3),16)%2) enter.push("3.0","3.-1")

      return {regions: nz, stairs, enter,
        visible: [],
        visited : []
      }
    },
    factory(plane, rid, opts) {
      opts = opts || {}
      let hash = ethers.utils.solidityKeccak256(['bytes32', 'string', 'uint256'], [plane.hash, "ruins", rid])  
      //determine size 
      let size = this.size(hash,opts)
      //determine faction 
      let F = plane.ancient

      let ruin = Object.assign({
        hash, 
        i: rid, 
        T : F.rank,
        _plane:plane,
        name : plane.ancientNames[rid+1],
      },size)
      //position 
      this.position(ruin)
      //return result
      return ruin
    },
    position (ruin) {
      let RNG = new Chance(ruin.hash)
      //positions for the zones
      let children = ruin.regions.map((n,i) => {
        return {
          rz : [i,-1], 
          children : d3.range(n).map(j => {
            return {
              rz : [i,j],
              A :  1+RNG.rpg("1d5")[0]
            }
          })           
        }
      })
      //create hierarchy in order to circle pack 
      let h = d3.hierarchy({children,rz:[-1,-1]})
      h.sum(d=>{
        return d.A
      })
      //pack to standard radius 
      let pack = d3.pack().size([100,100])
      pack(h)

      ruin._pack = h.descendants().map(d => {
        return {
          r: d.r,
          x: d.x,
          y: d.y,
          rz : d.data.rz
        }
      })
    },
    encounter (ruin, rz) {
      let T = ruin.T
      let RNG = app.chance
      //types of encounters 
      let etypes = ["Combat","Trap","Hazard","Obstacle","Puzzle"]
      let et = RNG.pickone(etypes)

      let skillGroups = {
        Combat : ["Fight","Shoot","Physique"],
        Trap : ["Crafts","Tech","Burglary"],
        Hazard : ["Athletics","Physique","Sneak"],
        Obstacle : ["Athletics","Physique","Tech","Crafts"],
        Puzzle : ["Culture","Science","Tech","Craft"],
        //thievery: ["Athletics","Burglary","Deceive","Stealth"]
      }
      let skills = [RNG.pickone(skillGroups[et])]
      //danger level 
      let dmg = 0
      if(["Trap","Hazard"].includes(et)) {
        dmg = T + (RNG.bool() ? "d4" : "d6")
        dmg = heroicDamage(dmg)
        //notice
        skills.unshift("Notice")
      }
      //check for combat
      let foes = []
      if(et === "Combat"){
        let d = RNG.d8()
        if(d === 1) foes.push(npcBuilder("Vermin",RNG.d6(),T));
        else if(d < 4) foes.push(npcBuilder("Rabble",RNG.d4(),T));
        else if(d === 4) foes.push(npcBuilder("Rabble",RNG.d4(),T),npcBuilder("Veteran",1,T));
        else if(d === 5) foes.push(npcBuilder("Soldiers",RNG.d4(),T));
        else if(d === 6) foes.push(npcBuilder("Thugs",RNG.d4(),T),npcBuilder("Veteran",1,T));
        else if(d === 7) foes.push(npcBuilder("Vermin",RNG.d6(),T),npcBuilder("Sorcerer",1,T));
        else if(d === 8) foes.push(npcBuilder("Thugs",RNG.d4(),T),npcBuilder("Brute",1,T));
        else if(d === 9) foes.push(npcBuilder("Thugs",RNG.d4(),T),npcBuilder("Tank",1,T));
        else if(d === 8) foes.push(npcBuilder("Swarm",1,T));
      }
      else {
        //30 magic
        if(RNG.d10()>7) {
          et = "Magical "+et 
          skills.push(RNG.pickone(["Magic","Psionics"]))
        }
      }

      //aspects - approach and color 
      let aspects = [APPROACHES[RNG.d6()-1],app.colors[RNG.d6()-1]]

      app.UI.activeRuin.encounters.push({rz, what: et, aspects, skills, dmg, foes, hits:[], state:[]}) 
    },
    enter (ruin, rz) {
      let _rz = rz.split("."), r = Number(_rz[0]), z = Number(_rz[1]);
      let seen = ruin.visible.slice()
      let been = ruin.visited.slice()
      let vis = seen.concat(been,ruin.enter)
      //push complete
      let i = seen.indexOf(rz)
      if(i>-1) seen.splice(i,1);
      if(!been.includes(rz)) {
        been.push(rz);
        //new entry
        this.encounter(ruin, rz)
      }
      //check for stairs
      let nr = ruin.regions.length
      let stairs = ruin.stairs[r]
      let sid = (r+1)+"."+0
      if(z === stairs && r+1 < nr && !vis.includes(sid)) seen.push(sid,(r+1)+"."+-1);
      //number of zones 
      let nz = ruin.regions[r]
      //enter a zone, always see next, 50% chance of seeing n+1
      let nid = r+"."+(z+1)
      if(z+1 < nz && !vis.includes(nid)) seen.push(nid);
      nid = r+"."+(z+2)
      if(z+2 < nz && app.chance.bool() && !vis.includes(nid)) seen.push(nid);
      //return vis 
      ruin.visible = seen.slice()
      ruin.visited = been.slice()
      //set zone 
      ruin.z = rz 
    },
    display (ruin) {
      ruin = ruin || this.active
      let n = ruin._pack.length

      let colors = d3.interpolateSinebow
      let svg = d3.select("#ruin-display")
      let ui = d3.select("#ruin-modal")
      //get canvas dimensions for compare
      let cw = ui.node().offsetWidth < 800 ? ui.node().offsetWidth : 800
      let ch = ui.node().offsetHeight < 800 ? ui.node().offsetHeight : 800
      //new dimension 
      let newD = cw < ch ? cw : ch 
      if(newD < 800) {
        svg.attr("width",newD).attr("height",newD)
      }
      //view box
      svg.attr("viewBox","-1 -1 101 101")

      activeZones = svg.selectAll("circle")
        .data(ruin._pack).enter().append("circle")
        .attr("r",d=> d.r)
        .attr("cx",d=> d.x)
        .attr("cy",d=> d.y)
        .attr("fill",(d,i)=> colors(i/n))
        .attr("class",d => {
          let what = d.rz[1] === -1 ? "region" : "zone"
          return what 
        })
      
      //redraw
      this.redraw()
    },
    redraw () {
      let ruin = this.active
      //what is visible 
      let vis = ruin.enter.concat(ruin.visible,ruin.visited)
      let been = ruin.visited
      activeZones.classed("visible",d=> vis.includes(d.rz.join(".")))
      activeZones.classed("been",d=> been.includes(d.rz.join(".")))
      activeZones.classed("within",d=> d.rz.join(".") === ruin.z)

      d3.selectAll(".zone.visible").on("click tap",d => {
        //enter
        this.enter(ruin, d.rz.join("."))
        //redraw
        this.redraw()
      })
    }
  }
}

export {ruinFactory}
