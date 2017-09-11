define(function(require) {
  const Vue = require("vue")
    , d3 = require("d3");

  return (App)=>{
    const Data = App.Data;
    let Actives = App.Actives;

    //creates the VUE js instance
    return new Vue({
      el: '#people',
      data: {
        show: {
          main: false
        }
      },
      mounted() {},
      filters: {
        capitalize: function(value) {
          if (!value)
            return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
      },
      computed: {
        professions() {
          return App.Data.professions;
        },
        people() {
          return Data.people;
        }
      },
      methods: {
      }
    })

  }

})
