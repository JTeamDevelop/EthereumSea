//D3
importScripts('../lib/d3.v5.min.js'); 
//localforage
importScripts('../lib/localforage.1.7.1.min.js');
//chance RNG 
importScripts('../lib/chance.min.js'); 
//names 
importScripts('nameGen.js'); 

const TN = NameGen.nameBases.length

const PI = Math.PI

const rndPointInCircle = (RNG,R) => {
  R = R || 1
  //radial location in greater area - between 0 and 1 
  let r = Math.sqrt(RNG.random()*R*RNG.random()*R)
  let theta = RNG.random()*2*PI
  let x = R * Math.cos(theta) 
  let y = R * Math.sin(theta)
  return {x,y}
}

const GEN = {
  //universe generation
  U(seed, opts) {
    //straight generation
    postMessage({
      f : "generate",
      seed: seed,
      map : circlePack(seed,opts)
    });
  },
  //sector generation
  S(seed, opts) {
    opts = opts || {}
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
    map = map.map(c => {
      //sub sectors 
      c.what = "B"
      //name it 
      c.name = NameGen.getState(NameGen.getTown(base), base) 
      //return
      return c 
    })
    //add specials - half n 
    for(let i = 0; i < n/2; i++){
      //create a point
      map.push(Object.assign({
        what : RNG.weighted(["O","Y"],[7,3]),
        name : NameGen.getState(NameGen.getTown(base), base)
      },rndPointInCircle(RNG)))
    }

    postMessage({
      f : "generate",
      seed: seed,
      map : map
    });
  },
  O(seed, opts) {},
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

  let pack = d3.pack().size([800,800])(h)
  //first is always full circle 
  let map = h.descendants().slice(1)
  //now shuffle and remove half
  return RNG.shuffle(map).slice(n)
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



onmessage = function(e) {
  let d = e.data

  if(d.f = "generate") {
    //now generate
    GEN[d.opts.what](d.seed,d.opts) 
  }
}