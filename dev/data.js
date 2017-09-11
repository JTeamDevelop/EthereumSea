define(function(require) {

  return (App)=>{
    let Actives = App.Actives;

    const people = [{
      id: "aarakocra",
      name: "aarakocra",
      class: ["monstrous humanoid", "aarakocra"],
      aspects: ["explorer","diplomat"]
    },{
      id: "dwarf",
      name: "dwarf",
      class: ["humanoid", "dwarf"],
      aspects: ["soldier","diplomat"]
    }, 
    {
      id: "elf",
      name: "elf",
      class: ["humanoid", "elf"],
      aspects: ["diplomat","soldier"]
    }, {
      id: "human",
      name: "human",
      class: ["humanoid", "human"],
      aspects: ["explorer","engineer"]
    },{
      id: "klik roller",
      name: "klik roller",
      class: ["construct", "klik"],
      aspects: ["scholar","soldier"]
    }, {
      id: "klik tripod",
      name: "klik tripod",
      class: ["construct", "klik"],
      aspects: ["engineer","rogue"]
    }, {
      id: "l'na diurnal",
      name: "l'na diurnal",
      class: ["outsider", "l'na"],
      aspects: ["soldier","scholar"]
    }, {
      id: "l'na nocturnal",
      name: "l'na nocturnal",
      class: ["outsider", "l'na"],
      aspects: ["rogue","engineer"]
    }]

    const professions = ["diplomat","engineer","explorer","rogue","scholar","soldier"];

    const levels = [
        {a:2,s:2,p:[1,0,0,0,0,0]},
        {a:3,s:3,p:[1,1,1,0,0,0]},
        {a:3,s:4,p:[2,1,1,1,0,0]},
        {a:3,s:5,p:[2,2,1,1,1,0]},
        {a:3,s:7,p:[3,2,2,1,1,0]},
        {a:4,s:8,p:[3,2,2,2,1,1]},
        {a:4,s:9,p:[4,3,2,2,1,1]},
        {a:4,s:10,p:[4,3,3,2,2,1]},
        {a:4,s:11,p:[5,4,3,2,2,1]},
        {a:5,s:13,p:[5,4,3,3,2,2]}
    ];

    const nations = {
      "0x829bd824b016326a401d083b33d092293333a830": {
        name: "Chelton",
        class: ["nation","core"],
        color: "aqua",
        nameBase: "GB",
        level: 5,
        focus: [1,5,2],  //Eng, Sol, Exp
        people: [["human", 0.55], ["dwarf", 0.35], ["klik", 0.1]]
      },
      "0xea674fdde714fd979de3edf0f56aa9716b898ec8": {
        name: "Jhara",
        class: ["nation","core"],
        color: "lime",
        nameBase: "IN",
        level: 5,
        focus: [4,0,3],  //Sch, Dip, Rog
        people: [["elf", 0.55], ["human", 0.25],  ["l'na", 0.20]]
      },
      "0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5": {
        name: "Jinyuan",
        class: ["nation","core"],
        color: "gold",
        nameBase: "CN",
        level: 5,
        focus: [1,0,3],  //Eng, Dip, Rog
        people: [["human", 0.35], ["elf", 0.15], ["l'na", 0.17], ["dwarf", 0.15], ["klik", 0.18]]
      },
      "0x1e9939daaad6924ad004c2560e90804164900341": {
        name: "Kirov",
        class: ["nation","core"],
        color: "orange",
        nameBase: "RU",
        level: 5,
        focus: [5,2,0],  //Sol, Exp, Dip
        people: [["dwarf", 0.50], ["klik tripod", 0.25], ["klik roller", 0.15], ["human", 0.1]]
      },
      "0xb2930b35844a230f00e51431acae96fe543a0347": {
        name: "Shuhadan",
        class: ["nation","core"],
        color: "teal",
        nameBase: "AF", 
        level: 5,
        focus: [0,3,5],  //Dip, Rog, Sol
        people: [["elf", 0.40], ["l'na", 0.40], ["human", 0.20]]
      },
      "0x2a65aca4d5fc5b5c859090a6c34d164135398226": {
        name: "Venasque",
        class: ["nation","core"],
        color: "purple",
        nameBase: "FR",
        level: 5,
        focus: [2,4,1],  //Exp, Sch, Eng
        people: [["human", 0.15], ["elf", 0.13], ["l'na diurnal", 0.19], ["dwarf", 0.14], ["klik", 0.19]]
      }
    }

    return {
      professions: professions,
      nations: nations,
      people: people,
      levels: levels,
    };
  }
})
