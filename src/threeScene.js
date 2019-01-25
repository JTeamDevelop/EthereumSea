//import "../../src/OrbitControls.js"

let glTest = ()=>{
  let tc = document.createElement('canvas')
  return tc.getContext("webgl") || tc.getContext("experimental-webgl")
}

let vertexShader = `
void main() {
  gl_Position = vec4( position, 1.0 );
}
`

let fragmentShader = `
#define HASHSCALE3 vec3(443.897, 441.423, 437.195)

uniform vec2 u_resolution;
uniform float u_time;

///  2 out, 2 in...
vec2 hash22(vec2 p)
{
	vec3 p3 = fract(vec3(p.xyx) * HASHSCALE3);
    p3 += dot(p3, p3.yzx+19.19);
    return fract((p3.xx+p3.yz)*p3.zy);

}

vec3 voronoi( in vec2 x ) {
    vec2 n = floor(x);
    vec2 f = fract(x);

    // first pass: regular voronoi
    vec2 mg, mr;
    float md = 8.0;
    for (int j= -1; j <= 1; j++) {
        for (int i= -1; i <= 1; i++) {
            vec2 g = vec2(float(i),float(j));
            vec2 o = hash22( n + g );

            vec2 r = g + o - f;
            float d = dot(r,r);

            if( d<md ) {
                md = d;
                mr = r;
                mg = g;
            }
        }
    }

    // second pass: distance to borders
    md = 8.0;
    for (int j= -2; j <= 2; j++) {
        for (int i= -2; i <= 2; i++) {
            vec2 g = mg + vec2(float(i),float(j));
            vec2 o = hash22( n + g );

            vec2 r = g + o - f;

            if ( dot(mr-r,mr-r)>0.00001 ) {
                md = min(md, dot( 0.5*(mr+r), normalize(r-mr) ));
            }
        }
    }
    return vec3(md, mr);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.);

    // Scale
    st *= 3.;
    vec3 c = voronoi(st);

    // borders
    color = mix( vec3(1.0), color, smoothstep( 0.01, 0.02, c.x ) );
    // feature points
    float dd = length( c.yz );
    color += vec3(1.)*(1.0-smoothstep( 0.0, 0.04, dd));

    gl_FragColor = vec4(color,.1);
}
`

function threeScene(app) {
  if (!glTest())
    return null

  var container;
  var camera, scene, renderer;
  var uniforms;

  init();
  animate();

  function init() {
    container = document.getElementById('container');

    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry(2,2);

    uniforms = {
      u_time: {
        type: "f",
        value: 1.0
      },
      u_resolution: {
        type: "v2",
        value: new THREE.Vector2()
      },
      u_mouse: {
        type: "v2",
        value: new THREE.Vector2()
      }
    };

    var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });

    var mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    document.onmousemove = function(e) {
      uniforms.u_mouse.value.x = e.pageX
      uniforms.u_mouse.value.y = e.pageY
    }
  }

  function onWindowResize(event) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    uniforms.u_time.value += 0.05;
    renderer.render(scene, camera);
  }

}

export {threeScene}
