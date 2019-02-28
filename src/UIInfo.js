let subUI = (app) => {

  Vue.component("info-ui", {
    template: '#info-ui',
    data: function() {
      return {}
    },
    mounted () {
      //app.UI.info = this
    },
    methods : {
      makeRuin () {
        app.ruins.active = app.ruins.random()
        //then change modal
        $('#ui-modal').modal('show')
        Vue.nextTick(()=>{
          app.UI.modal.currentComponent = "ruin-modal"
        })       
      },
      showCharacter () {
        //show 
        app.UI.modal.currentComponent = "swn-character-sheet"
        $('#ui-modal').modal('show')
      },
      showPeople () {
        //show 
        app.UI.modal.currentComponent = "outlands-people"
        $('#ui-modal').modal('show')
      },
      showFactions () {
        //show 
        app.UI.modal.currentComponent = "outlands-factions"
        $('#ui-modal').modal('show')
      },
      showColorInfo () {
        app.UI.modal.currentComponent = "cpx-colors-info"
        $('#ui-modal').modal('show')
      }
    }
  })

}

export {subUI}
