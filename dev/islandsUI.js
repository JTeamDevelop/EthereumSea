define(function(require) {
  const Vue = require("vue");

  return (App)=>{
    const Data = App.Data;
    let Actives = App.Actives;

    //creates the VUE js instance
    return new Vue({
      el: '#islands',
      data: {
        show: {
          main: false
        },
        types: ["standard", "water", "cog", "rock", "ruin", "wood", "star"],
        styles: {
          "standard": {
            "border": "2px solid black"
          },
          "water": {
            "border": "2px solid blue"
          },
          "cog": {
            "border": "3px dotted black"
          },
          "rock": {
            "border": "2px solid peru"
          },
          "ruin": {
            "border": "2px dashed DarkSlateBlue"
          },
          "wood": {
            "border": "2px solid green"
          },
          "star": {
            "border": "2px solid red"
          }
        }
      },
      mounted() {
      },
      computed: {},
      methods: {}
    })

  }

})
