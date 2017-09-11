define(function(require) {

  return (App)=>{
    const orgMaker = require("organization")(App);
    let Actives = App.Actives;

    //resources
    //["grain","vegtable","fruit","livestock","dairy","ore","textile","garments","lumber","lumber products","machinery","metal products","chemicals","ether"]

    //create a clas for every ethereum transaction from/to
    class Island {
      constructor(properties) {
        properties = properties || {};

        this._id = properties.id;
        this._seed = properties.seed || properties.id;
        this._name = properties.name || "";
        this._type = "island";
        this._class = properties.class || [];
        this._val = properties.val;
        this.x = properties.x || Math.random() * 100 - 50;
        this.y = properties.y || Math.random() * 100 - 50;
        this._core = properties.core || false;
        this._childIDs = properties.childIDs || [];

        if (this._core && this._childIDs.length == 0) {
          this.addOrg(orgMaker({
            level: 5,
            class: ["nation", "core"]
          }));
        }

        //generate a name based upon organization
        if (this._name.length == 0 && this.orgs.length > 0) {
          this._name = this.orgs[0].genIslandName();
        }

        //determine class/nature 
        if (this._class.length == 0) {
          //big islands are 50% time water
          if (this.val >= 100) {
            //take the first on 0x character 
            if (parseInt(this._seed[2], 16) > 7) {
              this._class.push("water");
            }
          } else {
            if (this.val < 1) {
              //%3 ruin
              if (parseInt(this._seed.slice(2, 4), 16) == 0) {
                this._class.push("ruin");
              }//if small ~50% rocks
              else if (parseInt(this._seed[2], 16) <= 7) {
                this._class.push("rock");
              }
              //%6 stars
              else if (parseInt(this._seed[2], 16) == 15) {
                this._class.push("star");
              }
            } else {
              //~10% cogs
              if (parseInt(this._seed[2], 16) < 2) {
                this._class.push("cog");
              }//10% wood
              else if (parseInt(this._seed[2], 16) < 4) {
                this._class.push("wood");
              }
              //18% water
              else if (parseInt(this._seed[2], 16) < 7) {
                this._class.push("water");
              }
            }
          }
        }
      }
      save() {
        return {
          id: this.id,
          seed: this._seed,
          type: this.type,
          name: this._name,
          class: this._class,
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
      get class() {
        return this._class;
      }
      get name() {
        return this._name;
      }
      get children() {
        return this._childIDs.map((id)=>(Actives[id]));
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

        if (this._val < 0.4)
          return this._val;

        let v = this._val < 1.3 ? this._val + 1.3 : this._val;
        return Math.log10(v) * 10;
      }
      //repulsion force - noise goes from -1 to 1
      f() {
        let nr = 5 + 20 * this.noise;
        return nr < 3 ? this.r + 3 : this.r + nr;
      }
      //noise
      get noise() {
        return App.force.noise3D(this.x / 14, this.y / 48, App.M / 12);
      }
      //temp
      get temp() {
        return App.temp.noise2D(this.x / 84, this.y / 84);
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
          return [i, Math.sqrt(dx * dx + dy * dy), n.orgs.length, n.r, n.class];
        }
        )//sort by distance - least to greatest
        .sort(function(a, b) {
          return a[1] - b[1];
        })
        //return list
        return d;
      }
      biggestNoOrg() {
        //closest nodes
        let C = this.closest()
          , s = App.simNodes()
          , R = [];

        //loop through closest
        C.forEach((c)=>{
          //check if the node has orgs - if no push
          if (c[1] != 0 && c[2] == 0 && !c[4].includes("fire") && !c[4].includes("water"))
            R.push(c);
        }
        )

        //sort based on size and distance - biggest to smallest
        R = R.sort(function(a, b) {
          return b[3] / b[1] - a[3] / a[1];
        }).map((c)=>{
          return s[c[0]];
        }
        )

        return R;
      }
      addOrg(org) {
        if (!this._childIDs.includes(org.id)) {
          //add ids
          this._childIDs.push(org.id);
          //if the only org - name the island
          if (this.orgs.length == 1) {
            this._name = org.genIslandName();
            //name t after the org if core
            if (this.core)
              this._name = org.name;
          }
        }
      }
      get orgs() {
        return this.children.filter((c)=>{
          return c.type == "organization";
        }
        );
      }
      get states() {
        return this.orgs.filter((o)=>{
          return o.class.includes("state");
        }
        );
      }
      get nations() {
        return this.orgs.filter((o)=>{
          return o.class.includes("nation");
        }
        );
      }
      get people() {
        let p = [];
        this.orgs.forEach((o)=>{
          p = p.concat(o.people.map((pi)=>{
            return pi[0];
          }
          ))
        }
        )
        return p
      }
    }

    return (id,val,properties)=>{
      let I = new Island(id,val,properties);
      Actives[I.id] = I;
      return Actives[I.id];
    }

  }
})
