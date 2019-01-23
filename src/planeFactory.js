const CHAINS = ["ETH"]

let getFindName = (id) => {
  if(id <= 18) return "arcane"
  else if (id <= 21) return "planar"
  else if (id <= 32) return "lair"
  else if (id <= 42) return "obstacle"
  else if (id <= 58) return "newTerrain"
  else if (id <= 68) return "waterFeature"
  else if (id <= 78) return "landmark"
  else if (id <= 84) return "resource"
  else if (id <= 105) return "tracks"
  else if (id <= 119) return "remains"
  else if (id <= 127) return "stash"
  else if (id <= 169) return "creature"
  else if (id <= 176) return "enigma"
  else if (id <= 190) return "infrastructure"
  else if (id <= 197) return "dwelling"
  else if (id <= 211) return "religious"
  else if (id <= 227) return "city"
  else return "ruin"
}

const FINDS = {
  "arcane" : {tags:["color","type"],reward:["item"]},
  "planar" : {tags:["type"],reward:[]},
  "lair" : {tags:["type"],reward:["creature"]},
  "obstacle" : {tags:["once"],reward:["minCPX"]},
  "newTerrain" : {tags:["once"],reward:["minCPX"]},
  "waterFeature" : {tags:["once"],reward:["minCPX"]},
  "landmark" : {tags:["once"],reward:["minCPX"]},
  "resource" : {tags:["color","bulk"],reward:["CCPX"]},
  "tracks" : {tags:["once","lead"], lead:["stash","creature","dwelling"]},
  "remains" : {tags:["once","lead"], lead:["stash","creature"]},
  "stash" : {tags:["once"],reward:["CPX"]},
  "creature" : {tags:[], reward:["creature"]},
  "enigma" : {tags:["lead"], lead:["arcane","dwelling"]},
  "infrastructure" : {tags:["lead"], lead:["stash","dwelling"]},
  "dwelling" : {tags:["once"], reward:["character"]},
  "religious" : {tags:["color"], reward:["item","character"]},
  "city" : {tags:[], reward:["CCPX","item","character"]},
  "ruin" : {tags:[], reward:["CPX","CCPX","item","character","creature"]},
}

