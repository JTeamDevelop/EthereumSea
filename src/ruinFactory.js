let ruinFactory = (app)=>{
  const REGIONS = [1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 7, 8, 9, 10]
  const ZONES = [3,3,3,4,4,5,5,6]

  let activeZones;

  app.ruins = {
    active : {},
    factory(plane, rid, opts) {
      opts = opts || {}
      let hash = ethers.utils.solidityKeccak256(['bytes32', 'string', 'uint256'], [plane.hash, "ruins", rid])  
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
      let ruin = {
        i: rid, hash, regions: nz, stairs, enter, _plane:plane,
        name : plane.ancientNames[rid+1],
        visible: [],
        visited : []
      }
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
    enter (ruin, rz) {
      let _rz = rz.split("."), r = Number(_rz[0]), z = Number(_rz[1]);
      let seen = ruin.visible.slice()
      let been = ruin.visited.slice()
      let vis = seen.concat(been,ruin.enter)
      //push complete
      let i = seen.indexOf(rz)
      if(i>-1) seen.splice(i,1);
      if(!been.includes(rz)) been.push(rz);
      //check for stairs
      let nr = ruin.regions.length
      let stairs = ruin.stairs[r]
      let sid = (r+1)+"."+0
      if(z === stairs && r+1 < nr && !vis.includes(sid)) seen.push(sid);
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
      activeZones.classed("visible",d=> {
        return vis.includes(d.rz.join("."))
      })

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
