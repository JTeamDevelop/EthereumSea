define(function(require) {

  return (App)=>{
    const orgMaker = require("organization")(App);
    let Actives = App.Actives;

    //create a clas for every ethereum transaction from/to
    class Island {
      constructor(properties) {
        properties = properties || {};

        this._id = properties.id;
        this._name = properties.name || App.newName();
        this._type = "island";
        this._val = properties.val;
        this.x = properties.x || Math.random() * 100 - 50;
        this.y = properties.y || Math.random() * 100 - 50;
        this._core = properties.core || false;
        this._childIDs = properties.childIDs || [];

        if (this._core && this._childIDs.length == 0) {
          this.addOrg(orgMaker());
        }
      }
      save() {
        return {
          id: this.id,
          type: this.type,
          name: this._name,
          val: this.val,
          x: this.x,
          y: this.y,
          core: this.core,
          childIDs: this._childIDs
        }
      }
      get id() {
        return this._id;
      }
      get type() {
        return this._type;
      }
      get name() { return this._name; }
      get children() {
        return this._childIDs.map((id)=>(Actives[id]));
      }
      get orgs() {
        return this.children.filter((c)=>{
          return c.type == "organization";
        }
        );
      }
      get color() {
        if (this.orgs.length == 0)
          return "#ddd";
        else
          return this.orgs[0].color;
      }
      get val() {
        return this._val;
      }
      get core() {
        return this._core;
      }
      get area() {
        return Math.PI * this.r * this.r * 100;
      }
      //this area is in pixels ~ 1 pixel = 10 miles
      get r() {
        if (this._val < 0)
          return 0;

        let v = this._val < 1.3 ? this._val + 1.3 : this._val;
        return Math.log10(v) * 10;
      }
      //repulsion force - noise goes from -1 to 1
      f() {
        let nr = 5 + 20 * this.noise;
        return nr < 3 ? this.r+3 : this.r+nr;
      }
      //noise
      get noise() {
        return App.force.noise3D(this.x / 14, this.y / 48, App.M  );
      }
      closest() {
        let N = this
          , //pull all nodes
        sn = App.simNodes()
          , //determine distances 
        d = sn.map((n,i)=>{
          let dx = N.x - n.x
            , dy = N.y - n.y;
          //return index and distance
          return [i, Math.sqrt(dx * dx + dy * dy)];
        }
        )//sort by distance
        .sort(function(a, b) {
          return a[1] - b[1];
        })
        //return list
        return d;
      }
      closestNoOrg() {
        //pull all nodes
        let sn = App.simNodes()
          , //closest nodes
        C = this.closest()
          , R = [];

        //loop through closest
        C.forEach((c)=>{
          //check if the node has orgs - if no push
          if (sn[c[0]].orgs.length == 0)
            R.push(sn[c[0]]);
        }
        )

        return R;
      }
      addOrg(org) {
        if (!this._childIDs.includes(org.id)) {
            //add ids
          this._childIDs.push(org.id);         
        }
      }
    }

    return (id,val,properties)=>{
      let I = new Island(id,val,properties);
      Actives[I.id] = I;
      return Actives[I.id];
    }

  }
})
