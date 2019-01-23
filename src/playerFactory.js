let playerFactory = (app) => {
    let RNG = new Chance(Date.now())
    //utils . bigNumberify ( value ) 

    /*TIMER
        Every Tick is an hour in game, ticks are standard ~2 second
        One day = 24 ticks
        One week = 168 ticks ~5.6 min
        One quarter = 2160 ticks ~1.2 hours 
        One year = 8640 ticks ~4.8 hours
    */
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

    //PLAYER
    app.player = {
        _id : "",
        _xp : [0,0,0,0,0,0],
        _boosts : [],
        _init : false,
        _fi : -1,
        get id () { return this._id }, 
        get save () {
            return {
                xp : this._xp,
                bootst : this._boosts
            }
        },
        load(data) {
            data = data || {}
            this._xp = data.xp || [0,0,0,0,0,0]
            this._boosts = data.boosts
        },
        get faction () { return app.factions[this._fi] },
        init () {
          //only initialize once
          if(this._init) return
          this._id = ethers.utils.solidityKeccak256(['address', 'address'], [app.ETH.addresses.ESPlanes, app.wallets.main.address])
          this._fi = app.factions.length
          app.factions.push(new app.Faction({
              id: this._id,
              rank: 2
          }))
          this.faction._i = this._fi
          //player islands start at 2952790272
          let di = parseInt(this.id[2],16)%4
          let j = parseInt(this.id.slice(3,7),16)%128
          let find = app.Outlands._setFind(di,j,3)
          //push claim 
          this.faction.addClaim(find)
          //display the player dimension 
          //app.Outlands.displayLevel(this.faction.dimensions[0])
        }
    }

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
}

export {playerFactory}