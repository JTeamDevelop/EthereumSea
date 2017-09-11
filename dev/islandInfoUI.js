define(function(require) {
  const Vue = require("vue");

  return (App)=>{
    const Data = App.Data;
    let Actives = App.Actives;

    //creates the VUE js instance
    return new Vue({
      el: '#islandInfo',
      data: {
        show: {
          main: false
        },
        id: ''
      },
      mounted() {
      },
      filters: {
        capitalize: function(value) {
          if (!value)
            return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
      },
      computed: {
        island () {
          return Actives[this.id];
        },
        type () {
          return this.island.class.length == 0 ? "standard" : this.island.class[0];
        },
        d () {
          return this.island.r*2*10;
        },
        nationNames () {
          let n = this.island.nations.map((n)=>{ return n.name; })
          s = this.island.states.map((s)=>{ return s.parent.name; })
          return n.concat(s);
        }
      },
      methods: {}
    })

  }

})
