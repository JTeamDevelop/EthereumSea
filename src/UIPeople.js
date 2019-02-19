let subUI = (app) => {

  Vue.component("outlands-people",{
    template: '#outlands-people',
    data : function() {
      return {
      }
    },
    mounted () {
    },
    computed : {
      allPeople () { 
        let all = []

        for(let x in app.people.all ){
            let P = app.people.generate(app.people.all[x].id)
            P.name = app.people.name(P)
            all.push(P)
        }

        return all
      },
      factions () {
          let allF = this.allPeople.map(p => {
              let F = [], cf;
              for(let x in app.factions._current){
                  cf = app.factions._current[x]
                  if(cf._people._raw.map(p=>p.id).includes(p.id)) F.push(cf)
              }
              return F
          })
          return allF
      },
      factionNames () { return this.factions.map(all => all.map(f=> f.name)) }
    },
    methods : {}
  })

}

export {subUI}
