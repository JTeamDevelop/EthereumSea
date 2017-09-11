//Load Web App JavaScript Dependencies/Plugins
define(function(require) {
  var LF = require("localforage")
    , Chance = require("chance")
    , Noty = require('Noty')
    , nameGen = require('placeNames')
    , SimplexNoise = require('simplex');

  require("bootstrap");

  let App = {
    //create localforage db store
    DB: LF.createInstance({
      name: "EtherSea"
    }),

    //initializes a Chance generator for random needs later
    chance: new Chance(),
    id() {
      let pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      return this.chance.string({
        length: 24,
        pool: pool
      });
    },
    newName() {
      //give the first runner a crazy name
      return this.chance.capitalize(this.chance.word({
        syllables: 3
      }));
    },
    makeColor() {
      return this.chance.string({
        length: 6,
        pool: "ABCDEF"
      });
    },

    //name generators
    nameGen: nameGen,
    get nameBases() {
      let l = [];
      for (let x in this.nameGen) {
        l.push(x);
      }
      return l;
    },

    //active objects
    Actives: {},
    get islands () {
      let I = [];
      for (let x in this.Actives) {
        let a = this.Actives[x];

        if (a.type == "island" ) {
          I.push(a);
        }
      }
      return I;
    },
    get coreNations() {
      return this.allNations.filter((n)=> {return n.class.includes("core");} )
    },
    get allNations() {
      let n = [];
      for (let x in this.Actives) {
        let N = this.Actives[x];

        if (N.type == "organization" && N.class.includes("nation")) {
          n.push(N);
        }
      }
      return n;
    },
    get allStates () {
      let n = [];
      for (let x in this.Actives) {
        let N = this.Actives[x];

        if (N.type == "organization" && N.class.includes("state")) {
          n.push(N);
        }
      }
      return n;
    },

    start: 0,
    observed: 0,
    t: 0,
    M: 0,
    get nM() {
      return Math.round(this.M * 5);
    },

    savedGames: localStorage.getItem("savedGames") === null ? [] : JSON.parse(localStorage.getItem("savedGames")),
    gameID: localStorage.getItem("gameID") === null ? '' : localStorage.getItem("gameID"),
  };

  App.save = function() {
    //set the gameID if it doesn't exist
    if (this.gameID == '') {
      this.gameID = this.start.toString() + "@" + this.gameTime.toString();
    }
    //localStorage
    localStorage.setItem("gameID", this.gameID);

    //updated saved game list
    if (!this.savedGames.includes(this.gameID)) {
      this.savedGames.push(this.gameID);
      //save to localStorage
      localStorage.setItem("savedGames", JSON.stringify(this.savedGames));
    }
    //update the UI
    App.UI.savedGames;

    //core data
    let data = {
      id: this.gameID,
      gameTime: this.gameTime,
      start: this.start,
      observed: this.observed,
      M: this.M,
      actives: []
    }

    //save active state
    for (let x in this.Actives) {
      data.actives.push(this.Actives[x].save());
    }

    //save to storage
    App.DB.setItem(this.gameID, data);
  }

  //notification using noty
  App.notify = (text,opts={})=>{
    let type = opts['type'] || 'success'
      , layout = typeof opts.layout === "undefined" ? 'center' : opts.layout
      , time = typeof opts.time === "undefined" ? 1000 : opts.time;

    new Noty({
      theme: 'relax',
      type: type,
      layout: layout,
      timeout: time,
      text: text,
    }).show();
  }

  App.makeNoise = function(time, block) {
    //make force noise
    App.forceChance = new Chance(time + block + "+force");
    App.forceRandom = function() {
      return App.forceChance.integer({
        min: 0,
        max: 1000000
      }) / 1000000;
    }
    App.force = new SimplexNoise(App.forceRandom);
    //make temp noise
    App.tempChance = new Chance(time + block + "+temp");
    App.tempRandom = function() {
      return App.tempChance.integer({
        min: 0,
        max: 1000000
      }) / 1000000;
    }
    App.temp = new SimplexNoise(App.tempRandom);
  }

  App.Data = require("data")(App);

  //main UI
  App.UI = require('UI')(App);
  //d3 sea display
  require('seaDisplay')(App);
})
