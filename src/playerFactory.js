let playerFactory = (app)=>{

  app.ECS.newCollection("player")

  //hierarchy
  app.ECS.newComponent({
    name: "isPlayer",
    description: "Player data",
    state: {
      address: "",
      mnemonic : ""
    }
  })

  //PLAYER
  app.player = {
    _current : {},
    get current () { return this._current },
    get all() {
      return app.ECS.getCollection("player")
    },
    connectWallet () {
      //now connect to provider
      app.wallets = {
        main: this._current.connect(app.ETH.main),
        ropsten: this._current.connect(app.ETH.ropsten)
      }
    },
    factory() {
      let P = {
        name: "",
        //components 
        _c: []
      }
      app.ECS.addComponent(P, "isPlayer")
  
      this._current = ethers.Wallet.createRandom()
      //add to users 
      let address = this.current.address
      P.address = address
      app.state.lastUser = address
      app.state.users.push(address)
      //convert to JSON string and turn to hex 
      P.mnemonic = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(this.current.mnemonic))
      //connect wallet
      this.connectWallet()
      //save 
      let allP = app.ECS.getCollection("player")
      allP[address] = P
      //save
      app.ECS.save()
      //return 
      return allP[address] 
    },
    init() {
      //check for state 
      app.state.lastUser = app.state.lastUser || ""
      app.state.users = app.state.users || []
      //see if there is a current user 
      if(app.state.lastUser.length>0) {
        let user = this.all[app.state.lastUser]
        let mnemonic = ethers.utils.toUtf8String(user.mnemonic)
        //set up wallet
        this._current = ethers.Wallet.fromMnemonic(mnemonic)
      }
      else {
        //create new 
        this.factory()
      }

      //setup hash 
      let hash = ethers.utils.solidityKeccak256(['bytes32', 'address'], [app.seed, this.current.address])
      let RNG = new Chance(hash)
      //determine the trouble to use 
      const baseTroubleIds = [1,2,3,4,5,6,7,8,9,10,1,2,6,7,10]
      //shuffle
      let tids = RNG.shuffle(baseTroubleIds)
      //add 0 to beginning
      tids.unshift(0)
      //for the intial trouble assign ids 
      let allF = app.factions.all, F;
      //trouble starts at 32
      for (let i = 32; i < 32+16; i++) {
        F = allF[i]
        //ensure no overwrite
        if(F.tid === -1){
          app.ECS.addComponent(F, "isTrouble")
          F.at = new Map()
          F.at.set("i",1)
          F.tid = tids[i-32]  
        }
      }
    }
  }

  /*TIMER
        Every Tick is an hour in game, ticks are standard ~2 second
        One day = 24 ticks
        One week = 168 ticks ~5.6 min
        One quarter = 2160 ticks ~1.2 hours 
        One year = 8640 ticks ~4.8 hours
    */

  /*
    app.timer = {
        _tick : 0,
        _last : 0,
        _interval : 1990,
        _callbacks : [],
        get tick () { return this._tick },
        get last () { return this._last },
        get interval () { return this._interval },
        set interval (interval) { this._interval = interval },
        stop () { this._interval = Infinity },
        register (CB) { this._callbacks.push(CB) },
        step () {
            this._tick++
            this._last = Date.now()
            //run callbacks 
            this._callbacks.forEach(CB => CB(this.tick))
        },
        init () {
            setInterval(()=> {
                let now = Date.now()
                let last = app.timer.last
                if(now > last + app.timer.interval) {
                    app.timer.step()
                }
            },1000)  
        },
        get save () {
            return {
                tick : this._tick,
                last : this._last,
                interval : this._interval,
            }    
        }, 
        load (data) {
            data = data || {}
            this._tick = data.tick || 0
            this._last = data.last || Date.now()
            this._interval = data.interval || 1990
        }
    }

    app.DB.getItem("timer").then(Timer => {
        if(Timer) {
            app.timer.load(Timer)
        }
        //now start the timer 
        console.log("Timer loaded, started: " + Date.now())
        //app.timer.init()
    })

    //TOKENS

    app.tokens = {
        _tokens : new Map(),
        amount (whar) {
            if(!this._tokens.has(what)) return 0
            else {
                let T = this._tokens.get(what)
                return T.in - T.out
            }                
        },
        spend (what, val) {
            if(this.amount(what) < val) return false
            else {
                let T = this._tokens.get(what)
                T.out -= val
                return true
            }
        },
        earn (what, val) {
            if(this._tokens.has(what)) {
                let T = this._tokens.get(what)
                T.in += val
            }
            else this._tokens.set(what, {in:val,out:0})

            return this.amount(what)
        },
        get save () {
            return this._tokens
        }
    }

    app.DB.getItem("tokens").then(Tokens => {
        console.log("Tokens loaded")
        if(Tokens) {
            app.tokens._tokens = new Map(Tokens)    
        }
    })

    let stats = [[1,2,3,4,5],[0,2,3,4,5],[0,1,3,4,5],[0,1,2,4,5],[0,1,2,3,5],[0,1,2,3,4]]
    app.DB.getItem("player").then(Player => {
        console.log("Player loaded")
        if(Player) {
            app.player.load(Player)    
        }
        else {
            //create 6 new forces - one for each skill
            for(let i = 0; i < 6; i++) {
                let fS = RNG.shuffle(stats[i]).slice(0,2)
                //add top skill
                fS.unshift(i)
                //create
                app.createForce(fS, 1)
            }
        }
    })

  
  */
}

export {playerFactory}
