let subUI = (app) => {

  Vue.component("swn-character-sheet",{
    template: '#swn-character',
    data : function() {
      return {
        loadId : "",
        id: "",
        name : "NAME",
        swnBackground : "",
        xp : 0,
        atk: 0,
        hp: [1,1],
        aspects : [],
        aspectCat : {"a":"Approach","s":"Skill","c":"Color"},
        aspectCounts : {"a":1,"s":2,"c":1},
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
      skillPoints () { 
        let p = 0
        for(let x in this.skills) p += Number(this.skills[x])
        return p 
      },
      level () { return this.skillPoints < 5 ? 1 : Math.floor(this.skillPoints/5)},
      maxHP () {
          return Math.round(this.level*3.5)
      },
      aspectList () {
          return app.approaches.map(a => ["a",a])
            .concat(app.CPX.skillArray.map(s => ["s",s]))
            .concat(app.tagArray)
      },
      aspectTypes () { 
        let t = ["a","s","c"]
        return t.reduce((all,id) => {
            all = all.concat(t.map(id2 => id+id2))
            return all
        },[]) 
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
