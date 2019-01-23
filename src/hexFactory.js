const AXIALNEIGHBORS = [[1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]]
const AXIALSUBHEX = [[2, -3], [-1, -2], [0, -2], [1, -2], [2, -2], [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1], [0, 0], [-2, 0], [-1, 0], [1, 0], [2, 0], [-3, 1], [-2, 1], [-1, 1], [0, 1], [1, 1], [-2, 2], [-1, 2], [0, 2], [1, 2], [-2, 3]]

let hexNeighbors = (q,r)=>{
  return AXIALNEIGHBORS.map(n=>[n[0] + q, n[1] + r])
}
let subQR = (q,r)=>{
  //calculate sub hex qr 
  return AXIALSUBHEX.map(qr=>[(q*5) + qr[0], (r*5) + qr[1]])
}

let hexPoints = (c,R)=>{
  let a, arad, p = [];
  for (let i = 0; i < 6; i++) {
    a = 60 * i - 30
    arad = a * Math.PI / 180
    p.push([c.x + R * Math.cos(arad), c.y + R * Math.sin(arad)])
  }
  return p
}

let hexCentroid = (q,r,R)=>{
  return {
    x: R * (Math.sqrt(3) * q + r * Math.sqrt(3) / 2),
    y: R * r * 3 / 2
  }
}

let hexPlacement = (q,r,R)=>{
  let c = hexCentroid(q, r, R)

  return {
    _qr: [q, r],
    qr: [q, r].join(","),
    centroid: c,
    points: hexPoints(c, R),
    neighbors: hexNeighbors(q,r),
    _subQR: subQR(q,r)
  }
}

let generateHexes = (seed,n)=>{
  let RNG = new Chance(seed)
  let hexids = ["0,0"]

  //pick random neighbors to build hex area
  let current = [0, 0]
  let next = null
  let N = null
  while (hexids.length < n) {
    N = hexNeighbors(...current)
    next = RNG.pickone(N)
    if (!hexids.includes(next.join(",")))
      hexids.push(next.join(","))

    //now reset
    next = null
    current = RNG.pickone(hexids).split(",").map(Number)
  } 

  //have to turn back into array
  return hexids.map(qr=>qr.split(",").map(Number))
}

let chance = new Chance()

const TERRAINCOLORS = {
  "deepWater": "blue",
  "shallowWater": "lightblue",
  "swamp": "cadetblue",
  "desert": "tan",
  "plains": "lightgreen",
  "forest": "green",
  "hills": "brown",
  "mountains": "darkgray"
}

let generateTerrain = (seed,n)=>{
  let RNG = new Chance(seed)
  //now do terrains
  const TERRAINS = ["deepWater", "shallowWater", "swamp", "desert", "plains", "forest", "hills", "mountains"]
  const lands = {
    "deepWater": ["deepWater", "forest", "deepWater", ["swamp", "desert", "hills"]],
    "shallowWater": ["shallowWater", "forest", "forest", ["swamp", "desert", "hills"]],
    "swamp": ["swamp", "plains", "forest", ["shallowWater"]],
    "desert": ["desert", "hills", "plains", ["shallowWater", "mountains"]],
    "plains": ["plains", "forest", "hills", ["shallowWater", "swamp", "desert"]],
    "forest": ["forest", "plains", "hills", ["shallowWater", "swamp", "mountains"]],
    "hills": ["hills", "mountains", "plains", ["shallowWater", "desert", "forest"]],
    "mountains": ["mountains", "hills", "forest", ["shallowWater", "desert"]]
  }

  //number of hexes - per major terrain 
  let majT = []
  while (majT.length < n) {
    //pick a major terrain
    let T = TERRAINS[RNG.d8() - 1]
    //weights for terrain
    let MajWt = ["deepWater", "shallowWater"].includes(T) ? [9, 1, 0, 0] : [13, 8, 2, 1]
    //number of major hexes with this terrain 
    let cn = 10 + RNG.rpg("5d4", {
      sum: true
    })
    //loop through major count - keep it less that total length 
    for (let i = 0; i < cn && majT.length < n; i++) {
      let rarity = RNG.weighted([0, 1, 2, 3], MajWt)
      let t = rarity === 3 ? RNG.pickone(lands[T][3]) : lands[T][rarity]
      //add to major T
      majT.push(t)
    }
  }

  //terrain for minor hex
  let minT = majT.map((t)=>{
    let MinWt = ["deepWater", "shallowWater"].includes(t) ? [20, 0, 0, 0] : [13, 8, 2, 1]
    //there are always 25 sub hexes per hex 
    let subt = []
    for (let i = 0; i < 25; i++) {
      let rarity = RNG.weighted([0, 1, 2, 3], MinWt)
      let st = rarity === 3 ? RNG.pickone(lands[t][3]) : lands[t][rarity]
      subt.push(st)
    }

    return subt
  }
  )

  return {
    majT,
    minT
  }
}

