import "../../src/OrbitControls.js"

let glTest = ()=>{
  let tc = document.createElement('canvas')
  return tc.getContext("webgl") || tc.getContext("experimental-webgl")
}

function init(app) {
  if (!glTest())
    return null

  var scene = new THREE.Scene();
  scene.background = new THREE.Color("gray");
  let camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,2000);
  camera.position.set(800, 400, 0);

  //var canvas = document.createElement( 'canvas' );
  //var context = canvas.getContext( 'webgl2' );
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "output"
  document.body.appendChild(renderer.domElement);

  //controlls
  let controls = new THREE.OrbitControls(camera,renderer.domElement);
  controls.enableDamping = true;
  // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 1000;
  controls.maxPolarAngle = Math.PI / 2;

  var animate = function() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  app.scene = scene
  app.camera = camera

  renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var intersected;

  function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    let intersections = raycaster.intersectObjects(app.scene.children);

    var baseColor = 0x333333;
    var intersectColor = 0x00D66B;

    if (intersections.length > 0) {
      console.log(intersections[0])
    } 
  }

}

export {init}