let planeFactory = (app) => {
  app.ECS.newCollection("planes")

  //hierarchy
  app.ECS.newComponent({
    name : "inHierarchy",
    description: "In a hierarchy of data",
    state: {
        parent : "",
    }
  })

  //general plane component 
  app.ECS.newComponent({
    name : "planeData",
    description: "Core Plane Data",
    state: {
        chain : "ETH",
        balance : 0,
    }
  })

  //general plane component 
  app.ECS.newComponent({
    name : "hasFinds",
    description: "Find information",
    state: {
        timer : {},
        once : []
    }
  })

  //track max balance
  let maxBalance = 0 

  //plane functions 
  app.planes = {
    _current : {},
    get currentEntity () { return app.ECS.getCollection("planes")[this._current._id] },
    get all () { return app.ECS.getCollection("planes") },
    factory (address, balance, chain) {
      chain = chain || 0
      let chainID = CHAINS[chain]
      let allP = app.ECS.getCollection("planes")
      let P = allP[chainID+address]

      if(!P) {
        //do not call stard entity because we want to use different ids 
        //id not in a collection - give it a collection 
        P = {
          id: address,
          name : "",
          //components 
          _c : []
        }
        app.ECS.addComponent(P,"planeData")
        app.ECS.addComponent(P,"inHierarchy")
        app.ECS.addComponent(P,"hasFinds")
        //set entity 
        allP[chainID+address] = P 
      }
      
      if(chain !== "ETH") P.chain = chain
      P.balance = balance
      P.parent = chainID+"0x"

      //check maxbalance
      if(balance > maxBalance) maxBalance = balance

      return P 
    },
    noise (plane) {
      //set noise2d function
      let n2D = (x,y) => plane._simplex.noise2D(x,y)
      let scale = [4000,400,400,125][plane._layout]

      return (x,y) => {
            let nm, os = 1.875, e = 0;
            //determine noise value - give four octives
            for(let j = 0; j < 4; j++) {
              nm = Math.pow(2,j)
              e += n2D(nm*x / scale, nm*y / scale) / nm 
            }
            e = e >= 0 ? Math.pow(e, 6) : e
            //clamp
            e = e > 1 ? 1 : e < -1 ? -1 : e
            return e 
      }
    },
    makeNames (address, lang, n) {
      let RNG = new Chance(address)
      return d3.range(n+1).map(_ => app.names.generateName(lang, RNG))
    },
    generate (address, chain) {
      chain = chain || 0
      let chainID = CHAINS[chain]
      let P = app.ECS.getCollection("planes")[chainID+address]
      let nhash = ethers.utils.solidityKeccak256(['bytes32','uint256','address'],[app.seed,chain,address]) 

      let maxArea = P.balance
      let maxR = maxArea / (64*64)
      maxR = maxR < 1 ? 1 : Math.floor(maxR)

      //determine whether a continent, random, archipelago, or islands
      let layout = [0,1,1,2,2,2,3,3][parseInt(nhash.slice(2,4),16)%8]
      //handle language primary/ancient
      let maxLang = app.names.defaultCultures.length
      let lang = {
        p : parseInt(nhash.slice(4,6),16)%maxLang,
        a : parseInt(nhash.slice(6,8),16)%maxLang
      }

      //hexagons area 4096
      //side = 39.71
      let HEX = app.hex.generateHexes(nhash,maxR)
      let RNG = new Chance(nhash)
      //place 
      this._current = {
        _id : chainID+address,
        _hash : nhash,
        _lang : lang,
        names : this.makeNames(nhash,lang.p,maxR),
        _simplex : new SimplexNoise(nhash),
        _raw : P,
        _layout : layout
      }
      //set after declaired because it is referenced
      this._current._hex = HEX.map((qr,i) => {
          //address(this), p, _planes[p][r].finder, _planes[p][r].hash
          let hash = ethers.utils.solidityKeccak256(['bytes32','uint256'],[nhash,i]) 
          let ni = parseInt(hash.slice(2,4),16)%16
          let nf
          if(ni >= 8) nf = 2;
          else if (ni >=1) nf = 1;
          else nf = 3;

          //noise - for elevation
          let noise = this.noise(this._current)
          //locate hex for return and determining elevation
          let hex = app.hex.place(...qr,39.71)
          let p = hex.centroid
          let e = noise(p.x,p.y)
          //run finds 
          let finds = d3.range(nf).map(v => {
            let fid = 1+parseInt(hash.slice(4+(v*2),6+(v*2)),16)
            let name = getFindName(fid)
            //cities wont be on water or above a certain altitude 
            if(name === "city" && (e <= 0 || e >= 0.55)) {
              name = ["enigma","dwelling","ruin"][fid%3]
            } 
            
            return name
          })

          return Object.assign({i:i,hash,finds},hex)
        })
    },
    within (x,y) {
      return this._current._hex.findIndex(h => {
        let dx = h.centroid.x - x
        let dy = h.centroid.y - y
        return (dx*dx+dy*dy) < 39.71*39.71
      })
    },
    display (r,z) {
      //clear box 
      let dBox = d3.select("#dBox")
      dBox.html("")

      //append hex 
      //let hex = plane._hex.filter(d => d.i < plane._raw.regions.length)
      let hex = this._current._hex
      let gHex = dBox.append("g").attr("id", "hex")
      gHex.attr("class", "hexagon").selectAll("polygon").data(hex).enter().append("polygon").attr("points", (d)=>{
        return d.points
      }
      ).attr("stroke", "black").attr("fill","none").on("click", (d)=>{
        console.log(d)
      }
      )

      //append points of interest 
      let points = hex.filter(h => {
        return h.finds.reduce((has,fid) => ["arcane","planar","divine","lair","resource","creature","enigma","city","ruins"].includes(fid) || has,false) 
      })
      let gPoints = dBox.append("g").attr("id", "points")
      gPoints.attr("class", "POI").selectAll("circle").data(points).enter().append("circle")
        .attr("cx", d => d.centroid.x)
        .attr("cy", d => d.centroid.y)
        .attr("r", 3)
        .attr("stroke", "none").attr("fill",d => d.finds.includes("city") ? "black" : "none").on("click", (d)=>{
        console.log(d)
      }
      )

      this.zoom(r,z)
    },
    /*
      @param ri - index of region to focus on
      @param z - zoom : 0 to 3
    */
    zoom (ri,z) {
      ri = ri || 0
      z = z || 0

      let np = [1000,3000,8000,16000][z]
      z = [2,4,8,16][z]
      //get centroid
      let HEX = this._current._hex
      let c = HEX[ri].centroid
      let R = 39.71
      //get bbox
      let bbox;
      if(z < 16) bbox = [c.x-z*R, c.y-z*R, 2*z*R, 2*z*R]
      else {
        bbox = d3.select("#hex").node().getBBox()
        bbox = [bbox.x,bbox.y,bbox.width,bbox.height]
      }
      let btxt = bbox.join(" ")

      let RNG = new Chance(this._current._raw.id)
      let noise = this.noise(this._current)
      //always generate points for voronoi display 
      let el = []
      let iHex = []
      let dP = d3.range(np).map(_ => {
        let p = [bbox[0]+RNG.random()*bbox[2], bbox[1]+RNG.random()*bbox[3]]
        let hi = app.planes.within(...p)
        //keep hex index 
        iHex.push(hi)

        let e = 0;
        if(hi === -1) e = -2
        else e = noise(...p)
        //push 
        el.push(e)
        //return point 
        return p
      })
      let V = d3.Delaunay.from(dP).voronoi([bbox[0],bbox[1],bbox[0]+bbox[2],bbox[1]+bbox[3]])
      let polys = [...V.cellPolygons()] //.filter((p,i) => el[i] > -2)

      function polygon(d) { 
        return "M" + d.join("L") + "Z"; 
      }

      //heightmap colors 
      let sealevel = [0,0,0.02,0.02][this._current._layout] 
      let hColor = d3.scaleSequential(d3.interpolateRdYlGn)
      let path = d3.select("#dBox").append("g").attr("id","polys").selectAll("path")  
      path.data(polys).enter().append("path")
          .attr("fill",(d,i) => {
             return el[i] < sealevel ? el[i] < -1 ? "none" : "aqua" : hColor(1-(el[i]-sealevel))
          }) 
          .attr("stroke","none") 
          .attr("opacity",0.75)
          .attr("d", polygon)
          .on("click", (d,i) => { 
            if(iHex[i] > -1) {
              let h = HEX[iHex[i]]
              console.log(h) 
              //set finds 
              app.UI.findModal.ri = h.i 
              app.UI.findModal.finds = h.finds
              //open modal
              if(app.UI.findModal.findText.length > 0) $('#ui-find').modal('show')
              //else 
              else app.notify({h:"No Finds"})
            }
          })
      
      //set view box 
      d3.select("#outlandsSVG").attr("viewBox",btxt)
    },
    /* Make a Find
      @param ri - the region index   
      @param fi - the find index 
    */
    makeFind (ri, fi) {
      //get the entity 
      let P = this.currentEntity
      //check for finds 
      if(!app.ECS.hasComponent(P,"hasFinds")) app.ECS.addComponent(P,"hasFinds")
      //get what the find is 
      let what = this._current._hex[ri].finds[fi]
      let data = FINDS[what]
      //one time event - push 
      if(data.tags.includes("once")) {
        P.once.push(ri+"."+fi)
        //push ui update 
        app.UI.findModal.finds = this._current._hex[ri].finds.slice()
      }
      //track a lead 
      if(data.tags.includes("lead")) {
        //random pick 
        what = app.chance.pickone(data.lead)
        data = FINDS[what]
      }
      let reward = app.chance.pickone(data.reward)

      let address = P.id
      let hash = ethers.utils.solidityKeccak256(['bytes32','uint256','uint256','uint256'],[this._current._hash,ri,fi,Date.now()]) 
      return hash
    },
  }

  //create 0x
  let ETH0x = app.planes.factory("0x",0)

}

export {planeFactory}