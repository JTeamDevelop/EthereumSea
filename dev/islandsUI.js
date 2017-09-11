define(function(require) {
  const Vue = require("vue");

  const islandText = {
    "standard" : `<p>
      Countless islands float on the waterless sea of Ethereum.  Some islands are hundreds of miles across, 
      but the ethereum buoys them all like icebergs in traditional oceans.  Most islands are “normal” - 
      earth, dirt, with maybe some mountains, rivers, trees and even animals and people.  
      These standard islands vary in size from ten miles across to the largest which are over 1000 miles across.  
      And again like icebergs, these islands are usually bigger under the ethereum than above but few dare to live or 
      even travel to the underside because of the fear of the deep ethereum.  
    </p>`, 
    "water" : `<p>
      Amongst the largest “islands” on the ethereum are actually great lakes of water - 
      some fresh and others salt.  These seas help supply the other islands with much needed water and they
       often team with life that helps feed neighboring islands as well.  Many of the seas are only thin disks a
       few hundred feet thick but some can go much deeper merging with the ethereum somewhere in their black depths.   
    </p>`, 
    "cog" : `<p>
      The sea is full of strange and more curious things.  Perhaps the most curious are the great cog islands.  
      Like great cogs from an impossibly huge watch - or an even bigger machine - these islands are most often home to the mechanical Klik.  
      Cog’s often have little organic life because they are entirely comprised of metal.  
      Trees and plants cannot take root so no ecosystem can develop.  However, they are still full of activity and industry - 
      Klik establish forges, factories and laboratories, and use them as platforms to push tubes down into the deep ethereum to search for rare ether.  
    </p>`, 
    "wood" : `<p>
      The organic mirror of the cogs are the woods.  The ethereum algae is a plant that has adapted to growing while 
      floating on the ethereum itself.  It has fern like leaves allowing it to catch moisture and particles that 
      enables it to grow and survive.  It creates a great green carpet across swaths of the sea.  This algae forms a 
      basis for a wider  ecosystem that quickly develops.  Epiphytes find places grow and soon flowers plants and 
      more are growing until a great floating forest has developed on the open sea.  Animals inhabit the woods 
      within and without until these islands are teeming with life.
    </p>`, 
    "rock" : `<p>
      Rocks are just that - barren islands floating in the sea.  Usually small compared to the others, they often 
      support little or no life except those things using them as a momentary resting place.  The only time rocks 
      see activity is when dwarves are klik come to mine them for resources. 
    </p>`, 
    "ruin" : `<p>
      Some say the sea is old - older than any remember and ages of people and inhabitants have come before.  
      Most laugh at these tales, but occasionally ruins found floating in the sea hint that there may be truth 
      behind the lore.  Ruins resemble the hulks of ethereumships or even skyscrapers set free to drift in the 
      sea, but they are of a scale that dwarfs what is impossible by today's nations. 
    </p>`, 
    "star" : `<p>
      Stars fallen from the sky.  Naturally burning ether.  Stars are an enigma.  They are miles wide balls of 
      flame floating in the sea.  Too hot to get within a mile of, stars are a danger if the currents carry them 
      close to another island.  They provide light for miles and can often be used for navigation until the current 
      shifts or they simply burn out.  All stars have a finite life, just like the stars in the sky, but no star 
      in the sea has lasted longer than a couple of years.  Locals always gravitate to stars because when they do 
      go dark they always leave behind solid ether.   
    </p>`
  }

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
        types: ["standard", "water", "cog", "wood", "rock", "ruin", "star"],
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
      filters: {
        capitalize: function(value) {
          if (!value)
            return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
      },
      computed: {
        islandText () {
          return islandText;
        }
      },
      methods: {}
    })

  }

})
