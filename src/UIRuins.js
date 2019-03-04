let subUI = (app)=>{

  let CPXSkillRoll = () => {
    return app.chance.rpg("2d6", {sum:true})
  }

  Vue.component("ruin-modal", {
    template: '#ruin-modal-ui',
    data: function() {
      return {
        twoD: true,
        loadCId : "",
        time : [0,0],  //turns, days
        cids : [],
        HP : [],
        encounters : [],
        complete : [],
        activePC : -1,
        activeZ : "",
        cDataIds : ["Skills","Aspects"],
        cData : "Skills",
        aspectId : 0
      }
    },
    mounted() {
      app.UI.activeRuin = this
      // DOM not updated yet
      Vue.nextTick(function () {
        app.ruins.display()
      })
    },
    computed: {
      ruin () { return app.ruins.active },
      allCharacters () { return app.characters.all },
      activeCharacters () { return this.cids.map(id => this.allCharacters[id]) },
      activeC () {
        return this.activePC === -1 ? {} : this.activeCharacters[this.activePC]
      },
      maxHP () {
        let C = this.activeCharacters
        let sp = C.map(c => {
          let p = 0
          for(let x in C.skills) p += Number(C.skills[x])  
          return p 
        })
        let lv = sp.map(p => p < 5 ? 1 : Math.floor(p/5))
        
        return lv.map(l=> Math.round(l*3.5))
      },
      allActiveAspects () {
        return this.activePC === -1 ? [] : this.activeC.aspects
      },
      aspectBonus () {
        let bonus = {a:[],d:[]}
        return this.allActiveAspects.reduce((b,a)=>{
          b.a.push(app.aspectColor(a[2]))
          b.d.push(app.aspectColor(a[4]))

          if(a[1][0] === "s") b.a.push(a[3]);
          else if(a[1][1] === "s") b.d.push(a[5]);

          return b
        },bonus)
      },
      activeAspect () {
        if(this.activePC === -1) return ""
        let a = this.allActiveAspects[this.aspectId]
        
        let adv = [a[2]], dis = [a[4]]; 
        if(a[1][0] === "s") adv.push(a[3]);
        else if(a[1][1] === "s") dis.push(a[5]);

        adv = adv.map(_a => "+"+_a)
        dis = dis.map(_d => "-"+_d)

        return adv.join("  ")+" / "+dis.join("  ")
      }
    },
    methods: {
      addC() {
        let i = this.cids.length
        if(!this.cids.includes(this.loadCId)) {
          this.cids.push(this.loadCId)
          this.HP.push(this.maxHP[i])
        }
      },
      hit () {

      },
      skillRoll (s,ei,fi) {
        if(this.activePC === -1) return

        //increase turns 
        this.time[0]++

        let E = this.encounters[ei]
        let what = E.what
        let apci = this.activePC
        let C = this.activeCharacters[apci]
        let HP = this.HP
        let skill = C.skills[s] ? Number(C.skills[s]) : 0 

        let R = CPXSkillRoll()
        let win, txt="", dmg=0, complete= false;
        //handle each differently
        if(what === "Combat"){
          let foe = E.foes[fi]
          //skills 
          let Athletics = C.skills.Athletics ? Number(C.skills.Athletics) : 0 
          let Fight = C.skills.Fight ? Number(C.skills.Fight) : 0 
          //do damage 
          win = '⇓'
          if(R + skill - foe.stats.AC > 7) {
            win = '⇑'
            let fdmg = app.heroicDamage("1d6")
            foe.hits = foe.hits.map((h,i)=> {
              let d = foe.hd[i] - h
              //check if hd remains
              if(fdmg > 0 && d > 0) {
                if(d>fdmg) {
                  h += fdmg
                  fdmg = 0
                }
                else {
                  h = foe.hd[i]
                  fdmg -= foe.hd[i]
                }
              }
              return h
            })
          }
          //track retaliation
          let cdef = s === "Shoot" ? Athletics : Fight 
          //all the combatants fight back 
          dmg = E.foes.reduce((all,f)=>{
            f.hits.forEach((h,i) => {
              //check for damage - if alive - roll for attack
              if(h < f.hd[i] && CPXSkillRoll() + cdef - f.stats.atk < 7) {
                all += app.heroicDamage(f.stats.dmg)
              }
            })
            return all 
          },0)
          //check for complete
          complete = E.foes.reduce((done,f)=>{
              f.hits.forEach((h,i) => {
                if(done && h>=f.hd[i]) done = true
                else done = false
              })
              return done
            },true)

          if(dmg > 0) txt = ", counter: "+dmg+" dmg"
        }
        else if(["Trap","Hazard"].includes(what)) {
          let diff = this.ruin.T
          win = '⇓'
          //check if they notice
          if(s==="Notice") { 
            if(R + skill - diff > 7) {
              E.skills = E.trap.skills
              win = '⇑'
            }
            //take damage if they don't notice
            else {
              dmg = app.heroicDamage(E.trap.dmg)
              complete = true
            }
          }
          else {
            complete = true
            //check for disable 
            if(R + skill - diff < 7) {
              dmg = app.heroicDamage(E.trap.dmg)
            }
            else win = '⇑';
          }

          if(dmg > 0) txt = ", "+dmg+" dmg"
        }
        else if(["Obstacle","Puzzle"].includes(what)) {
          let diff = this.ruin.T
          let O = E.obstacle
          win = '⇓'
          //check skill 
          if(R + skill - diff > 7) {
            win = '⇑'
            let fdmg = app.heroicDamage("1d6")
            O.hits += fdmg
          }
          //take damage
          else {
            dmg = app.heroicDamage(O.dmg)
            txt = ", taxing: "+dmg+" dmg"
          }

          if(O.hits >= O.hd) complete = true
        }

        //check for complete
        if(complete) {
          this.complete(E.rz)
          //give back 2 hp for heroic healing 
          let dHP = this.maxHP[apci] - HP[apci]
          if(dHP > 0) {
            if(dHP < 2) HP[apci] = this.maxHP[apci];
            else HP[apci] += 2;
          }
        }
        //take dmg
        HP[this.activePC] -= dmg
        //update state text 
        txt = win+" "+s+txt
        this.encounters[ei].state.push(txt)
      }
    }
  })

}

export {subUI}
