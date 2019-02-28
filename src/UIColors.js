let subUI = (app) => {

  Vue.component("cpx-colors-info", {
    template: '#cpx-color-modal',
    data: function() {
      return {
        columns : {
          c: "Color", 
          m: "Magic School", 
          p : "Psionic Discipline", 
          e: "Element", 
          l : "Lifeform", 
          d: "Domain"
        }
      }
    },
    mounted () {
    },
    computed : {
      colors () { return app.CPX.colors }
    },
    methods : {

    }
  })

}

export {subUI}
