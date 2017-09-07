define(function(require) {

  return (App)=>{
    const orgMaker = require("organization")(App);
    let Actives = App.Actives;

    const data = {
      "0x829bd824b016326a401d083b33d092293333a830": {
        color: "aqua"
      },
      "0xea674fdde714fd979de3edf0f56aa9716b898ec8": {
        color: "lime"
      },
      "0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5": {
        color: "gold"
      },
      "0x1e9939daaad6924ad004c2560e90804164900341": {
        color: "orange"
      },
      "0xb2930b35844a230f00e51431acae96fe543a0347": {
        color: "teal"
      }
    }

    return data;
  }
})
