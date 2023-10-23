import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';

const monkeyUrl = new URL('../assets/bmw.glb', import.meta.url);
// const OBJ = new URL('../assets/me/sh0.obj', import.meta.url);
// const MTL = new URL('../test1/material0.mtl', import.meta.url);

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xccccff);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

const directionalLight1 = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight1);
directionalLight1.position.set(30, 50, 0);
directionalLight1.castShadow = true;
directionalLight1.shadow.camera.bottom = -12;

const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight2);
directionalLight2.position.set(0, -30, 0);
directionalLight2.castShadow = true;
directionalLight2.shadow.camera.bottom = -12;

import moonImg from '../img/diffuseMap_0.png';
const moonTexture = new THREE.TextureLoader().load(moonImg);

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture
    })
);
scene.add(moon);
moon.position.set(-5, 0, 0);

const assetLoader = new GLTFLoader();

// const newMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
assetLoader.load(monkeyUrl.href, function(gltf) {
    const model = gltf.scene;
    model.position.set(0, 10, 0);
    scene.add(model);
    // model.traverse((o) => {
    //     if (o.isMesh) o.material = newMaterial;
    //   });
}, undefined, function(error){
    console.error(error);
});

// OBJ
// const mtlLoader = new MTLLoader();
// mtlLoader.load(MTL.href, function(materials)
// {
//     materials.preload();
    // const objLoader = new OBJLoader();
    // objLoader.setMaterials(materials);
    // objLoader.load('mesh0.obj', function(object)
    // {    
    //     const face = object;
    //     scene.add(face);
    //     renderer.render(scene, camera);
    //     face.position.set(0, 0, 0);
    // },(xhr) => {
    //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    // },
    // (error) => {
    //     console.log('An error happened')
    // });
// });


function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}