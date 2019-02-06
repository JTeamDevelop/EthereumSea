let glTest = ()=>{
  let tc = document.createElement('canvas')
  return tc.getContext("webgl") || tc.getContext("experimental-webgl")
}

const CHAINS = ["ETH"]

let getFindName = (id)=>{
  if (id <= 18)
    return "arcane"
  else if (id <= 21)
    return "planar"
  else if (id <= 32)
    return "lair"
  else if (id <= 42)
    return "obstacle"
  else if (id <= 58)
    return "newTerrain"
  else if (id <= 68)
    return "waterFeature"
  else if (id <= 78)
    return "landmark"
  else if (id <= 84)
    return "resource"
  else if (id <= 105)
    return "tracks"
  else if (id <= 119)
    return "remains"
  else if (id <= 127)
    return "stash"
  else if (id <= 169)
    return "creature"
  else if (id <= 176)
    return "enigma"
  else if (id <= 190)
    return "infrastructure"
  else if (id <= 197)
    return "dwelling"
  else if (id <= 211)
    return "religious"
  else if (id <= 227)
    return "city"
  else
    return "ruin"
}

const FINDS = {
  "arcane": {
    tags: ["color", "type"],
    reward: ["item"]
  },
  "planar": {
    tags: ["type"],
    reward: []
  },
  "lair": {
    tags: ["type"],
    reward: ["creature"]
  },
  "obstacle": {
    tags: ["once"],
    reward: ["minCPX"]
  },
  "newTerrain": {
    tags: ["once"],
    reward: ["minCPX"]
  },
  "waterFeature": {
    tags: ["once"],
    reward: ["minCPX"]
  },
  "landmark": {
    tags: ["once"],
    reward: ["minCPX"]
  },
  "resource": {
    tags: ["color", "bulk"],
    reward: ["CCPX"]
  },
  "tracks": {
    tags: ["once", "lead"],
    lead: ["stash", "creature", "dwelling"]
  },
  "remains": {
    tags: ["once", "lead"],
    lead: ["stash", "creature"]
  },
  "stash": {
    tags: ["once"],
    reward: ["CPX"]
  },
  "creature": {
    tags: [],
    reward: ["creature"]
  },
  "enigma": {
    tags: ["lead"],
    lead: ["arcane", "dwelling"]
  },
  "infrastructure": {
    tags: ["lead"],
    lead: ["stash", "dwelling"]
  },
  "dwelling": {
    tags: ["once"],
    reward: ["character"]
  },
  "religious": {
    tags: ["color"],
    reward: ["item", "character"]
  },
  "city": {
    tags: [],
    reward: ["CCPX", "item", "character"]
  },
  "ruin": {
    tags: [],
    reward: ["CPX", "CCPX", "item", "character", "creature"]
  },
}

//[2,3,3,4,4,4,4,5,5,5,5,6,6,7,7,8]
/*
  "animal/veg bi-products", "animal hides", "animal products", "arts and antiques",
  "chemical products", "foodstuffs", "footwear and headware", "instruments",
  "machines", "metals", "mineral products", "misc", "paper goods", "plastics and rubbers",
  "precious metals", "stone and glass", "textiles", "transportation", "vegetable products",
  "weapons", "wood products"
*/


//"character","creature","item"

