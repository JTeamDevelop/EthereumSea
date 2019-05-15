//D3
importScripts('../lib/d3.v5.min.js'); 
importScripts('../lib/d3-delaunay.min.js'); 
//localforage
importScripts('../lib/localforage.1.7.1.min.js');
//chance RNG 
importScripts('../lib/chance.min.js'); 
//names 
importScripts('nameGen.js'); 

//Save db for Indexed DB - localforage
const DB = localforage.createInstance({ name: "BotO", storeName: "Outlands" })

const TN = NameGen.nameBases.length
const PI = Math.PI

const GEN = {
  //universe generation
  U(data) {
    //straight generation - but remove half - because 2n are always created
    let map = circlePack(data.seed,data.opts).slice(data.opts.n).map((c,i) => {
      c._data = {
        seed : data.children[i] || data.seed+"."+i,
      }
      return c
    })

    postMessage({
      f : "generate",
      data,
      map : map
    });
  },
  //sector generation
  S(data) {
    let seed = data.seed
    let opts = data.opts || {}
    let RNG = new Chance(seed)
    //number of sub sectors 
    let n = 20 + RNG.d10()
    opts.n = opts.n || n 

    //name base to use for naming 
    let base = Math.floor(RNG.random()*TN)
    if(opts.nameBase) base = opts.nameBase;
    //generate map 
    let map = circlePack(seed,opts)
    //set RNG for naming 
    NameGen.setRandom(RNG);
    map = map.map((c,i) => {
      //create the data 
      /*
        seed: "",
        name: "",
        opts: {
          what: "U"
        },
      */
      let name = NameGen.getState(NameGen.getTown(base), base)
      c._data = {
        seed : data.children[i] || seed+"."+i,
        name : data.children[i] || name,
        opts : { what: i < opts.n ? "B" : RNG.weighted(["O","Y"],[7,3]) },
        parent : seed,
        children : [],
        factions: [],
        units : [],
      }
      //return
      return c 
    }).slice(0,Math.round(3*opts.n/2))
    //reduce because 2n were creasted 

    postMessage({
      f : "generate",
      data,
      map : map
    });
  },
  //subsector 
  B(data) {
    let seed = data.seed
    let opts = data.opts || {}
    let RNG = new Chance(seed)
    //number of children
    let n = 20 + RNG.d10()
    opts.n = opts.n || n 

    //name base to use for naming 
    let base = Math.floor(RNG.random()*TN)
    if(opts.nameBase) base = opts.nameBase;
    //generate map 
    let map = circlePack(seed,opts)
    //set RNG for naming 
    NameGen.setRandom(RNG);
    map = map.map((c,i) => {
      //create the data 
      /*
        seed: "",
        name: "",
        opts: {
          what: "U"
        },
      */
      let name = NameGen.getState(NameGen.getTown(base), base)
      c._data = {
        seed : data.children[i] || seed+"."+i,
        name : data.children[i] || name,
        opts : { what: RNG.weighted(["O","Y"],[5,5]) },
        parent : seed,
        children : [],
        factions: [],
        units : [],
      }
      //return
      return c 
    }).slice(0,Math.round(opts.n))
    //reduce because 2n were creasted 

    postMessage({
      f : "generate",
      data,
      map : map
    });
  },
  //orbital
  O(data) {
    let seed = data.seed
    let opts = data.opts || {}
    let RNG = new Chance(seed)
    //number of plates
    //plate = 6000 km by 6000 km 
    // 1 earth = 5.1 x 10^8 km2 ~ 14.167 plates
    let nP = 15 + RNG.d20() 
    if(opts.nP) np = opts.nP;
    if(opts.size) nP = Math.floor(opts.size * 14.167);

    let map = d3.range(nP).map(i => {
      let p = {}
      //determine type of plate 
      switch (RNG.d4()) {
        case 1:
          //continent
          p.type = 1
          p.polys = islandCrafter(seed+"."+i,200,6,5) //circlePack(seed+"."+i, {n:10}).slice(0,5)
          break;
        case 2:
          //archipelago
          p.type = 2
          p.polys = islandCrafter(seed+"."+i,300,20,10) //circlePack(seed+"."+i, {n:5}).slice(0,5)
          break;
        case 3:
          //islands
          p.type = 3
          p.polys = islandCrafter(seed+"."+i,400,40,10) //circlePack(seed+"."+i, {n:20}).slice(0,10)
          break;
        case 4:
          //ocean
          p.type = 4
          p.polys = islandCrafter(seed+"."+i,400,40,3) //circlePack(seed+"."+i, {n:20}).slice(0,3)
      }
      return p
    })

    postMessage({
      f : "generate",
      data,
      map : map
    });
  },
  Y(data) {},
}

