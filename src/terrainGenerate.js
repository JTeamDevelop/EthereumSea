importScripts('../lib/priority-queue.min.js');
//Based on https://github.com/mewo2/terrain
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.TerrainGenerate = factory());
}(this, (function() {
  'use strict';

  //set the random 
  let RNG = Math;
  const setRandom = (R)=>{
    RNG = R;
  }

  function runif(lo, hi) {
    return lo + RNG.random() * (hi - lo);
  }

  var rnorm = (function() {
    var z2 = null;
    function rnorm() {
      if (z2 != null) {
        var tmp = z2;
        z2 = null;
        return tmp;
      }
      var x1 = 0;
      var x2 = 0;
      var w = 2.0;
      while (w >= 1) {
        x1 = runif(-1, 1);
        x2 = runif(-1, 1);
        w = x1 * x1 + x2 * x2;
      }
      w = Math.sqrt(-2 * Math.log(w) / w);
      z2 = x2 * w;
      return x1 * w;
    }
    return rnorm;
  }
  )();

  function randomVector(scale) {
    return [scale * rnorm(), scale * rnorm()];
  }

  var defaultExtent = {
    width: 1,
    height: 1
  };

  function generatePoints(n, extent) {
    extent = extent || defaultExtent;
    var pts = [];
    for (var i = 0; i < n; i++) {
      pts.push([(RNG.random() - 0.5) * extent.width, (RNG.random() - 0.5) * extent.height]);
    }
    return pts;
  }

  function centroid(pts) {
    var x = 0;
    var y = 0;
    for (var i = 0; i < pts.length; i++) {
      x += pts[i][0];
      y += pts[i][1];
    }
    return [x / pts.length, y / pts.length];
  }

  function improvePoints(pts, n, extent) {
    n = n || 1;
    extent = extent || defaultExtent;
    for (var i = 0; i < n; i++) {
      pts = voronoi(pts, extent).polygons(pts).map(centroid);
    }
    return pts;
  }

  function generateGoodPoints(n, extent) {
    extent = extent || defaultExtent;
    var pts = generatePoints(n, extent);
    pts = pts.sort(function(a, b) {
      return a[0] - b[0];
    });
    return improvePoints(pts, 1, extent);
  }

  function voronoi(pts, extent) {
    extent = extent || defaultExtent;
    var w = extent.width / 2;
    var h = extent.height / 2;
    return d3.voronoi().extent([[-w, -h], [w, h]])(pts);
  }

  function makeMesh(pts, extent) {
    extent = extent || defaultExtent;
    var vor = voronoi(pts, extent);
    var vxs = [];
    var vxids = {};
    var adj = [];
    var edges = [];
    var tris = [];
    for (var i = 0; i < vor.edges.length; i++) {
      var e = vor.edges[i];
      if (e == undefined)
        continue;
      var e0 = vxids[e[0]];
      var e1 = vxids[e[1]];
      if (e0 == undefined) {
        e0 = vxs.length;
        vxids[e[0]] = e0;
        vxs.push(e[0]);
      }
      if (e1 == undefined) {
        e1 = vxs.length;
        vxids[e[1]] = e1;
        vxs.push(e[1]);
      }
      adj[e0] = adj[e0] || [];
      adj[e0].push(e1);
      adj[e1] = adj[e1] || [];
      adj[e1].push(e0);
      edges.push([e0, e1, e.left, e.right]);
      tris[e0] = tris[e0] || [];
      if (!tris[e0].includes(e.left))
        tris[e0].push(e.left);
      if (e.right && !tris[e0].includes(e.right))
        tris[e0].push(e.right);
      tris[e1] = tris[e1] || [];
      if (!tris[e1].includes(e.left))
        tris[e1].push(e.left);
      if (e.right && !tris[e1].includes(e.right))
        tris[e1].push(e.right);
    }

    var mesh = {
      pts: pts,
      vor: vor,
      vxs: vxs,
      adj: adj,
      tris: tris,
      edges: edges,
      extent: extent
    }
    mesh.map = function(f) {
      var mapped = vxs.map(f);
      mapped.mesh = mesh;
      return mapped;
    }
    return mesh;
  }

  function generateGoodMesh(n, extent) {
    extent = extent || defaultExtent;
    var pts = generateGoodPoints(n, extent);
    return makeMesh(pts, extent);
  }
  function isedge(mesh, i) {
    return (mesh.adj[i].length < 3);
  }

  function isnearedge(mesh, i) {
    var x = mesh.vxs[i][0];
    var y = mesh.vxs[i][1];
    var w = mesh.extent.width;
    var h = mesh.extent.height;
    return x < -0.45 * w || x > 0.45 * w || y < -0.45 * h || y > 0.45 * h;
  }

  function neighbours(mesh, i) {
    var onbs = mesh.adj[i];
    var nbs = [];
    for (var i = 0; i < onbs.length; i++) {
      nbs.push(onbs[i]);
    }
    return nbs;
  }

  function distance(mesh, i, j) {
    var p = mesh.vxs[i];
    var q = mesh.vxs[j];
    return Math.sqrt((p[0] - q[0]) * (p[0] - q[0]) + (p[1] - q[1]) * (p[1] - q[1]));
  }

  function quantile(h, q) {
    var sortedh = [];
    for (var i = 0; i < h.length; i++) {
      sortedh[i] = h[i];
    }
    sortedh.sort(d3.ascending);
    return d3.quantile(sortedh, q);
  }

  function zero(mesh) {
    var z = [];
    for (var i = 0; i < mesh.vxs.length; i++) {
      z[i] = 0;
    }
    z.mesh = mesh;
    return z;
  }

  function slope(mesh, direction) {
    return mesh.map(function(x) {
      return x[0] * direction[0] + x[1] * direction[1];
    });
  }

  function cone(mesh, slope) {
    return mesh.map(function(x) {
      return Math.pow(x[0] * x[0] + x[1] * x[1], 0.5) * slope;
    });
  }

  function map(h, f) {
    var newh = h.map(f);
    newh.mesh = h.mesh;
    return newh;
  }

  function normalize(h) {
    var lo = d3.min(h);
    var hi = d3.max(h);
    return map(h, function(x) {
      return (x - lo) / (hi - lo)
    });
  }

  function peaky(h) {
    return map(normalize(h), Math.sqrt);
  }

  function add() {
    var n = arguments[0].length;
    var newvals = zero(arguments[0].mesh);
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < arguments.length; j++) {
        newvals[i] += arguments[j][i];
      }
    }
    return newvals;
  }

  function mountains(mesh, n, r) {
    r = r || 0.05;
    var mounts = [];
    for (var i = 0; i < n; i++) {
      mounts.push([mesh.extent.width * (RNG.random() - 0.5), mesh.extent.height * (RNG.random() - 0.5)]);
    }
    var newvals = zero(mesh);
    for (var i = 0; i < mesh.vxs.length; i++) {
      var p = mesh.vxs[i];
      for (var j = 0; j < n; j++) {
        var m = mounts[j];
        newvals[i] += Math.pow(Math.exp(-((p[0] - m[0]) * (p[0] - m[0]) + (p[1] - m[1]) * (p[1] - m[1])) / (2 * r * r)), 2);
      }
    }
    return newvals;
  }

  function relax(h) {
    var newh = zero(h.mesh);
    for (var i = 0; i < h.length; i++) {
      var nbs = neighbours(h.mesh, i);
      if (nbs.length < 3) {
        newh[i] = 0;
        continue;
      }
      newh[i] = d3.mean(nbs.map(function(j) {
        return h[j]
      }));
    }
    return newh;
  }

  function downhill(h) {
    if (h.downhill)
      return h.downhill;
    function downfrom(i) {
      if (isedge(h.mesh, i))
        return -2;
      var best = -1;
      var besth = h[i];
      var nbs = neighbours(h.mesh, i);
      for (var j = 0; j < nbs.length; j++) {
        if (h[nbs[j]] < besth) {
          besth = h[nbs[j]];
          best = nbs[j];
        }
      }
      return best;
    }
    var downs = [];
    for (var i = 0; i < h.length; i++) {
      downs[i] = downfrom(i);
    }
    h.downhill = downs;
    return downs;
  }

  function findSinks(h) {
    var dh = downhill(h);
    var sinks = [];
    for (var i = 0; i < dh.length; i++) {
      var node = i;
      while (true) {
        if (isedge(h.mesh, node)) {
          sinks[i] = -2;
          break;
        }
        if (dh[node] == -1) {
          sinks[i] = node;
          break;
        }
        node = dh[node];
      }
    }
  }

  function fillSinks(h, epsilon) {
    epsilon = epsilon || 1e-5;
    var infinity = 999999;
    var newh = zero(h.mesh);
    for (var i = 0; i < h.length; i++) {
      if (isnearedge(h.mesh, i)) {
        newh[i] = h[i];
      } else {
        newh[i] = infinity;
      }
    }
    while (true) {
      var changed = false;
      for (var i = 0; i < h.length; i++) {
        if (newh[i] == h[i])
          continue;
        var nbs = neighbours(h.mesh, i);
        for (var j = 0; j < nbs.length; j++) {
          if (h[i] >= newh[nbs[j]] + epsilon) {
            newh[i] = h[i];
            changed = true;
            break;
          }
          var oh = newh[nbs[j]] + epsilon;
          if ((newh[i] > oh) && (oh > h[i])) {
            newh[i] = oh;
            changed = true;
          }
        }
      }
      if (!changed)
        return newh;
    }
  }

  function getFlux(h) {
    var dh = downhill(h);
    var idxs = [];
    var flux = zero(h.mesh);
    for (var i = 0; i < h.length; i++) {
      idxs[i] = i;
      flux[i] = 1 / h.length;
    }
    idxs.sort(function(a, b) {
      return h[b] - h[a];
    });
    for (var i = 0; i < h.length; i++) {
      var j = idxs[i];
      if (dh[j] >= 0) {
        flux[dh[j]] += flux[j];
      }
    }
    return flux;
  }

  function getSlope(h) {
    var dh = downhill(h);
    var slope = zero(h.mesh);
    for (var i = 0; i < h.length; i++) {
      var s = trislope(h, i);
      slope[i] = Math.sqrt(s[0] * s[0] + s[1] * s[1]);
      continue;
      if (dh[i] < 0) {
        slope[i] = 0;
      } else {
        slope[i] = (h[i] - h[dh[i]]) / distance(h.mesh, i, dh[i]);
      }
    }
    return slope;
  }

  function erosionRate(h) {
    var flux = getFlux(h);
    var slope = getSlope(h);
    var newh = zero(h.mesh);
    for (var i = 0; i < h.length; i++) {
      var river = Math.sqrt(flux[i]) * slope[i];
      var creep = slope[i] * slope[i];
      var total = 1000 * river + creep;
      total = total > 200 ? 200 : total;
      newh[i] = total;
    }
    return newh;
  }

  function erode(h, amount) {
    var er = erosionRate(h);
    var newh = zero(h.mesh);
    var maxr = d3.max(er);
    for (var i = 0; i < h.length; i++) {
      newh[i] = h[i] - amount * (er[i] / maxr);
    }
    return newh;
  }

  function doErosion(h, amount, n) {
    n = n || 1;
    h = fillSinks(h);
    for (var i = 0; i < n; i++) {
      h = erode(h, amount);
      h = fillSinks(h);
    }
    return h;
  }

  function setSeaLevel(h, q) {
    var newh = zero(h.mesh);
    var delta = quantile(h, q);
    for (var i = 0; i < h.length; i++) {
      newh[i] = h[i] - delta;
    }
    return newh;
  }

  function cleanCoast(h, iters) {
    for (var iter = 0; iter < iters; iter++) {
      var changed = 0;
      var newh = zero(h.mesh);
      for (var i = 0; i < h.length; i++) {
        newh[i] = h[i];
        var nbs = neighbours(h.mesh, i);
        if (h[i] <= 0 || nbs.length != 3)
          continue;
        var count = 0;
        var best = -999999;
        for (var j = 0; j < nbs.length; j++) {
          if (h[nbs[j]] > 0) {
            count++;
          } else if (h[nbs[j]] > best) {
            best = h[nbs[j]];
          }
        }
        if (count > 1)
          continue;
        newh[i] = best / 2;
        changed++;
      }
      h = newh;
      newh = zero(h.mesh);
      for (var i = 0; i < h.length; i++) {
        newh[i] = h[i];
        var nbs = neighbours(h.mesh, i);
        if (h[i] > 0 || nbs.length != 3)
          continue;
        var count = 0;
        var best = 999999;
        for (var j = 0; j < nbs.length; j++) {
          if (h[nbs[j]] <= 0) {
            count++;
          } else if (h[nbs[j]] < best) {
            best = h[nbs[j]];
          }
        }
        if (count > 1)
          continue;
        newh[i] = best / 2;
        changed++;
      }
      h = newh;
    }
    return h;
  }

  function trislope(h, i) {
    var nbs = neighbours(h.mesh, i);
    if (nbs.length != 3)
      return [0, 0];
    var p0 = h.mesh.vxs[nbs[0]];
    var p1 = h.mesh.vxs[nbs[1]];
    var p2 = h.mesh.vxs[nbs[2]];

    var x1 = p1[0] - p0[0];
    var x2 = p2[0] - p0[0];
    var y1 = p1[1] - p0[1];
    var y2 = p2[1] - p0[1];

    var det = x1 * y2 - x2 * y1;
    var h1 = h[nbs[1]] - h[nbs[0]];
    var h2 = h[nbs[2]] - h[nbs[0]];

    return [(y2 * h1 - y1 * h2) / det, (-x2 * h1 + x1 * h2) / det];
  }

  function cityScore(h, cities) {
    var score = map(getFlux(h), Math.sqrt);
    for (var i = 0; i < h.length; i++) {
      if (h[i] <= 0 || isnearedge(h.mesh, i)) {
        score[i] = -999999;
        continue;
      }
      score[i] += 0.01 / (1e-9 + Math.abs(h.mesh.vxs[i][0]) - h.mesh.extent.width / 2)
      score[i] += 0.01 / (1e-9 + Math.abs(h.mesh.vxs[i][1]) - h.mesh.extent.height / 2)
      for (var j = 0; j < cities.length; j++) {
        score[i] -= 0.02 / (distance(h.mesh, cities[j], i) + 1e-9);
      }
    }
    return score;
  }
  function placeCity(render) {
    render.cities = render.cities || [];
    var score = cityScore(render.h, render.cities);
    var newcity = d3.scan(score, d3.descending);
    render.cities.push(newcity);
  }

  function placeCities(render) {
    var params = render.params;
    var h = render.h;
    var n = params.ncities;
    for (var i = 0; i < n; i++) {
      placeCity(render);
    }
  }

  function TerrainGenerate(params) {
    params.extent = defaultExtent

    //initialize random before points
    setRandom(new Chance(params.seed))
    var mesh = generateGoodMesh(params.npts, params.extent);
    let h = null

    //initialize random again - creates uniform map no mater the number of points
    setRandom(new Chance(params.seed))
    //determine type 
    let type = RNG.weighted(["continent", "archipelago", "islands"], [2, 5, 3])
    params.generator = params.generator || type

    if (params.generator == "coast") {
      h = add(slope(mesh, randomVector(4)), cone(mesh, runif(-1, -1)), mountains(mesh, 50));

      for (var i = 0; i < 10; i++) {
        h = relax(h);
      }
      h = peaky(h);
      h = doErosion(h, runif(0, 0.1), 5);
      h = setSeaLevel(h, runif(0.2, 0.6));
      h = fillSinks(h);
    } else {
      h = add(mountains(mesh, 50))
      for (var i = 0; i < 10; i++) {
        h = relax(h);
      }
      h = peaky(h);
      h = doErosion(h, runif(0, 0.1), 5);

      if (params.generator == "continent")
        h = setSeaLevel(h, runif(0.2, 0.6));
      else if (params.generator == "archipelago")
        h = setSeaLevel(h, runif(0.65, 0.8));
      else if (params.generator == "islands")
        h = setSeaLevel(h, runif(0.9, 1));

      h = fillSinks(h);
    }

    h = cleanCoast(h, 3);

    //establish render map 
    var render = {
        params: params,
        cities : []
    };
    render.h = h;
    //place cities 
    if(params.npts > 6000) placeCities(render);
    //kill the mesh map function
    render.h.mesh.map = null

    return render;
  }

  return TerrainGenerate

}
)));