let planeFactory = (app)=>{
  let svg = document.createElement("svg")
  let canvas = d3.select("#display"), bbox, scale;

  const gpu = new GPU();

  app.ECS.newCollection("planes")

  //hierarchy
  app.ECS.newComponent({
    name: "inHierarchy",
    description: "In a hierarchy of data",
    state: {
      parent: "",
    }
  })

  //general plane component 
  app.ECS.newComponent({
    name: "planeData",
    description: "Core Plane Data",
    state: {
      chain: "ETH",
      balance: 0,
    }
  })

  //general plane component 
  app.ECS.newComponent({
    name: "hasFinds",
    description: "Find information",
    state: {
      timer: {},
      once: []
    }
  })

  //track max balance
  let maxBalance = 0

  //plane functions 
  app.planes = {
    _current: {},
    get currentEntity() {
      return app.ECS.getCollection("planes")[this._current._id]
    },
    within(x, y) {
      return this._current._hex.within(x,y)
    },
    get all() {
      return app.ECS.getCollection("planes")
    },
    factory(address, balance, chain) {
      chain = chain || 0
      let chainID = CHAINS[chain]
      let allP = app.ECS.getCollection("planes")
      let P = allP[chainID + address]

      if (!P) {
        //do not call stard entity because we want to use different ids 
        //id not in a collection - give it a collection 
        P = {
          id: address,
          name: "",
          //components 
          _c: []
        }
        app.ECS.addComponent(P, "planeData")
        app.ECS.addComponent(P, "inHierarchy")
        app.ECS.addComponent(P, "hasFinds")
        //set entity 
        allP[chainID + address] = P
      }

      if (chain !== "ETH")
        P.chain = chain
      P.balance = balance
      P.parent = chainID + "0x"

      //check maxbalance
      if (balance > maxBalance)
        maxBalance = balance

      return P
    },
    get creatures () {
      let hash = this._current._hash
      return {
        land : d3.range(5).map(v => ethers.utils.solidityKeccak256(['bytes32', 'string', 'uint256'], [hash, "landCreature", v])),
        water : d3.range(5).map(v => ethers.utils.solidityKeccak256(['bytes32', 'string', 'uint256'], [hash, "waterCreature", v]))
      }
    },
    makeNames(seed, lang, n) {
      let RNG = new Chance(seed)
      return d3.range(n + 1).map(_=>app.names.generateName(lang, RNG))
    },
    generate(address, chain) {
      chain = chain || 0
      let chainID = CHAINS[chain]
      let P = app.ECS.getCollection("planes")[chainID + address]
      let nhash = ethers.utils.solidityKeccak256(['bytes32', 'uint256', 'address'], [app.seed, chain, address])

      let maxArea = P.balance
      let maxR = maxArea / (128 * 128)
      maxR = maxR < 1 ? 1 : Math.floor(maxR)

      //determine the max number of regions 
      let bR = [1, 2, 4, 6, 8, 12, 16, 20, 24, 30, 36, 42, 48, 56, 64, 72]
      let mR = [1, 1.1, 1.2, 1.3, 1.5, 1.75, 2, 3]
      let nR = bR[parseInt(nhash.slice(4, 6), 16) % 16] * mR[parseInt(nhash.slice(6, 8), 16) % 8]
      nR = nR > maxR ? Math.floor(nR) : maxR
      //create the hex 
      let HEX = new app.Hex({
          seed: nhash,
          size : nR
      })

      //faction/culture
      //certain factions are more likely based upon rank
      let fr = [1,2,2,3,3,4,4,4,5,5,5,5,6,6,6,6][parseInt(nhash.slice(2,3),16)]
      let fia = [0,10,25,40,55,60]
      let fib = [10,15,15,15,5,4]
      let fi = fia[fr-1]+parseInt(nhash.slice(3,4),16)%fib[fr-1]
      let F = app.factions.generate(fi)

      //make the names 
      let names = this.makeNames(nhash, F._nb, nR+1)
      
      let resources = [0,0,0,0,0,0]
      let cities = [], arcane = 0, lairs = [], terrains = [], ruins = []; 
      let colors = d3.interpolateSinebow
      //place 
      this._current = {
        _id: chainID + address,
        _hash: nhash, 
        _raw: P,
        _hex : HEX,
        _fi : fi, 
        get faction () { return app.factions.generate(this._fi) },
        get needs () {
          //compute the day - needs change every day 
          let seconds = Date.now()/1000
          let day = Math.floor(seconds/60/60/24)
          //hash 
          let hash = ethers.utils.solidityKeccak256(['bytes32', 'string', 'uint256'], [nhash, "needs", day])
          //two needs
          let ptoc = app.planeProducts.PTOC
          //2 needs 
          return d3.range(1).map(v => {
            v = parseInt(hash.slice(2+(v*2),4+(v*2)),16)%32
            let n = ptoc[v]
            //offset index 
            let c = colors(v/32)
            n = n < 10 ? "0"+n : n
            return {
              i : v,
              src : "hs_"+n+".png",
              color : colors((n-1)/21)
            }  
          })
        },
        get exports () {
          //compute the day - exports change every day 
          let seconds = Date.now()/1000
          let day = Math.floor(seconds/60/60/24)
          //hash 
          let hash = ethers.utils.solidityKeccak256(['bytes32', 'string', 'uint256'], [nhash, "exports", day])
          let needs = this.needs.map(n => n.i)
          let ptoc = app.planeProducts.PTOC
          //number of exports
          let ne = [2,3,3,4,4,4,5,5][parseInt(hash.slice(2,4),16)%8]
          return d3.range(ne).map(v => {
            v = parseInt(hash.slice(4+(v*2),6+(v*2)),16)%32
            let n = ptoc[v]
            //offset index 
            let c = colors(v/32)
            n = n < 10 ? "0"+n : n
            return {
              i : v,
              src : "hs_"+n+".png",
              color : colors((n-1)/21)
            }  
          }).filter(e => !needs.includes(e.i))
        },
        _data : HEX._major.map((h,i) =>{
          let T = HEX._majT[i]
          let hash = ethers.utils.solidityKeccak256(['bytes32', 'uint256'], [nhash, i])
          let ni = parseInt(hash.slice(2, 4), 16) % 16
          let nf
          if (ni >= 8)
            nf = 2;
          else if (ni >= 1)
            nf = 1;
          else
            nf = 3;

            //run finds 
          let finds = d3.range(nf).map(v=>{
            let fid = 1 + parseInt(hash.slice(4 + (v * 2), 6 + (v * 2)), 16)
            let name = getFindName(fid)
            let color = parseInt(hash.slice(10 + (v * 2), 12 + (v * 2)), 16)%6
            //cities wont be on water or above a certain altitude 
            if (name === "city" && ["deepWater", "shallowWater","mountains"].includes(T)) {
              name = ["enigma", "dwelling", "ruin"][fid % 3]
            }
            //check for resource
            if(name === "resource") resources[color]++;
            //check cities
            if(name === "city") cities.push({
              hi : i,
              name : names[i+1]
            });
            //push ruins
            if(name === "ruin") ruins.push(i);
            //push lairs
            if(name === "lair") lairs.push(i);
            //terrains
            if(["obstacle","newTerrain","landmark"].includes(name)) terrains.push(i);

            return {name,color}
          })

          return { i, hash, finds }  
        }),
        _stats : {names, cities, resources, terrains, lairs, ruins},
      }
    },
    /*
      @param ri - index of region to focus on
      @param z - zoom : 0 to 3
    */
    canvasDisplay (ri,z) {
      canvas = d3.select("#display")

      ri = ri || 0
      z = z || 0
      
      let Hex = this._current._hex
      bbox = Hex.bbox
      let w = bbox[2] - bbox[0]
      let h = bbox[3] - bbox[1]
      //get canvas dimensions for compare
      let cw = window.innerWidth < canvas.node().width ? window.innerWidth : canvas.node().width
      let ch = window.innerHeight < canvas.node().height ? window.innerHeight : canvas.node().height
      //find min scale dimensions
      scale = cw / w < ch / h ? cw / w : ch / h
      //new dimension 
      let newD = cw < ch ? cw : ch 
      if(newD < 800) {
        canvas.attr("width",newD).attr("height",newD)
      }

      let tH = Hex.threeHex()

      //canvas context
      let ctx = canvas.node().getContext("2d")
      //reset & clear
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0,0,cw,ch)
      //translate/scale accordingly
      ctx.scale(scale, scale);
      ctx.translate(-bbox[0], -bbox[1]);
      
      //heightmap colors 
      let hexDraw = app.hex.draw
      let hColor = d3.scaleSequential(d3.interpolateRdYlGn)
      //run hexes 
      tH.forEach((hex,i)=>{
        hexDraw(ctx,hex.points)
        ctx.fillStyle = ["deepWater", "shallowWater"].includes(hex.t) ? "aqua" : hColor(1-(hex.h-1)/30)
        ctx.fill()
      }
      )

      //remove spinner
      d3.select("#spinner").attr("class", "lds-dual-ring hidden")
      //handle click 
      canvas.node().removeEventListener("click tap", canvasClick)
      canvas.on("click tap", canvasClick)
    },
    threeDisplay() {
      //give it a click call back
      function onClick() {
        //send the index
        app.planes.clickFind(this._ij[0])
      }
      //call 
      app.hexDisplay(this._current._hex, onClick)
      //remove spinner
      d3.select("#spinner").attr("class", "lds-dual-ring hidden")
    },
    display(ri, z) {
      if (!glTest()) this.canvasDisplay(ri,z)
      else this.threeDisplay()
    },
    clickFind(hi) {
      let h = this._current._data[hi]
      console.log(h)
      //set finds 
      app.UI.findModal.ri = h.i
      app.UI.findModal.finds = h.finds
      //open modal
      if (app.UI.findModal.findText.length > 0)
        $('#ui-find').modal('show')
        //else 
      else
        app.notify({
          h: "No Finds"
        })
    },
    /* Make a Find
      @param ri - the region index   
      @param fi - the find index 
    */
    makeFind(ri, fi) {
      //get the entity 
      let P = this.currentEntity
      //check for finds 
      if (!app.ECS.hasComponent(P, "hasFinds"))
        app.ECS.addComponent(P, "hasFinds")
      //get what the find is 
      let what = this._current._data[ri].finds[fi]
      let name = what.name
      let data = FINDS[name]
      //one time event - push 
      if (data.tags.includes("once")) {
        P.once.push(ri + "." + fi)
        //push ui update 
        app.UI.findModal.finds = this._current._data[ri].finds.slice()
      }
      //track a lead 
      if (data.tags.includes("lead")) {
        //random pick 
        name = app.chance.pickone(data.lead)
        data = FINDS[name]
      }
      let reward = app.chance.pickone(data.reward)

      let address = P.id
      let hash = ethers.utils.solidityKeccak256(['bytes32', 'uint256', 'uint256', 'uint256'], [this._current._hash, ri, fi, Date.now()])
      return {name,hash,reward,color:what.color}
    },
  }

  //set up click 
  function canvasClick () {
    ///delta conversion - r display to r of outlands
    let coords = d3.mouse(this)
    let x = bbox[0] + coords[0] / scale
      , y = bbox[1] + coords[1] / scale;
    let hi = app.planes.within(x, y)
    app.planes.clickFind(hi)
  }

  //create 0x
  let ETH0x = app.planes.factory("0x", 0)

}