const withinCircle = (px,py,cx,cy,r) => {
  let dx = px-cx
  let dy = py-cy
  return dx*dx+dy*dy < r*r 
}

const islandCrafter = (seed,scale,gen,keep) => {
  let map = circlePack(seed, {n:gen/2}).slice(0,keep)
  //craft a voronoi 
  let RNG = new Chance(seed)
  let p = d3.range(scale).map(()=> [RNG.random(),RNG.random()])
  let delaunay = d3.Delaunay.from(p)
  let voronoi = delaunay.voronoi([0,0,1,1])
  let allpolys = [...voronoi.cellPolygons()]

  let polys = allpolys.filter((poly,i) => {
    poly.center = p[i]
    //keep those within 
    let isWithin = map.reduce((isWithin,c) =>{ 
      return isWithin ? true : withinCircle(...p[i],c.x,c.y,c.r)
    },false)
    return isWithin 
  })

  return polys
}

const circlePack = (seed, opts) => {
  opts = opts || {}
  let RNG = new Chance(seed)
  let n = opts.n || 20

  let h = d3.hierarchy({
    "children" : d3.range(2*n).map(i=> {
      return {
        A : 10 + RNG.rpg("1d30")[0],
        rm : 1+25*RNG.random()/100,
      }
    })
  })
  h.sum(d => d.A)

  let pack = d3.pack().size([1,1])(h)
  //first is always full circle 
  let map = h.descendants().slice(1)
  //now shuffle
  return RNG.shuffle(map)
}

//Handle loading saving and loading 
let state = null
let activeObjects = {
  characters: [],
  crews : [],
  locations : [],
  factions : []
}

DB.getItem("state").then(function(savedState) {
  //check if it exists
  if(!savedState) {
    let hash = chance.hash()
    savedState = {
      time : Date.now(),
      lastSave : hash,
      saves : [hash]
    }
  }
  else {
    //update time
    savedState.time = Date.now()
  }
  //save state
  DB.setItem("state",savedState)
  state = savedState
  //pull saved data 
  for(let x in activeObjects){
    DB.getItem(state.lastSave+"."+x).then(save => {
      activeObjects[x] = save || []
      //send to app 
      postMessage({
        f : "load",
        what : x,
        data : activeObjects[x]
      });
    })
  }
})

onmessage = function(e) {
  let d = e.data

  if(d.f === "generate") {
    //now generate
    GEN[d.data.opts.what](d.data) 
  }
  //save 
  else if(d.f === "save") {
    //get save objects
    let what = activeObjects[d.what]
    //find if it is there
    let i = what.findIndex(o => o.id == d.data.id)
    if(i == -1) what.push(d.data);
    else what[i] = d.data;
    //now save all objects 
    let where = state.lastSave+"."+d.what    
    DB.setItem(where,what)
    //notify 
    postMessage({
      f : "saved",
      what : d.what,
      data : what
    });
  }
  //delete
  else if(d.f === "delete"){
    //get save objects
    let what = activeObjects[d.what]
    //find if it is there - and delete
    let i = what.findIndex(o => o.id == d.data)
    if(i > -1) what.splice(i,1);
    //now save all objects 
    let where = state.lastSave+"."+d.what    
    DB.setItem(where,what)
    //notify 
    postMessage({
      f : "saved",
      what : d.what,
      data : what
    });
  }
}

/*

const rndPointInCircle = (RNG,R) => {
  R = R || 1
  //radial location in greater area - between 0 and 1 
  let r = Math.sqrt(RNG.random()*R*RNG.random()*R)
  let theta = RNG.random()*2*PI
  let x = R * Math.cos(theta) 
  let y = R * Math.sin(theta)
  return {x,y}
}

const circleMap = (seed, n, opts) => {
  let RNG = new Chance(seed)
  
  let map = d3.range(n).map(i => {
    //area in percent
    let A = 5 + RNG.d100()/5
    //radius of area
    let r = Math.sqrt(A/100/PI)
    //radial location in greater area - between 0 and 1 
    let R = Math.sqrt(RNG.random()*RNG.random())
    let theta = RNG.random()*2*PI
    let x = R * Math.cos(theta) 
    let y = R * Math.sin(theta)

    return {r,x,y}
  })

  return map
}

*/