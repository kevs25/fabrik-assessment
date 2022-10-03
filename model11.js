import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'; 
import background from './images/background.jpg';
const model1 = new URL('./3D models/P11.glb', import.meta.url);

const renderer = new THREE.WebGL1Renderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
const axeshelper = new THREE.AxesHelper();
scene.add(axeshelper);

camera.position.set(-40, 30, 30);
orbit.update();

const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(ambientLight);


const spotLight = new THREE.SpotLight(0xFFFFFF,2);
scene.add(spotLight);

spotLight.position.set(-120, -100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.5;

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(background); 

const loader = new GLTFLoader();
loader.load(model1.href, function(glb){
    var model = glb.scene;
    model.position.set(0, -1, 0);
    model.scale.set(82,82,82);
    model.rotation.y = -0.5 * Math.PI
    scene.add(model);
}, undefined, function(error) {
    console.error(error);
});
function animate () {
    
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})