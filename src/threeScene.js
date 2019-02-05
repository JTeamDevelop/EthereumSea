import "../lib/OrbitControls.js"

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

  var container, canvas;
  var camera, scene, renderer, controls, raycaster, mouse;

  function init() {
    container = document.getElementById('container');

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas = renderer.domElement
    container.appendChild(canvas);

    camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,2000);
    camera.position.set( 500, 500, 0 );

    controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.rotateSpeed = 0.08;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 2000;
    controls.maxPolarAngle = Math.PI / 2;

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', onDocumentMouseDown, false);
    window.addEventListener('tap', onDocumentMouseDown, false);
  }

  raycaster = new THREE.Raycaster(); // Needed for object intersection
  mouse = new THREE.Vector2(); //Needed for mouse coordinates

  function onDocumentMouseDown(event) {
    // Welcome to the exciting world of raycasting !
    // First let's get some mouse coordinates:
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // This is basically converting 2d coordinates to 3d Space:
    raycaster.setFromCamera(mouse, camera);
    // And checking if it intersects with an array object
    var intersects = raycaster.intersectObjects(scene.children);

    // does your cursor intersect the object on click ? 
    //console.log(intersects.length > 0 ? "yes" : "no");

    // And finally change the color:
    if (intersects.length > 0) {
      let data = intersects[0].object.userData
      //check for onclick
      if(data.onClick) data.onClick()       
    }
  }

  function onWindowResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate(time) {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  
  //start it 
  init();
  animate(0);

  app.camera = camera
  app.scene = scene
}

export {threeScene}
