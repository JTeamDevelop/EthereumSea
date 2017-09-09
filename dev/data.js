define(function(require) {

  return (App)=>{
    let Actives = App.Actives;

    const people = [{
      id: "human",
      class: ["humanoid", "human"]
    }, {
      id: "elf",
      class: ["humanoid", "elf"]
    }, {
      id: "dwarf",
      class: ["humanoid", "dwarf"]
    }, {
      id: "klik roller",
      class: ["construct", "klik"]
    }, {
      id: "klik tripod",
      class: ["construct", "klik"]
    }, {
      id: "l'na solar",
      class: ["magical beast", "l'na"]
    }, {
      id: "l'na lunar",
      class: ["magical beast", "l'na"]
    }]

    const professions = ["diplomat","engineer","explorer","rogue","scholar","soldier"];

    const nations = {
      "0x829bd824b016326a401d083b33d092293333a830": {
        name: "Chelton",
        color: "aqua",
        nameBase: "GB",
        focus: [1,5,2],  //Eng, Sol, Exp
        people: [["human", 0.55], ["dwarf", 0.35], ["klik roller", 0.05], ["klik tripod", 0.05]]
      },
      "0xea674fdde714fd979de3edf0f56aa9716b898ec8": {
        name: "Jhara",
        color: "lime",
        nameBase: "IN",
        focus: [4,0,3],  //Sch, Dip, Rog
        people: [["elf", 0.55], ["human", 0.25],  ["l'na solar", 0.10], ["l'na lunar", 0.10]]
      },
      "0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5": {
        name: "Jinyuan",
        color: "gold",
        nameBase: "CN",
        focus: [1,0,3],  //Eng, Dip, Rog
        people: [["human", 0.35], ["elf", 0.15], ["l'na solar", 0.09], ["l'na lunar", 0.08], ["dwarf", 0.15], ["klik tripod", 0.09], ["klik roller", 0.09]]
      },
      "0x1e9939daaad6924ad004c2560e90804164900341": {
        name: "Kirov",
        color: "orange",
        nameBase: "RU",
        focus: [5,2,0],  //Sol, Exp, Dip
        people: [["dwarf", 0.50], ["klik tripod", 0.25], ["klik roller", 0.15], ["human", 0.1]]
      },
      "0xb2930b35844a230f00e51431acae96fe543a0347": {
        name: "Shuhadan",
        color: "teal",
        nameBase: "AF", 
        focus: [0,3,5],  //Dip, Rog, Sol
        people: [["elf", 0.40], ["l'na solar", 0.20], ["l'na lunar", 0.20], ["human", 0.20]]
      },
      "0x2a65aca4d5fc5b5c859090a6c34d164135398226": {
        name: "Venasque",
        color: "purple",
        nameBase: "FR",
        focus: [2,4,1],  //Exp, Sch, Eng
        people: [["human", 0.15], ["elf", 0.13], ["l'na solar", 0.15], ["l'na lunar", 0.14], ["dwarf", 0.14], ["klik tripod", 0.15], ["klik roller", 0.14], ]
      }
    }

    return {
      professions: professions,
      nations: nations,
      people: people
    };
  }
})
