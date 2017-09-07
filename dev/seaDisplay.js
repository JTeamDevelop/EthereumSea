define(function(require) {
  const d3 = require("d3")
    , Chance = require("chance");

  return (App)=>{
    const orgMaker = require("organization")(App)
      , islandMaker = require("island")(App)
      , IO = require("ethereumIO")(App);

    let Actives = App.Actives
      , selected = [];

    var svg = d3.select("svg")
      , gIslands = svg.append("g").attr("class", "islands")
      , width = svg.attr("width")
      , height = svg.attr("height")
      , tau = 2 * Math.PI
      , scale = 1
      , T = [0, 0];

    gIslands.attr("transform", "translate(" + T[0] + width / 2 + "," + T[1] + height / 2 + ") scale(" + scale + "," + scale + ")");

    var simulation = d3.forceSimulation().velocityDecay(0.1).force("x", d3.forceX().strength(0.005)).force("y", d3.forceY().strength(0.005)).force("collide", d3.forceCollide().radius(function(d) {
      return d.f();
    }).iterations(4));

    const simNodes = App.simNodes = ()=>{
      var nodes = [];
      for (var x in Actives) {
        if (Actives[x].type == "island" && Actives[x].val > 0) {
          nodes.push(Actives[x]);
        }
      }
      return nodes;
    }

    //handle initial expansion
    App.coreExpand = ()=>{
      var cn = simNodes().filter((n)=>{
        return n.core;
      }
      )

      cn.forEach((n)=>{
        //create child
        let c = orgMaker({
          parentID: n.orgs[0].id
        });
        //push to closest 
        n.closestNoOrg()[0].addOrg(c);
      }
      )
    }

    //every 100ms this will be called update display
    function ticked() {
      gIslands.selectAll("circle").attr("class", "island").attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      }).attr("r", function(d) {
        return d.r;
      }).attr("fill", function(d) {
        return d.color;
      })
    }

    //add zoom capabilities 
    //d3.select("canvas").call(d3.zoom().scaleExtent([1 / 1000, 200]).on("zoom", zoomed));
    d3.select("svg").call(d3.zoom().scaleExtent([1 / 1000, 200]).on("zoom", zoomed));
    //zoom function
    function zoomed() {
      //collect zoom event data
      var e = d3.event;
      //set global and allow the ticked event to handle drawing
      scale = d3.event.transform.k;
      T = [d3.event.transform.x, d3.event.transform.y];

      let tx = Number(T[0]) + Number(width / 2)
        , ty = Number(T[1]) + Number(height / 2);

      gIslands.attr("transform", "translate(" + tx + "," + ty + ") scale(" + scale + "," + scale + ")");
    }

    d3.select("canvas").on("click tap", function() {
      let p = d3.mouse(this)
        , island = simulation.find(p[0], p[1], 30);
    });

    function startSim() {
      d3.select("g.islands").selectAll("circle").data(simNodes()).enter().append("circle").attr("class", "island").on("click tap", function(d) {
        var e = d3.event;
        let p = d3.mouse(this)
          , n = this;
      });

      simulation.nodes(App.simNodes());
    }

    const clear = App.clear = function() {
      //clear out the old
      for (let x in Actives) {
        delete Actives[x];
      }
      simulation.nodes([]);
      $("g.islands").empty();
    }

    const newGame = App.newGame = function() {
      App.notify("OK! Please wait while we populate the Sea.", {
        time: 3000
      });

      clear();
      //no gameID yet
      App.gameID = '';
      localStorage.setItem('gameID', '');

      App.gameTime = Date.now();

      //pull initial data
      IO.initialize(simulation).then(()=>{
        App.UI.gameID = App.start.toString() + "@" + App.gameTime.toString();
        App.notify("Finished!");

        startSim();
        //heat it up
        simulation.alpha(1);
      }
      );
    }

    const load = App.load = function() {
      //load the saved state
      App.DB.getItem(App.gameID).then((doc)=>{
        //clear state
        App.clear();
        //core data
        App.gameTime = doc.gameTime;
        App.start = doc.start;
        App.observed = doc.observed;
        App.M = doc.M;

        App.UI.gameID = App.start.toString() + "@" + App.gameTime.toString();

        //actives data
        for (let i = 0; i < doc.actives.length; i++) {
          if (doc.actives[i].type == "island") {
            islandMaker(doc.actives[i]);
          } else if (doc.actives[i].type == "organization") {
            orgMaker(doc.actives[i]);
          }
        }

        //setup noise function
        App.makeNoise(App.gameTime.toString(), App.start.toString());

        //start the simulation
        startSim();
        simulation.alpha(1);
      }
      )
    }

    //if no saved game - make new
    if (App.gameID == '') {
      App.notify("Welcome! It looks like you're new. Please wait while we populate the Sea.", {
        time: 3000
      });

      App.gameTime = Date.now();

      //pull initial data
      IO.initialize(simulation).then(()=>{
        App.UI.gameID = App.start.toString() + "@" + App.gameTime.toString();

        App.notify("Finished!");
        App.notify("If you don't like it you can always reload the page.", {
          time: 2000
        });

        startSim();
        //heat it up
        simulation.alpha(1);
      }
      );
    }//load saved game
    else {
      App.notify("Welcome back! Please wait while load the game.", {
        time: 3000
      });
      App.load();
    }

    //look for new block every 5 seconds
    var eBlockTimer = setInterval(function() {
      IO.blockCheck();
    }, 5000);
    //tick the simulation every 100ms
    var simTick = setInterval(function() {
      //recalculate force
      if (App.t % 600 == 0) {
        simulation.force("collide", d3.forceCollide().radius(function(d) {
          return d.f();
        }).iterations(4));

        simulation.alpha(1);
      }

      App.t++;
      //months
      App.M += 1 / 3000;

      simulation.tick();
      ticked();
    }, 100);

    return {
      clear: clear,
      newGame: newGame
    }

  }
})
