let subUI = (app) => {

  Vue.component("outlands-factions",{
    template: '#outlands-factions',
    data : function() {
      return {
        type : 0
      }
    },
    mounted () {
    },
    computed : {
      allFactions () { 
        let all = []

        for(let x in app.factions.all ){
            let F = app.factions._current[x]
            all.push(F)
        }
        
        return all
      },
      claims () {
        return this.allFactions.map(f => f.claims.map(c=> c.name))
      }
    },
    methods : {
      filtered (type) {
        let all = this.allFactions
        if(type === 0) all = all.filter(f => !f.isTrouble && !f.isAncient)
        if(type === 1) all = all.filter(f => f.isTrouble)
        if(type === 2) all = all.filter(f => f.isAncient)

        return all.sort((a,b) => { 
          return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
        }) 
      },
    }
  })

}

export {subUI}
