let hexlify = (n)=>{
  return ethers.utils.hexlify(n).slice(2)
}

let outlandsFactory = (app)=>{

  app.finds = {}

  class Outlands {
    constructor() {
      this._init = false
      this._epoch = 0

      this._tick = 0
      this._last = 0
      this._step = 1000

      this._r = 7 * 24
      this._level = 1

      //holder for hazards
      this._hazards = new Map()
      //holder for islands
      this._knownPositions = new Map()
      this._positions = new Map()

      this._counts = new Map()
      //set counts for islands and finds 
      let max = Math.pow(256, 4)
      this.counts = {
        islands: {
          total: max / 4,
          per: max / 4 / 256
        },
        finds: {
          total: max,
          per: max / 256
        }
      }
    }
    getRotation(i) {
      //rotation of nexus is based upon seed 
      let hash = this.getSeed(i).slice(2)
      //each radial (24 steps) has the same rotation 
      let r = []
      for (let i = 0; i < 7; i++) {
        let rr = parseInt(hash.slice(i * 3, (i * 3) + 3), 16) % 512
        r.push((rr - 256) / 10)
      }
      return r
    }
    getSeed(i) {
      //create hash for the epoch and dimension
      if (i < 0)
        return ""
      return ethers.utils.solidityKeccak256(['address', 'string', 'uint256', 'uint256'], [app.ETH.addresses.ESPlanes, "outlands", this._epoch, i])
    }
    //find what the point intersects - is it within an area
    // x, y must be between -168 and 168
    pointIntesects(x, y) {
      let isWithin = (p,r)=>{
        //hazards and islands are all packed in a box from 0 to 2*7*24 (336)
        let dx = x - (p.x - 168)
        let dy = y - (p.y - 168)
        return dx * dx + dy * dy < r * r
      }

      //check factions for patrols
      let F = this.levelFactions.get(this._level).filter(f=>isWithin(f._island.p, 24))
      //check hazards for interaction
      let H = this.getHazards(this._level).filter(h=>isWithin(h, h.data.r))
      //check r and theta for nexus 
      let N = []
      let r = Math.sqrt(x * x + y * y)
      //atan2 is y,x
      let theta = Math.atan2(y, x) * 180 / Math.PI
      theta = theta < 0 ? 360 + theta : theta
      //account for rotation at radial
      //radial index
      let ri = Math.floor(r / 24)
      let R = this.getRotation(this._level)[ri]
      //have to be within a degree of a 5 degree
      if (Math.abs((theta - R) % 5) < 1)
        N = [Math.floor(r / 2) * 2, Math.floor((theta - R) / 5) * 5]
      else if (Math.abs((theta - R) % 5) > 4)
        N = [Math.floor(r / 2) * 2, Math.floor((theta - R + 1) / 5) * 5]

      if (N.length)
        N = this.getSite(this._level, ...N)

      return {
        p: {
          x: x,
          y: y,
          r: r,
          theta: theta
        },
        factions: F,
        hazards: H,
        nexus: N
      }
    }
    /*set a claim for a faction 
        fi - faction index
        i - dimension index
        j - poistion index
        si - site index
    */
    setClaim(fi, i, j, si) {//if(app.islandClaims)
    }
    getLevelPostions(i) {
      let hash = this.getSeed(i)
      //check if it exists
      if (this._positions.has(i)) {
        let p = this._positions.get(i)
        if (p.hash === hash)
          return p.positions
      }
      let RNG = new Chance(hash)
      //positions for the islands
      let islands = {
        name: "outlands",
        children: []
      }
      for (let i = 0; i < 128; i++)
        islands.children.push({
          r: Math.sqrt(RNG.d4())
        })
      //create hierarchy in order to circle pack 
      let h = d3.hierarchy(islands)
      h.sum(d=>2 * Math.PI * d.r * d.r)
      //pack to standard radius 
      let pack = d3.pack().size([2 * this._r, 2 * this._r])
      pack(h)
      //return the children
      this._positions.set(i, {
        hash: hash,
        positions: h.children.map(c=>{
          delete c.parent
          return c
        }
        )
      })
      return this.getLevelPostions(i)
    }
    //create a specific find 
    _setFind(i, j, what) {
      //get finds in area
      if (!app.finds[i])
        app.finds[i] = {}
      if (!app.finds[i][j])
        app.finds[i][j] = []
      let finds = app.finds[i][j]
      //step count 
      let n = finds.length
      //set find and return 
      finds.push(what)
      //return id 
      return [hexlify(i), hexlify(j), hexlify(n), hexlify(what)].join(".")
    }
    /*make a find 
        i - level/dimension index
        j - position index
    */
    randomFind(i, j) {
      let hash = ethers.utils.solidityKeccak256(['address', 'address', 'uint256'], [app.ETH.addresses.ESPlanes, app.wallets.main.address, Date.now()])
      let RNG = new chance(hash)
      //determine what it is 
      // 0 empty, 1 debris, 2 water, 3 island 
      let what = RNG.d4() - 1
      //get the id 
      let fid = this._setFind(i, j, what)
      //50 chance there is a faction claim on the find  
      if(RNG.d100() <= 60) {
          //certain factions are more likely based upon rank
          let r = RNG.pickone([1,2,3,4,5,6],[10,10,15,15,25,25])
          // 75% a faction on the plane otherwise any faction 
          let F;
          if(RNG.bool({likelihood:75})) {
              let allF = app.factions.filter(f => f.r === r && f.dimensions.includes(i))
              F = RNG.pickone(allF)
          }
          else F = app.randomFaction(RNG,{r:r})            
          //give them a claim 
          F.addClaim(fid)
      }
      //50% of the time there will be a trouble faction claim too 
      if(RNG.d100() <= 55) {
          //let d = RNG.weighted(["entity","faction"],[1,6])
          //certain factions are more likely based upon rank
          let r = RNG.pickone([1,2,3,4,5,6],[10,10,15,15,25,25])
          // 75% a faction on the plane otherwise any faction 
          let F;
          if(RNG.bool({likelihood:75})) {
              let allF = app.factions.filter(f => f.r === r && f.dimensions.includes(i) && f.isTrouble)
              F = RNG.pickone(allF)
          }
          else F = app.randomFaction(RNG,{r:r, trouble:true})            
          //give them a claim 
          F.addClaim(fid)    
      }
      //evidence of something
      if(RNG.d100 <= 8) {
          //evidence - one time find - if they complete a labor
          let ev = RNG.weighted(["nada","debris","stash"])
      }
      
      //return id 
      return fid
    }
    getHazards(i) {
      //hash for epoch and dimension
      let hash = ethers.utils.solidityKeccak256(['bytes32', 'string'], [this.getSeed(i), "hazards"]).slice(2)
      //check if it exists
      if (this._hazards.has(i)) {
        let h = this._hazards.get(i)
        if (h.hash === hash)
          return h.hazards
      }
      //get noise
      let RNG = new Chance(hash)
      let simplex = new SimplexNoise(hash)

      let nodes = {
        name: "hazards",
        children: []
      }
      for (let j = 0; j < 300; j++)
        nodes.children.push({
          r: RNG.d4() + RNG.d4()
        })
      //create hierarchy in order to circle pack 
      let hn = d3.hierarchy(nodes)
      hn.sum(d=>2 * Math.PI * d.r * d.r)
      //pack to standard radius 
      let pack = d3.pack().size([2 * this._r, 2 * this._r])
      pack(hn)

      let r = this._r, n, what;
      let hazards = hn.children.filter(h=>{
        what = []
        n = simplex.noise3D((h.x - 168) / r, (h.y - 168) / r, 0)
        if (n > 2 / 3)
          what = ["razor stones", "stones"]
        else if (n < -2 / 3)
          what = ["disintegration", "death"]
        else if (n > -1 / 6 && n < 1 / 6)
          what = ["slow mist", "mist"]

        if (what.length > 0) {
          h.rank = n
          h.what = what
          //adjust for 168 pack offset
          h.x -= 168
          h.y -= 168
          //delete parent
          delete h.parent
          return h
        }
      }
      )
      //add so it does not have to compute again
      this._hazards.set(i, {
        hash: hash,
        hazards: hazards
      })

      return hazards
    }
    //
    identifyFind(id) {
      let cid = id.split(".").map(n=>parseInt(n, 16))

      let hash = ethers.utils.solidityKeccak256(['address', 'string'], [app.ETH.addresses.ESPlanes, id]).slice(2)
      let RNG = new Chance(hash)
      //size - vast majority are only a couple hundred miles across
      let nd3 = RNG.weighted([0,1,4,16],[192,47,16,1]) 
      let size = nd3 > 0 ? RNG.rpg(nd3+"d3",{sum:true}) : 1
      
      //determine special aspects of find 
      let special = [], s;
      for(let i = 0; i < size; i++) {
          s = { _i : i }
          //element
          if(RNG.d10() <= 5) {
              s.e = [RNG.d6()-1, RNG.weighted([1,2,3,4,5],[425, 425, 139, 10, 1])]
          }
          //hazard 
          if(RNG.d100() <= 25) s.hz = RNG.d12()
          //discovery
          if(RNG.d100() <= 30) {
              // <= 26 - ["feature",[1,2,1,6]] 3,4
              let di = RNG.weighted(["u","f","s"],[1,3,4])
              //something unnatural
              if(di === "u") {
                  let ut = RNG.weighted(["hz","rift","ruin"],[9,2,1])
                  if(ut === "ruin") s.ruin = true
                  else if (ut === "rift") s.rift = true
                  else s.hz = RNG.d12()
              }
              else if(di === "f"){
                  let f = RNG.weighted(["lair","terrain","mark","res"],[2,7,2,1])
                  if(f === "res") {
                      if(s.e) s.e[1]++ 
                      else s.e = [RNG.d6()-1, RNG.weighted([1,2,3,4,5],[425, 425, 139, 10, 1])]
                  }
                  else if(f === "lair") s.ruin = true
                  else s.di = f 
              }
              else {
                  let st = RNG.weighted(["enigmatic","infrastructure","dwelling","ruin"],[1,2,1,6])
                  if(st === "ruin") s.ruin = true
                  else s.di = st 
              }
          }
          //only push if things have been added
          if (Object.keys(s).length > 1) special.push(s)
      }
      
      return {
        id: id,
        i: cid[0],
        j: cid[1],
        n: cid[2],
        what: cid[3],
        p: this.getLevelPostions(cid[0])[cid[1]],
        size : size,
        special : special
      }
    }
    getResource(si) {
      //validate type
      if (this.getSiteType(si) !== 1)
        return
      let hash = ethers.utils.solidityKeccak256(['address', 'string', 'uint256'], [app.ETH.addresses.ESPlanes, "outlands-resource", si]).slice(2)
      //now compute nature
      let color = parseInt(hash.slice(0, 2), 16) % 8
      return {
        hash: hash,
        color: color > 5 ? 6 : color,
        //class of find 
        find: (1 + parseInt(hash.slice(2, 4), 16)) * (1 + parseInt(hash.slice(4, 6), 16))
      }
    }
    getRuin(si) {
      //validate type
      if (this.getSiteType(si) !== 2)
        return
      let hash = ethers.utils.solidityKeccak256(['address', 'string', 'uint256'], [app.ETH.addresses.ESPlanes, "outlands-ruin", si]).slice(2)
      //now compute size 
      let sz = [2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 6][parseInt(hash.slice(0, 1), 16) % 6 + parseInt(hash.slice(1, 2), 16) % 6]
      sz = sz < 6 ? sz : [6, 6, 6, 7, 7, 8, 9, 10][parseInt(hash.slice(2, 3), 16) % 8]
      return {
        hash: hash,
        //size of ruin 
        size: sz
      }
    }
    getIsland(si) {
      //validate type
      let hash = ethers.utils.solidityKeccak256(['address', 'string', 'uint256'], [app.ETH.addresses.ESPlanes, "outlands-island", si]).slice(2)
      //size - vast majority are only a couple hundred miles across
      let nd3 = 0
      // [0,1,4,16]
      if (si >= 2956984320) {
        let nsz = parseInt(hash.slice(2, 4), 16)
        if (nsz < 192)
          nd3 = 0
        else if (nsz < 239)
          nd3 = 1
        else if (nsz < 255)
          nd3 = 4
        else
          nd3 = 16
      } else
        nd3 = 0

      let ni = 0
      for (let i = 0; i < nd3; i++) {
        ni += 2 + parseInt(hash.slice(4 + i, 5 + i), 16) % 3
      }
      if (ni === 0)
        ni = 1

      //positioning 
      let dj = this.getFindLocation(si, true)
      let p = this.getIslandPostions(dj[0])[dj[1]]

      return {
        i: si,
        hash: hash,
        //size island 
        size: ni,
        d: dj[0],
        j: dj[1],
        p: p
      }
    }
    getDimensionFinds(i) {
      if (!app.finds[i])
        return []

      let P = this.getLevelPostions(i)
      let C = app.claims[i]
      let F = app.factions
      let j, claims, allf, finds, points = [];
      for (let x in app.finds[i]) {
        j = Number(x)
        claims = C[j]
        //finds 
        finds = app.finds[i][j].map((what,n) => [hexlify(i), hexlify(j), hexlify(n), hexlify(what)].join("."))
            .map(id => this.identifyFind(id))
        //get all factions at location
        allf = claims.reduce((all,fid)=>{
          if (!all.includes(fid))
            all.push(fid)
          return all
        }
        , []).map(fid=> F[fid])

        points.push({
          j: j,
          x: P[j].x,
          y: P[j].y,
          finds : finds,
          factions: allf
        })
      }

      return points
    }
    displayLevel(i) {
      this._level = i

      let cx, cy;
      cx = cy = 400;
      //delta conversion - r display to r of outlands
      let dc = 400 / (7 * 24)

      //clear box 
      let dBox = d3.select("#dBox")
      dBox.html("")

      dBox.append("circle").attr("id", "outlandsBack").attr("cx", cx).attr("cy", cy).attr("r", 400).attr("fill", "url(#outGrad)")

      //show compass
      let cl = [[400, 0, 400, 800], [0, 400, 800, 400], [0, 0, 800, 800], [0, 800, 800, 0]]
      for (let i = 0; i < 4; i++) {
        dBox.append("line").attr("clip-path", "url(#outlandsClip)").attr("class", "compass").attr("x1", cl[i][0]).attr("y1", cl[i][1]).attr("x2", cl[i][2]).attr("y2", cl[i][3])
      }
      //append radials
      for (let i = 1; i < 7; i++) {
        dBox.append("circle").attr("class", "radial").attr("cx", cx).attr("cy", cy).attr("r", i * 24 * 400 / (7 * 24))
      }

      //append hazards
      let gHazards = dBox.append("g").attr("id", "hazards")
      let hz = this.getHazards(i)
      gHazards.selectAll("circle").data(hz).enter().append("circle").attr("class", d=>"hazard " + d.what[1])
        .attr("cx", d=>cx + (dc * d.x)).attr("cy", d=>cy + (dc * d.y)).attr("r", d=>dc * d.r).attr("fill", "none")

      //faction islands 
      let gIslands = dBox.append("g").attr("id", "islands")
      //islands are all packed in a box from 0 to 2*7*24 (336)
      gIslands.selectAll("circle").data(this.getDimensionFinds(i)).enter().append("circle")
        .attr("cx", d=>cx + (dc * (d.x - 168))).attr("cy", d=>cy + (dc * (d.y - 168))).attr("r", 3).attr("fill", "black").on("click tap", d=>console.log(d))

      /*
      let influence = dBox.append("g").attr("class","influence")
        influence.selectAll("circle").data(islands).enter().append("circle")
            .attr("cx", d=>cx + (dc * (d.p.x-168))).attr("cy", d=>cy + (dc * (d.p.y-168))).attr("r", dc * 24).attr("fill","none").attr("stroke", this.player.color)
            */

      //center null
      dBox.append("circle").attr("id", "outlandsCenter").attr("cx", cx).attr("cy", cy).attr("r", 3).attr("fill", "white").attr("stroke", "none")
    }
  }

  //set up click 
  d3.select("#dBox").on("click tap", function() {
    ///delta conversion - r display to r of outlands
    let coords = d3.mouse(this).map(p=>(p - 400) * 7 * 24 / 400);

    //search for intersections 
    //let intersects = app.Outlands.pointIntesects(...coords)
    //console.log(intersects)
  })

  app.Outlands = new Outlands()
}

export {outlandsFactory}


/*
      let hash = ethers.utils.solidityKeccak256(['address', 'string'], [app.ETH.addresses.ESPlanes, id]).slice(2)
      //size - vast majority are only a couple hundred miles across
      let nd3 = 0
      // [0,1,4,16]
      let nsz = parseInt(hash.slice(2, 4), 16)
        if (nsz < 192)
          nd3 = 0
        else if (nsz < 239)
          nd3 = 1
        else if (nsz < 255)
          nd3 = 4
        else
          nd3 = 16

      let ni = 0
      for (let i = 0; i < nd3; i++) {
        ni += 2 + parseInt(hash.slice(4 + i, 5 + i), 16) % 3
      }
      if (ni === 0)
        ni = 1
      
      //determine special aspects of find 
      hash = ethers.utils.solidityKeccak256(['address', 'string', 'string'], [app.ETH.addresses.ESPlanes, id, 'discoveries']).slice(2)
      let discoveries = []
      for(let i = 0; i < ni; i++) {

      }
      */