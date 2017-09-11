define(function(require) {
  const Vue = require("vue");

  return (App)=>{
    const Data = App.Data;
    let Actives = App.Actives;

    //creates the VUE js instance
    return new Vue({
      el: '#sea',
      data: {
        show: {
          main: false
        },
      },
      mounted() {
      },
      computed: {},
      methods: {}
    })

  }

})
