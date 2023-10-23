// import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

function init (geometry) { 
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./test1/diffuseMap_0.png'),
    envMap: new THREE.TextureLoader().load('./test1/envMap_0.png'),
    roughnessMap:  new THREE.TextureLoader().load('./test1/roughnessMap_0.png'),
    metalnessMap: new THREE.TextureLoader().load('./test1/specularMap_0.png')
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  mesh.scale.set(0.01, 0.01, 0.01);
  mesh.position.set(0, 0, -40);
  mesh.rotation.z = -1 * Math.PI;
  // mesh.scale.setSize(0.000001);


  const sunlight = new THREE.DirectionalLight(0xffffff);
  sunlight.position.set(0, 0, -100);
  scene.add(sunlight);

  const filllight = new THREE.DirectionalLight(0x88ccff);
  filllight.position.x = 100;
  filllight.position.y = -200;
  scene.add(filllight);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

const loader = new OBJLoader();
loader.load("./mesh0.obj", (obj) => {
  init(obj.children[0].geometry) 
});

// const loader2 = new OBJLoader();
// loader2.load("./monkey.obj", (obj) => init(obj.children[0].geometry) );

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);