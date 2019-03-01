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
        cids : [],
        encounters : [],
        activePC : -1
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
      activeCharacters () { return this.cids.map(id => this.allCharacters[id]) }
    },
    methods: {
      addC() {
        if(!this.cids.includes(this.loadCId)) this.cids.push(this.loadCId)
      },
      hit () {

      },
      skillRoll (s,ei) {
        if(this.activePC === -1) return

        let c = this.activeCharacters[this.activePC]
        let skill = c.skills[s] ? Number(c.skills[s]) : 0 

        let R = CPXSkillRoll()

        if(ei > -1) {
          this.encounters[ei].state.push(s+", "+(skill+R))
        }
      }
    }
  })

}

export {subUI}
