let subUI = (app) => {

  Vue.component("swn-character-sheet",{
    template: '#swn-character',
    props: ['cid'],
    data : function() {
      return {
        loadId : "",
        id: "",
        name : "NAME",
        swnBackground : "",
        xp : 0,
        cpxLevel : 0,
        atk: 0,
        hp: [1,1],
        aspects : [],
        swnClasses : ["exp"],
        osrAttributes : [10,10,10,10,10,10],
        OSRAttributeNames : ["str","dex","con","int","wis","cha"],
        skills : {},
        showAddSkill : false,
        newSkill : "",
        cpxPowers : [],
        gear : [],
        swnGifts : [],
        showAllGifts : true
      }
    },
    mounted () {
      let V = this
      app.UI.modal.tick = setInterval(()=>{
        if(V.cpxLevel > 0) V.save()
      },5000)
    },
    computed : {
      allCharacters () { return app.characters.all },
      CPXPowerData () { return app.characters.CPXPowers }, 
      cpxSkills () { return app.characters.CPXSkills },
      swnClassData () { return app.characters.SWNClasses },
      classAbilities () {
        let T = this.titles
        
        return this.swnClasses.map((c,i) => {
          let C = app.characters.SWNClasses[c]
          return {
            id : c,
            title : T[i],
            name : C.name,
            ability : C.base + (T[i] === "Partial" ? C.partial : C.full) + (T[i] === "Heroic" ? C.heroic : ""),
            gifts : C.hasOwnProperty("gifts") ? C.gifts : null
          }
        })
      },
      classGifts () {
        let G = this.classAbilities.reduce((all,c)=>{
          if(c.gifts) {
            all[c.id] = {
              name : c.name,
              gifts : c.gifts
            }
          }
          return all
        },{})

        let l = Object.keys(G).length

        return l > 0 ? G : null
      },
      titles () {
        if(this.swnClasses.length === 0) return [""]
        return [["Heroic"],["Full","Partial"],["Partial","Partial","Partial"]][this.swnClasses.length-1]
      },
      attributeBonus () {
        return this.osrAttributes.map(v => {
          if(v === 3) return -2;
          else if(v <= 7) return -1;
          else if(v <= 13) return 0;
          else if(v <= 17) return 1;
          else return 2;
        })
      }
    },
    methods : {
      aboutAspects () {
        app.notify({
          type: "info",
          h: "Aspects",
          text: "An Aspect is the combination of a Talent and a Flaw: for each pick an Approach, CPX Color, or 2 Skills."
        })
      },
      close () {
        this.save()
        this.id = ""
        this.cpxLevel = 0
      },
      newChar () {
        let C = app.characters.factory()
        this.loadId = C.id 
        this.load()
      },
      load() {
        //have to stringify or the load overwrites
        let C = JSON.parse(JSON.stringify(app.characters.all[this.loadId]))
        let base = JSON.parse(JSON.stringify(app.characters.coreData))
        //load all the data from the character
        for(let x in base){
          //load data to UI
          if(C[x]) this[x] = C[x];          
          //load from base
          else this[x] = base[x];
        }
        this.id = this.loadId
      },
      save() {
        if(this.id.length===0) return
        let C = JSON.parse(JSON.stringify(app.characters.all[this.id]))
        let base = JSON.parse(JSON.stringify(app.characters.coreData))
        //save all the data from the character
        for(let x in base){
          if(this[x]) C[x] = this[x];
        }
        //have to stringify or the load overwrites
        app.characters.all[this.id] = JSON.parse(JSON.stringify(C))
      },
      //add or remove a gift 
      editGift(c,id) {  
        let gid = c+"."+id
        let i = this.swnGifts.indexOf(gid)
        if(i === -1) this.swnGifts.push(gid);
        else this.swnGifts.splice(i,1);
      },
      addSkill() {
        Vue.set(this.skills,this.newSkill,0)
        this.newSkill = ""
        this.showAddSkill = false
      },
      rmSkill (id) { 
        let S = Object.assign({},this.skills)
        delete S[id]
         
        this.skills = Object.assign({},S)
      },
      addGear () {
        this.gear.push({
          w: "wp",  //what
          n : "", //name
          b: "",  //bonus
          e : "", //effect
          r : 0,  //range
          s : ""  //special
        })
      }
    }
  })

}

export {subUI}