let hexFactory = (app)=>{

  class Hex {
    constructor(opts) {
      opts = opts || {}

      this.block = opts.block || 0
      this.seed = opts.seed || chance.hash()
      this.size = opts.size || 25

      //generate hex qr 
      this._hexqr = generateHexes(this.seed, this.size)

      //now do terrains
      let {majT, minT} = generateTerrain(this.seed, this.size)
      this._majT = majT.slice()
      this._minT = minT.slice()

      //create noise for elevation
      this._noise = new SimplexNoise(this.seed)
    }
    get findings() {
      let rarity = ["common","uncommon","rare","very rare","mythic"]
      //now compute the findings 
      let nf = Math.round(this.size * 1 / 2)
      //find types 
      let ft = ["resource", "luxury", "luxury", "luxury", "tool", "tool", "tool", "character", "character", "character"]
      let find = []
      for (let i = 0; i < nf; i++) {
        let f = {}
        //compute hash for each 
        let hash = ethers.utils.solidityKeccak256(['uint256', 'address', 'address', 'uint8'], [this.block, app.contracts.ESPlanes.address, app.contracts.inPlaneFinds.address, i])
        //first is type
        let fti = parseInt(hash.slice(2, 4), 16) % 10;
        f.what = ft[fti];
        //next two makes rarity 
        let r = (parseInt(hash.slice(4, 6), 16) * 256 + parseInt(hash.slice(6, 8), 16)) % 1000;
        //assign rarity
        if (r < 500)
          f.r = 0;
        else if (r < 850)
          f.r = 1;
        else if (r < 989)
          f.r = 2;
        else if (r < 998)
          f.r = 3;
        else
          f.r = 4;
        //now push 
        f.rarity = rarity[f.r]
        find.push(f)
      }
      return find
    }
    //hex data for THREEJS use 
    get threeHex() {
      let minT = this._minT
      let majT = this._majT
      let noise = (x,y)=>{
        return this._noise.noise3D(x, y, 0)
      }
      const HEIGHTS = {
        "deepWater": 1,
        "shallowWater": 1,
        "swamp": 2,
        "desert": 5,
        "plains": 5,
        "forest": 5,
        "hills": 25,
        "mountains": 50
      }

      //for all major hexes loop to get hex data
      return this._hexqr.reduce(function(all, qr, i) {
        let hp = hexPlacement(...qr, 100)
        let T = majT[i]
        let baseHeight = HEIGHTS[T]

        hp._subQR.forEach(function(sqr, j) {
          //terrain 
          let t = minT[i][j]
          //push sub hex 
          let sh = hexPlacement(...sqr, 20)
          let height = baseHeight + (HEIGHTS[t] * (1 + noise(...sqr)) / 2)
          all.push({
            _ij: [i, j],
            _qr: sh._qr,
            qr: sh.qr,
            centroid: sh.centroid,
            neighbors: sh.neighbors,
            R: 20,
            t: t,
            h: ["deepWater", "shallowWater"].includes(t) ? 1 : height
          })
        })

        return all
      }, [])
    }
  }

  app.Hex = Hex
  //setup container for base hex 
  app.hexMesh = {}
  app.findingMesh = {}
  //create hex at 0 0 
  let baseHex = hexPlacement(0, 0, 100)
  var hexShape = new THREE.Shape();
  //create the basic shape by running through baseHex points
  baseHex.points.forEach((p,i)=>{
    if (i === 0)
      hexShape.moveTo(...p)
    else
      hexShape.lineTo(...p)
  }
  )
  //at the end close 
  hexShape.lineTo(...baseHex.points[0])
  //extrusion settings
  var extrudeSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: false,
  };
  //create geometry
  var hexGeo = new THREE.ExtrudeBufferGeometry(hexShape,extrudeSettings);
  //rotate to aling wiht three axes 
  hexGeo.rotateX(-Math.PI / 2)

  //now for each terrain create a new mesh 
  for (let t in TERRAINCOLORS) {
    let material = new THREE.MeshLambertMaterial({
      color: TERRAINCOLORS[t]
    })
    if (["deepWater", "shallowWater"].includes(t))
      material = new THREE.MeshPhongMaterial({
        color: TERRAINCOLORS[t]
      })
    //now create the mesh 
    app.hexMesh[t] = new THREE.Mesh(hexGeo.clone(),material)
  }

  //create a mesh for every finding type
  let findingColors = ["gold","purple","darkslategray","orange"]
  let findingTypes = ["resource","luxury","tool","character"]
  findingTypes.forEach((w,i) => {
    let geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
    let material = new THREE.MeshLambertMaterial( {color:findingColors[i] } );
    app.findingMesh[w] = new THREE.Mesh( geometry, material );
  })

  //now create a hex display, given a hex data
  app.hexDisplay = (id)=>{
    let scene = app.scene
    //clear scene 
    if (scene) {
      while (scene && scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
      //add lights
      // lights
      var light = new THREE.DirectionalLight(0xffffff);
      light.position.set(1, 1, 1);
      scene.add(light);

      var light = new THREE.DirectionalLight(0x002288);
      light.position.set(-1, -1, -1);
      scene.add(light);

      var light = new THREE.AmbientLight(0x222222);
      scene.add(light);
    }

    let hash = app.planeHash(id)
    let hex = new Hex({
      block: id,
      seed: hash
    })
    //display the hexes 
    hex.threeHex.forEach(h=>{
      let mesh = app.hexMesh[h.t].clone()
      let ns = h.R / 100
      //scale based on R 
      mesh.scale.set(ns, h.h, ns)
      //position based on centroid
      let c = h.centroid
      mesh.position.set(c.x, 0, c.y)
      //add to scene
      //add hex data 
      mesh.userData = h
      if (scene)
        scene.add(mesh)
    }
    )
    //display findings 
    hex.findings.forEach((f,i) => {
      let h = hex.threeHex.find(th => th._ij.join(",") === 2*i+","+10)
      let mesh = app.findingMesh[f.what].clone()
      //position based on centroid
      let c = h.centroid
      mesh.position.set(c.x, h.h*1.2, c.y)
      //add to scene
      //add hex data 
      mesh.userData = f
      if (scene)
        scene.add(mesh)
    })
  }
}

export {hexFactory, generateHexes, hexPlacement}
