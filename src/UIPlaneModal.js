let subUI = (app) => {

  Vue.component("outlands-plane-modal",{
    template: '#outlands-plane-modal',
    props: ['uid'],
    data : function() {
      return {
      }
    },
    mounted () {

    },
    computed : {
      plane () { return app.planes._current[this.uid] },
      cityNames () {
        let P = this.plane
        return d3.range(P.cities.length).map(i => P.names[i+1])
      },
      ruinNames () {
        let P = this.plane
        return d3.range(P.ruins.length).map(i => P.ancientNames[i+1])
      },
      //# of major ruins
      nmr () { return this.plane.nmr } 
    },
    methods : {
      enterRuin (i) {
        if(i >= this.nmr) return
        app.ruins.active = app.ruins.factory(this.plane,i)
        //then change modal
        app.UI.modal.currentComponent = "ruin-modal"
      }
    }
  })

}

export {subUI}
