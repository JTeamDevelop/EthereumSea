define(function(require) {
  const Vue = require("vue")
    , //character pool
  pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  return (App)=>{

    //creates the VUE js instance
    let UI = new Vue({
      el: '#app',
      data: {
        eBlock: 0,
        nTX: 0,
        txt: '',
        t: 0,
        start: 0,
        observed:0,
        gameID: ""
      },
      mounted() {

      },
      computed: {
        savedGames () {
          return App.savedGames;
        },
        nationsUI () { return App.nationsUI; }
      },
      methods: {
        saveGame(){
          App.save();
        },
        newGame(){
          App.newGame();
        },
        load(id){
          App.gameID = id;
          localStorage.setItem("gameID",id);
          App.load();
        },
        move(){},
        zoom(){}
      }
    })

    App.nationsUI = require("nationsUI")(App);

    return UI;

  }
})
