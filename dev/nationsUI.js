define(function(require) {
  const Vue = require("vue");

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
      mounted() {

      },
      computed: {
        nations () {
          let n = [];
          for(let x in Actives){
            let N = Actives[x];

            if(N.type == "organization" && N.parentID == ""){
              n.push(N);
            }
          }

          return n;
        }
      },
      methods: {
      }
    })

  }

})