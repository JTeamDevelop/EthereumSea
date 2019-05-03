//set up worker
let worker = new Worker('src/vastWorker.js')

//chance
import "../lib/chance.min.js"

let chance = new Chance()

const LOCATIONS = [{
  seed: "BladesOfTheOutlands",
  name: "Known Universe",
  opts: {
    n: 16,
    what: "U"
  },
  children: ["Vast", "Aztlan", "Celestia", "Kunlun", "Shambhala", "Lemuria", "Arcadia", "Svarga", "Elysium", "Asgard", "Mechanus", "Acheron", "Gehenna", "Maelstrom", "Abyss", "Tartarus"]
}, {
  seed: "Vast",
  opts: {
    what: "O"
  },
  children: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Aztlan",
  opts: {
    what: "S"
  },
  children: ["Atlantis"],
  factions: ["Starlords, Fae, Titans"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Celestia",
  opts: {
    what: "S"
  },
  children: ["Tien"],
  factions: ["Jade Empire, Archons, Platinum Star"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Kunlun",
  opts: {
    what: "S"
  },
  children: ["Penglai"],
  factions: ["Jade Empire, Platinum Star, Blood of Tiamat"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Shambhala",
  opts: {
    what: "S"
  },
  children: [],
  factions: ["Jade Empire, Asgardians, Sons of Ymir"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Lemuria",
  opts: {
    what: "S"
  },
  children: ["Hawaiki"],
  factions: ["Deva, Wardens, Aboleth"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Arcadia",
  opts: {
    what: "S"
  },
  children: ["Avalon"],
  factions: ["Archons, Guardians, Myr"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Svarga",
  opts: {
    what: "S"
  },
  children: [],
  factions: ["Devas, Fae, "],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Elysium",
  opts: {
    what: "S"
  },
  children: ["Olympus"],
  factions: ["Olympians, Fae"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Asgard",
  opts: {
    what: "S"
  },
  children: ["Kitezh"],
  factions: ["Asgardians, Fae"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Mechanus",
  opts: {
    what: "S"
  },
  children: [],
  factions: ["Mechans, StarHive"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Acheron",
  opts: {
    what: "S"
  },
  children: ["Niflheim"],
  factions: ["Sons of Ymir, Sect, Shadowsteel Syndicate"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Gehenna",
  opts: {
    what: "S"
  },
  children: ["Muspelheim"],
  factions: ["Yuloth, Blackflame, Myr"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Maelstrom",
  opts: {
    what: "S"
  },
  children: [],
  factions: ["Goblyns, Xaoti"],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Abyss",
  opts: {
    what: "S"
  },
  children: [],
  factions: [],
  parent: "BladesOfTheOutlands",
}, {
  seed: "Tartarus",
  opts: {
    what: "S"
  },
  children: ["Irkalla"],
  factions: ["Gaol, Olympians, Titans"],
  parent: "BladesOfTheOutlands",
}]

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

//creates the VUE js instance
const UIMain = new Vue({
  el: '#ui-main',
  data: {
    cid : "",
    sid: "",
    pid : ""
  },
  mounted() {
    let KU = LOCATIONS[0]
    //updateMapPiece(0,this.maxMap)
    worker.postMessage({
      f: "generate",
      seed: "BladesOfTheOutlands",
      opts: KU.opts
    });
  },
  computed: {
    current () { 
      if(!this.cid) return ""
      let S = LOCATIONS.find(d=>d.seed == this.cid)
      return S.name ? S.name : S.seed
    },
    selected () { 
      if(!this.sid) return ""
      let S = LOCATIONS.find(d=>d.seed == this.sid)
      return S ? S.name ? S.name : S.seed : this.sid
    },
    parent () { 
      if(!this.pid) return ""
      let S = LOCATIONS.find(d=>d.seed == this.pid)
      return S.name ? S.name : S.seed
    }
  },
  methods: {
    enter(id) {
      let i = LOCATIONS.findIndex(d=>d.seed == id)
      //does not exist
      if(i < 0) {
        LOCATIONS.push({
          seed : id,
          parent : this.cid,
          children : []
        })
        i = LOCATIONS.length - 1
      }
      let S = LOCATIONS[i]

      worker.postMessage({
        f: "generate",
        seed: S.seed,
        opts: S.opts
      });
    },
    mapWest() {
      let c = this.mapCenter
      let max = this.maxMap
      this.mapCenter = c - 400 < 0 ? max + (c - 400) : c - 400
      updateMapPiece(this.mapCenter, max)
    },
    mapEast() {
      let c = this.mapCenter
      let max = this.maxMap
      this.mapCenter = c + 400 > max ? c + 400 - max : c + 400
      updateMapPiece(this.mapCenter, max)
    },
  }
})

const drawCircleMap = (seed,map,data)=>{
  let R = 400
  //set size
  let svg = d3.select("svg").attr("height", 2 * R).attr("width", 2 * R)
  //clear
  svg.html("")

  const getWhat = (d,i) => {
    let what = ""
    if(data.children[i]) {
      let child = LOCATIONS.find(l=>l.seed == data.children[i])  
      what = child.opts.what
    } 
    else {
      what = d.what
    } 
    return what
  }

  //add data 
  map = map.map((d,i)=>{
    return Object.assign({
      parent: data,
      name: data.children[i] ? data.children[i] : d.name
    }, d)
  })

  //look for sectors/subsectors
  let c = map.filter((d,i) => getWhat(d,i) === "S")
  //orbitals 
  let o = map.filter((d,i) => getWhat(d,i) === "O")
  //systems 
  let y = map.filter((d,i) => getWhat(d,i) === "Y")

  let mapSelect = (d,i)=>{
    d3.selectAll("circle").classed("selected", false)
    d3.select("#s_" + d.name).classed("selected", true)
    UIMain.sid = d.name
  }

  //for ease initially 
  //TODO different icons 
  let all = c.concat(o,y)
  svg.selectAll("circle").data(all).enter().append("circle").attr("id", d=>"s_" + d.name).attr("cx", d=>d.x).attr("cy", d=>d.y).attr("r", d=>d.r * d.data.rm).attr("fill", "none").attr("stroke-width", 4).attr("stroke-dasharray", "5,5").attr("stroke", "blue").on("click tap", mapSelect)
  svg.selectAll("text").data(all).enter().append("text").attr("x", d=>d.x - d.name.length * 4).attr("y", d=>d.y).text(d=>d.name).on("click tap", mapSelect)

  //set selected
  UIMain.sid = ""
  UIMain.cid = data.seed
  UIMain.pid = data.parent || "" 
}

worker.onmessage = function(e) {
  let d = e.data
  if (e.data.f = "generate") {
    drawCircleMap(d.seed, d.map, LOCATIONS.find(s=>s.seed == d.seed))
    //remove spinner
    d3.select("#spinner").attr("class", "lds-dual-ring hidden")
  }
}
