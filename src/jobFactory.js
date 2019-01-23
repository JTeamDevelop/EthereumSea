let jobFactory = (app) => {
        
    class Job {
        constructor (patron, opponent, location, lv) {
            this._patron = patron
            this._opponent = opponent
            this._location = location
            this._lv = lv
            this._tick = app.timer.tick

            //a job is a collection of labors or missions @ a location 
            this._children = []
            this._stress = []
        }
        get hash () {
            return ethers.utils.solidityKeccak256(['address','string','uint256','uint256','uint256','uint256'], [app.ETH.addresses.ESPlanes, "job", this._patron, this._location, this._lv, this._tick])
        }
        /** LABOR
        * @Dev A labor is a work that can only be completed by a certain skill 
          @Dev labors can only be attempted by forces with a level >= job level - 2
          @Dev on a failed roll the player must pay the CPX difference - every labor takes resources
          opts : provided options below - if none provided they are generated
            skill : the only skill that works 
            color : CPX color 0-5
            stress : max stress needed to over come 
            tags : tags that apply to the task - approach and skill
            opt : whether it is optional to complete the labor
        */
        addLabor (opts) {
            let hash = ethers.utils.solidityKeccak256(['bytes32','uint256'], [this.hash, this._children.length])
            let RNG = new RNG(hash)

            let L = {
                what : "l",
                skill : opts.skill || RNG.d6()-1,
            }
            //if they are provided - add them, otherwise they will be random every encounter
            if(opts.color) L.color = opts.color
            if(opts.tags) L.tags = opts.tags
            if(opts.opt) L.opt = opts.opt 

            this._children.push(L)
            //add stress
            this._stress.push(opts.stress || 5)
        }
        /** Missions
        * @Dev Each mission is a set of 5 challenges (rolls)
          @Dev Every failure produces stress which must be accounted for afterwards
          opts : provided options below - if none provided they are generated
            skill : Primary Skill of the mission, will occur 60% of the time 
            tags : tags that apply to the mission - approach, skill, and element, 50% chance of appearing on each challenge 
            opt : whether it is optional to complete the mission 
        */
        addMission (opts) {
            let hash = ethers.utils.solidityKeccak256(['bytes32','uint256'], [this.hash, this._children.length])
            let RNG = new RNG(hash)

            let M = {
                what : "m",
                skill : opts.skill || RNG.d6()-1,
            }
            //if they are provided - add them, otherwise they will be random every encounter
            if(opts.tags) L.tags = opts.tags
            if(opts.opt) L.opt = opts.opt 

            this._children.push(L)
            //add stress 1 for every challenge 
            this._stress.push(5)
        }
        get remainingTasks () {
            return this._stress.reduce((sum,val) => sum = val <= 0 ? sum+1 : sum,0)
        }
        stress (i,val) {
            this._stress[i] -= val
        }
        get save() {
            return {
                tick : this._tick,
                patron: this._patron,
                opponent : this._opponent,
                location : this._location,
                lv : this._lv,
                n : this._children.length,
                stress : this._stress
            }
        }
    }

    app.jobs = []
}

export {jobFactory}