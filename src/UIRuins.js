let subUI = (app)=>{

  Vue.component("ruin-modal", {
    template: '#ruin-modal-ui',
    data: function() {
      return {
        twoD: true
      }
    },
    mounted() {
      //display it 
      Vue.nextTick(()=>{
        app.ruins.display()
      })
    },
    computed: {
      ruin () { return app.ruins.active }
    },
    methods: {}
  })

}

export {subUI}
