let glTest = ()=>{
  let tc = document.createElement('canvas')
  return tc.getContext("webgl") || tc.getContext("experimental-webgl")
}

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

  //global filter for VUE
  Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  })

  app.UI.modal = new Vue({
    el: '#ui-modal',
    data : {
      currentComponent:""
    }
  })

  Vue.component("swn-character-sheet",{
    template: '#swn-character',
    props: ['cid'],
    data : function() {
      return {
        name : "NAME",
        xp : 0,
        level : 1,
        atk: 0,
        hp: [1,1],
        classes : ["exp"],
        attributes : [10,10,10,10,10,10],
        OSRAttributeNames : ["STR","DEX","CON","INT","WIS","CHA"],
        skills : {},
        showAddSkill : false,
        newSkill : "",
        gifts : [],
        showAllGifts : false
      }
    },
    computed : {
      swnSkills () { return app.characters.SWNSkills },
      swnClasses () { return app.characters.SWNClasses },
      classAbilities () {
        let T = this.titles
        
        return this.classes.map((c,i) => {
          let C = app.characters.SWNClasses[c]
          return {
            id : c,
            title : T[i] + " " + C.name,
            ability : C.base + (T[i] === "Partial" ? C.partial : C.full) + (T[i] === "Heroic" ? C.heroic : ""),
            gifts : C.hasOwnProperty("gifts") ? C.gifts : null
          }
        })
      },
      titles () {
        if(this.classes.length === 0) return [""]
        return [["Heroic"],["Full","Partial"],["Partial","Partial","Partial"]][this.classes.length-1]
      },
      attributeBonus () {
        return this.attributes.map(v => {
          if(v === 3) return -2;
          else if(v <= 7) return -1;
          else if(v <= 13) return 0;
          else if(v <= 17) return 1;
          else return 2;
        })
      }
    },
    methods : {
      //add or remove a gift 
      editGift(c,id) {  
        let gid = c+"."+id
        let i = this.gifts.indexOf(gid)
        if(i === -1) this.gifts.push(gid);
        else this.gifts.splice(i,1);
      },
      addSkill() {
        Vue.set(this.skills,this.newSkill,0)
        this.newSkill = ""
        this.showAddSkill = false
      },
      rmSkill (id) { 
        let S = Object.assign({},this.skills)
        delete S[id]
         
        this.skills = Object.assign({},S)
      }
    }
  })

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

          all.push({i,text:f.name})
          return all 
        },[])
      }
    },
    methods : {
      makeFind(fi) {
        let find = app.planes.makeFind(this.ri, fi)
        let lv = app.rarity(find.hash)
        let color = app.colors[find.color]
        let text = find.reward + " level "+lv+" "+color
        app.notify({text:text})
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
      finds : {},
      name : "",
      stats : {},
      ne : {n:[],e:[]},
      ifChangePlane : false,
      address : "",
      RETH : 0,
      CPX : 0,
      factionId : -1,
      menuItems : ["Islands","Forces"],
      menuId : -1,
      playerClaims : [],
      playerForces : [],
      twoD: false,
      showNav: false,
      showFaction : false,
    },
    mounted () {
      //enable 2d canvas if no WEBGL
      if(!glTest()) this.twoD = true 

      this.newPlaneAddress =app.chance.pickone(TOP)
      //get current block 
      app.ETH.main.getBlockNumber().then(n => {
        this.currentBlock = n 
      })
      this.getAllPlanes()
      // DOM updated
      this.viewPlane()
      //show 
      app.UI.modal.currentComponent = "swn-character-sheet"
      //$('#ui-modal').modal('show')
    },
    computed : {
      faction () { return this.factionId > -1 ? app.planes._current.faction : null },
      CCPX () { 
        let colors = ["red","orange","gold","green","blue","purple"]
        let style = this.stats.resources.map((n,i)=> [colors[i],n])
          .filter(r => r[1]>0) 
          .map(r => "height:1.3em;background-color:"+r[0]+";width:"+7*r[1]+"px;")
        return style
      },
      cityNames () {
        return this.stats.cities.map(c => c.name)
      }
    },
    methods : {
      getAllPlanes () {
        this.allPlanes = TOP.slice() 
        let all = app.planes.all
        for(let id in all){
          if(all[id].chain === this.chain && all[id].balance > 0 && !this.allPlanes.includes(all[id].id)) this.allPlanes.push(all[id].id)
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
      },
      account (address, RETH, CPX) {
        this.address = address
        this.RETH = RETH
        this.CPX = CPX
      },
      viewPlane () {
        d3.select("#spinner").attr("class", "lds-dual-ring")
        
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
          //stats
          V.stats = app.planes._current._stats
          //name it 
          V.name = V.stats.names[0]
          //factionId
          V.factionId = app.planes._current._fi
          //needs/exports 
          V.ne = {
            n : app.planes._current.needs,
            e : app.planes._current.exports
          }
          //display it 
          V.planeAddress = address
          Vue.nextTick(() => {
            app.planes.display(0,3)
          })
          //get concurrently
          this.getLinks()
          //no show 
          V.showNav = false
        })
      },
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
    //app.UI.main.playerClaims = app.player.faction.claims 
    
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