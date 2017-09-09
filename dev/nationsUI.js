define(function(require) {
  const Vue = require("vue")
    , d3 = require("d3");

  return (App)=>{
    const Data = App.Data;
    let Actives = App.Actives;

    //creates the VUE js instance
    return new Vue({
      el: '#nations',
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
        nations() {
          let n = [];
          for (let x in Actives) {
            let N = Actives[x];

            if (N.type == "organization" && N.parentID == "") {
              n.push(N);
            }
          }

          return n;
        }
      },
      methods: {
        focus(id) {
          let I = Actives[id]
            , w = d3.select("svg").attr("width")
            , h = d3.select("svg").attr("height");

          App.zoom.translateTo(d3.select("g.islands"), I.x+w/2, I.y+h/2);
        }
      }
    })

  }

})
