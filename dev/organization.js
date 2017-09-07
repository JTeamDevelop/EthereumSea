define(function(require) {

  return (App)=>{
    let Actives = App.Actives;

    class Organization {
      constructor(properties) {
        properties = properties || {};

        this._id = properties.id || App.id();
        this._type = 'organization';
        this._name = properties.name || App.newName();
        this._color = properties.color || "#" + App.makeColor(this._id);
        this._level = properties.level || 1;
        this._stats = properties.stats || [];
        this._parentID = properties.parentID || '';
        this._childIDs = properties.childIDs || [];

        //add to parent on creation
        if (this._parentID.length > 0) {
          this.parent.addChild(this);
        }

        //for stats
        this._focus = [];
        //if no stats on creation add random focus
        if (this._stats.length == 0) {
          this._focus = chance.shuffle([0, 1, 2, 3, 4, 5]);
        }
      }
      save() {
        return {
          id: this.id,
          type: this.type,
          name: this._name,
          color: this.color,
          level: this._level,
          stats: this._stats,
          parentID: this.parentID,
          childIDs: this._childIDs
        }
      }
      get id() {
        return this._id;
      }
      get type() {
        return this._type;
      }
      get name() {
        return this._name;
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
