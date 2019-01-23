let UI = (app) => {
  const TOP = ["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","0x742d35cc6634c0532925a3b844bc454e4438f44e","0x53d284357ec70ce289d6d64134dfac8e511c8a3d","0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67","0xab7c74abc0c4d48d1bdad5dcb26153fc8780f83e","0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae","0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0","0x2140efd7ba31169c69dfff6cdc66c542f0211825"]
  let etherscanProvider = new ethers.providers.EtherscanProvider()

  app.notify = (opts) => {
    opts.type = opts.type || "warning"
    opts.layout = opts.layout || "center"
    opts.h = opts.h ? `<h2 class="markerFont" align="center">` + opts.h + `</h2>` : ""
    opts.text = opts.text ? `<p align="center">` + opts.text + `</p>` : ""
    
    //let roll = 
    let roll = ""
    if(opts.roll) {
      roll = opts.roll.map(v => {
        let r = ["media/icons/minus.svg", "media/icons/blank.svg", "media/icons/plus.svg"][v + 1]
        return `<img src="`+r+`" height="30" width="30">`      
      }) 
      roll = `<div align="center">`+roll+"</div>"
    }
    
    //notify
    new Noty({
      theme: "relax",
      type: opts.type,
      layout: opts.layout,
      text: opts.h + opts.text + roll,
    }).show();
  }

  app.UI.findModal = new Vue({
    el: '#ui-find',
    data : {
      ri : -1,
      finds : []
    },
    computed : {
      findText () {
        //get the entity 
        let P = app.planes.currentEntity
        //do not supply once finds 
        return this.finds.reduce((all,f,i) => {
          if(P.once.includes(this.ri+"."+i)) return all

          all.push({i,text:f})
          return all 
        },[])
      }
    },
    methods : {
      makeFind(fi) {
        let find = app.planes.makeFind(this.ri, fi)
        app.notify({text:find})
      }
    }
  })

  //creates the VUE js instance
  app.UI.main = new Vue({
    el: '#ui-main',
    data: {
      chain : 0,
      allPlanes : [],
      planeAddress : "",
      newPlaneAddress : "",
      currentBlock : 0,
      links : [],
      allTxnAges : ["< 7 days","> 7, <30 days"],
      txnAge : 0,
      finds : {},
      planeID : 6000000,
      selectedPlane : 6000000,
      searchId : 10000,
      name : "",
      ifSearch : false,
      ifChangePlane : false,
      address : "",
      RETH : 0,
      CPX : 0,
      freeSearch : {
        reset : 0,
        used : 0,
        free : 0
      },
      factionId : -1,
      menuItems : ["Islands","Forces"],
      menuId : -1,
      playerClaims : [],
      playerForces : [],
    },
    mounted () {
      this.newPlaneAddress =app.chance.pickone(TOP)
      //get current block 
      app.ETH.main.getBlockNumber().then(n => {
        this.currentBlock = n 
      })
      this.getAllPlanes()
      this.viewPlane()
    },
    computed : {
      faction () { return app.factions[this.factionId] },
      forces () { return this.playerForces.map(id => app.forces.get(id)) }
    },
    methods : {
      getAllPlanes () {
        this.allPlanes = [] 
        let all = app.planes.all
        for(let id in all){
          if(all[id].chain === this.chain && all[id].balance > 0) this.allPlanes.push(all[id].id)
        }
      },
      getLinks () {
        let baseURL = "https://api.etherscan.io/api?module=account&action=txlist&address="
        let endURL = "&startblock=0&endblock=99999999&page=1&offset=7&sort=desc"

        let links = this.links = []
        let cpa = ethers.utils.getAddress(this.planeAddress)
        $.get(baseURL+cpa+endURL).then(d => {
          d.result.forEach(r => {
            if(ethers.utils.getAddress(r.from) !== cpa && !links.includes(r.from)) links.push(r.from)
            if(ethers.utils.getAddress(r.to) !== cpa && !links.includes(r.to)) links.push(r.to)
          })
        })
        /*
        //get the last 7 days of history 
        let start = this.currentBlock - (3600*24*7/15)
        etherscanProvider.getHistory(this.planeAddress, start, "latest").then(history => {
          history.forEach(h => {
            if(h.from !== cpa && !links.includes(h.from)) links.push(h.from)
            if(h.to !== cpa && !links.includes(h.to)) links.push(h.to)
          })
        })
        */
      },
      islandName (si) { return app.islandNames.get(si) },
      selectIsland(i) {
        let island = this.playerIslands[i]
        console.log(island)
      },
      account (address, RETH, CPX) {
        this.address = address
        this.RETH = RETH
        this.CPX = CPX
      },
      viewPlane () {
        let V = this
        let address = this.newPlaneAddress
        let li = this.links.indexOf(address)
        let chain = this.chain
        //make sure its there 
        app.ETH.main.getBalance(address).then(b => {
          //check if 0 
          if(b.isZero()){
            //if nothing alert 
            app.notify({h:"Closed",text:"The address has no balance."})
            this.links.splice(li,1)
            return
          }
          //get the balance in ETH 
          let wei = ethers.utils.bigNumberify("1000000000000000000")
          if(b.lt(wei)) b = 0.1
          else b = b.div(wei).toNumber()
          //make it 
          app.planes.factory(address,b,chain)
          V.getAllPlanes()
          //generate it 
          app.planes.generate(address, chain)
          //display it 
          app.planes.display(0,3)
          V.planeAddress = address
          //get concurrently
          this.getLinks()
        })
        //this.planeID = this.selectedPlane
        //console.log(this.plane)
        //now show a hex 
        //if(app.scene) app.hexDisplay(this.planeID)
        //no show 
        //this.ifChangePlane = false
      },
      conductSearch () {
        //let id = Number(this.searchId)
        let overrides = {
          // The maximum units of gas for the transaction to use
          gasLimit: 300000,
          // The price (in wei) per unit of gas
          gasPrice: ethers.utils.parseUnits('2.0', 'gwei'),
        }
        // start a search, which returns the transaction
        app.contracts.ESPlanes.contract.Search(this.searchId,overrides).then(tx => {
          //notify
          app.notify({h:"Submitted", text:"TX: "+tx.hash})
          //wait for tx 
          tx.wait().then((receipt)=> {
            let evt = receipt.events[0].args
            let roll = evt.roll.toNumber()
            let req = evt.req.toNumber()
            let id = evt.id.toNumber()
            console.log(id,roll,req,roll<req)
            //notify
            let h = roll < req ? "Success" : "Failure"
            let type = roll < req ? "success" : "error"
            let text = roll < req ? "You have added "+id+" to the Sea!" : "You can always try again."
            app.notify({h, type, text})
          })
          .catch(er => {
            console.log(er)
          })   
        })
      }
    }
  })

  //poll for updates
  let ethereumCheck = () => {
    //get the balanaces of CPX and RETH
    if(!app.wallets) return
    //get current block 
    app.ETH.main.getBlockNumber().then(n => {
      app.UI.main.currentBlock = n 
      console.log("Main Block: " + n)
    })
    //init the outlands display 
    if(!app.player._init) app.player.init()
    //now update with current islands
    app.UI.main.playerClaims = app.player.faction.claims 
    
    return
    app.wallets.ropsten.getBalance().then(rb => {
      //turn wei into ETH 
      let reth = ethers.utils.formatEther(rb)
      app.contracts.CPXToken.contract.balanceOf(app.wallets.ropsten.address).then(cb => {
        //turn cpx wei into CPX 
        let cpx = ethers.utils.formatEther(cb)
        app.UI.main.account(app.wallets.ropsten.address, reth, cpx)    
      })
    })

    //get the plane counts 
    app.contracts.ESPlanes.contract.getPlaneCount().then(c => {
      let allIds = app.UI.main.allPlaneIds = []
      let npage = Math.ceil(c.toNumber()/50) 
      for(let i = 0; i < npage; i++) {
        app.contracts.ESPlanes.contract.getAllPlanes(i).then(ap => {
          ap.ids.forEach(id => {
            let nid = id.toNumber()
            if(nid > 0) allIds.push(nid) 
          })
        })
      }
    })

    //get free searches
    app.contracts.ESPlanes.contract.getFreeSearchData().then(data => {
      let now = Date.now()/1000
      let last = data.last.toNumber()
      let reset = (8 * (60*60) + last) - now
      app.UI.main.freeSearch = {
        reset : reset < 0 ? "Now" : reset/60/60,
        used : data.used,
        free : 20-data.free
      }
    })
  }

  setTimeout(function(){ ethereumCheck(); }, 5000)
  setInterval(function(){ ethereumCheck(); }, 30000)
}

export {UI}