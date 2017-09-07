define(function(require) {
  const d3 = require("d3");

  return (App)=>{
    const islandMaker = require("island")(App)
      , orgMaker = require("organization")(App)
      , Data = App.Data;
    let Actives = App.Actives;

    var ethScanUrl = "https://api.etherscan.io/api?module=proxy&action="
      , ethScanTXN = "eth_getBlockTransactionCountByNumber&tag=";
    var last = -1;

    const initialize = (sim)=>{
      //return promise
      return new Promise(function(resolve, reject) {
        //pull data
        $.get(ethScanUrl + "eth_blockNumber", function(data) {
          //start
          App.start = parseInt(data.result, 16);

          //setup noise function
          App.makeNoise(App.gameTime.toString(), App.start.toString());

          for (let i = App.start; i >= App.start - 10; i--) {
            setTimeout(function() {

              $.get(ethScanUrl + "eth_getBlockByNumber&tag=" + i.toString(16) + "&boolean=true", function(bd) {
                //expand org grasp
                App.coreExpand();
                //return if nothing
                if (!bd.hasOwnProperty("result"))
                  return;

                if (bd.result.hasOwnProperty("miner")) {
                  let miner = bd.result.miner;
                  //create the core if the miner doesn't exist and within first 10 observation blocks
                  if (!Actives.hasOwnProperty(miner)) {
                    let properties = {
                      id: miner,
                      val: 50,
                      core: true
                    }
                    //check for core nations
                    if (Data.hasOwnProperty(miner)) {
                      properties.childIDs = [orgMaker(Data[miner]).id];
                    }
                    //create island
                    let I = islandMaker(properties);
                  }//give the miner more territory
                  else {
                    //island
                    let I = Actives[miner];
                    //create child
                    let c = orgMaker({
                      parentID: I.orgs[0].id
                    });
                    //push to closest 
                    I.closestNoOrg()[0].addOrg(c);
                  }
                }

                //if there are no transactions return
                if (!bd.result.hasOwnProperty("transactions"))
                  return;

                bd.result.transactions.filter(function(tx) {
                  //only return data with a value greater than 0
                  return parseInt(tx.value, 16) > 0;
                }).forEach(function(tx) {
                  //value is provided in hex & wei - convert from hex and wei
                  var val = parseInt(tx.value, 16) / 1e18;

                  //if the to addr does not exist in the data
                  if (!Actives.hasOwnProperty(tx.to)) {
                    //create a new island
                    islandMaker({
                      id: tx.to,
                      val: val
                    });
                  }
                })

                if (i == App.start - 10)
                  resolve(true);
              })

            }, 1500);

          }
          // close for
        })
      }
      )
    }

    const blockCheck = ()=>{
      $.get(ethScanUrl + "eth_blockNumber", function(data) {
        //if the last val retrieved is this val return - don't write same block
        if (parseInt(data.result, 16) == last)
          return;
        App.observed++;
        App.UI.observed = App.observed;
        //if not collect block
        App.UI.eBlock = last = parseInt(data.result, 16);

        $.get(ethScanUrl + "eth_getBlockByNumber&tag=" + data.result + "&boolean=true", function(bd) {
          if (!bd.hasOwnProperty("result"))
            return;

          if (bd.result.hasOwnProperty("miner")) {
            let miner = bd.result.miner;
            //look for miners
            if (!Actives.hasOwnProperty(miner)) {}
          }

          //if there are no transactions return
          if (!bd.result.hasOwnProperty("transactions"))
            return;

          bd.result.transactions.filter(function(tx) {
            //only return data with a value greater than 0
            return parseInt(tx.value, 16) > 0;
          }).forEach(function(tx) {
            //value is provided in hex & wei - convert from hex and wei
            var val = parseInt(tx.value, 16) / 1e18;

            //if the to addr does not exist in the data
            if (!Actives.hasOwnProperty(tx.to)) {}
            if (!Actives.hasOwnProperty(tx.from)) {}

          })
        })
      });
    }

    return {
      blockCheck: blockCheck,
      initialize: initialize
    }

  }
})