export {planeFactory}


/*
      let path = d3.select("#dBox").append("g").attr("id","polys").selectAll("path")  
      path.data(polys).enter().append("path")
          function polygon(d) {
            return "M" + d.join("L") + "Z";
          }
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
      */

      /*
      let RNG = new Chance(this._current._raw.id)
      let noise = this.noise(this._current)
      //always generate points for voronoi display 
      let nH = this._current._hex.length
      let np;
      if (nH < 20)
        np = 2000;
      else if (nH < 40)
        np = 4000;
      else if (nH < 80)
        np = 8000;
      else
        np = 12000;

      let el = []
      let iHex = []
      //translate to unit area 
      let dP = d3.range(np).map(_=>{
        let p = [bbox[0] + RNG.random() * w, bbox[1] + RNG.random() * h]
        let hi = app.planes.within(...p)
        //keep hex index 
        iHex.push(hi)

        let e = 0;
        if (hi === -1)
          e = -2
        else
          e = noise(...p)
        //push 
        el.push(e)
        //return point 
        return p
      }
      )
      let V = d3.Delaunay.from(dP).voronoi([bbox[0], bbox[1], bbox[2], bbox[3]])
      let polys = [...V.cellPolygons()]
      */

/*
  //get random points for voronoi display use 
  let NP = [2000,4000,8000,12000]
  let vP = NP.map(n => {
    let RNG = app.chance
    return d3.range(n).map(_=> [RNG.random(),RNG.random()])
  })
  */