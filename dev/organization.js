define(function(require) {

  return (App)=>{
    let Actives = App.Actives
      , Data = App.Data
      , People = App.Data.people;

    const peopleMaker = ()=>{
      //number of people types
      let n = App.chance.pickone([1, 1, 1, 1, 2])
        , p = [];

      if (n == 1) {
        p.push([App.chance.pickone(People).id, 1]);
      } else {
        let s = App.chance.integer({
          min: 55,
          max: 75
        }) / 100;
        p.push([App.chance.pickone(People).id, s], [App.chance.pickone(People).id, 1 - s]);
      }

      p.forEach((pi)=>{
        if (pi[0].includes("klik"))
          pi[0] = "klik";
        if (pi[0].includes("l'na"))
          pi[0] = "l'na";
      }
      )

      return p;
    }

    class Organization {
      constructor(properties) {
        properties = properties || {};

        this._id = properties.id || App.id();
        this._type = 'organization';
        this._class = properties.class || [];
        this._nameBase = properties.nameBase || App.chance.pickone(App.nameBases);
        this._name = properties.name || this.genIslandName();
        this._color = properties.color || "#" + App.makeColor(this._id);
        this._level = properties.level || 1;
        this._stats = properties.stats || [];
        this._parentID = properties.parentID || '';
        this._people = properties.people || peopleMaker();
        this._childIDs = properties.childIDs || [];
        //for stats
        this._stats = properties.stats || [];
        this._focus = properties.focus || [];

        //add to parent on creation
        if (this._parentID.length > 0) {
          this.parent.addChild(this);
          this._nameBase = this.parent._nameBase;
        }

        //if no focus add random 
        if (this._focus.length == 0) {
          this._focus = App.chance.shuffle([0, 1, 2, 3, 4, 5]);
        } else {
          let O = this;
          let fa = [0, 1, 2, 3, 4, 5].filter((el)=>{
            return !O._focus.includes(el);
          }
          )
          this._focus = this._focus.concat(App.chance.shuffle(fa));
        }
      }
      save() {
        return {
          id: this.id,
          type: this.type,
          class: this._class,
          name: this._name,
          color: this.color,
          level: this._level,
          stats: this._stats,
          people: this._people,
          parentID: this.parentID,
          childIDs: this._childIDs,
          nameBase: this._nameBase,
          focus: this._focus
        }
      }
      get id() {
        return this._id;
      }
      get type() {
        return this._type;
      }
      get class() {
        return this._class;
      }
      get name() {
        return this._name;
      }
      get people() {
        return this._people;
      }
      get focus() {
        return this._focus;
      }
      get peopleList() {
        return this._people.map((p)=>{
          let n = p[1] * 100;

          return p[0][0].toUpperCase() + p[0].slice(1) + ": " + n.toFixed(0) + "%"
        }
        );
      }
      genIslandName() {
        return App.nameGen[this._nameBase].generate();
      }
      get style() {
        return {
          "background-color": this.color
        }
      }
      get color() {
        if (this._parentID.length != 0)
          return this.parent.color;
        return this._color;
      }
      get parentID() {
        return this._parentID;
      }
      get parent() {
        if (this._parentID.length == 0)
          return '';
        return Actives[this._parentID];
      }
      get children() {
        return this._childIDs.map((id)=>(Actives[id]));
      }
      addChild(child) {
        if (!this._childIDs.includes(child.id)) {
          this._childIDs.push(child.id);
          child._parentID = this.id;
        }
      }
      get islands() {
        let I = [];
        for (let x in Actives) {
          if (Actives[x].type == "island") {
            //those belonging to this organization
            if (Actives[x]._childIDs.includes(this.id))
              I.push(Actives[x]);
            //find those belonging to children
            this._childIDs.forEach((id)=>{
              if (Actives[x]._childIDs.includes(id))
                I.push(Actives[x]);
            }
            )
          }
        }
        return I;
      }
      get islandNames() {
        return this.islands.map((I)=>{
          return I.name;
        }
        );
      }
    }

    return (properties)=>{
      var o = new Organization(properties);
      Actives[o.id] = o;
      return Actives[o.id];
    }

  }

})
