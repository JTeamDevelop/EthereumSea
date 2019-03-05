const WEAPONS = [
  ["bd","blades","Dueling Sword",["Fight"]],
  ["cc","clubs","Club",["Fight"],"lt"],
  ["cs","clubs","Staff",["Fight"],"2h"],
  ["bk","blades","Knife",["Fight"],"lt"],
  ["bl","blades","Longsword",["Fight"]],
  ["ba","blades","Axe",["Fight"]],
  ["bp","blades","Polearm",["Fight"],"2h"],
  ["fp","firearms","Pistol",["Shoot"],"lt"],
  ["fr","firearms","Rifle",["Shoot"],"2h"],
]

const WEAPONTAGS = [
  ["lt","Light"]
  ["2h","Two-handed"]
]

const ARMOR = [
  ["al","armor","Light"],
  ["am","armor","Medium"],
  ["ah","armor","Heavy"]
]

const GEARSTEPS = {
  "firearms" : [2,"Blaster",4,"Disruptor",6,"Disintegrator",8,"Singularity"],
  "blades" : [2,"",4,"Adamantium",6,"Stellar",8,"Nullblade"],
  "clubs" : [1,"",4,"Pulse",7,"Null"],
  "armor" : []
}

let CPXGear = (app) => {

  const ephimeralMaker = (color) => {
    let RNG = app.chance
    let et = RNG.pickone(["e0","e1"])
    let skill = RNG.pickone(app.CPX.skillArray)
    let q = RNG.pickone([1,1,1,1,2,2,2,3])

    return [et,color,skill,q]
  }

}

export {CPXGear}

  
