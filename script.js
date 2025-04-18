import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// SCENA, CAMERA E RENDERER
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CONTROLLI DI NAVIGAZIONE (mouse)
const controls = new OrbitControls(camera, renderer.domElement);

// LUCE
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// ARRAY DI NODI
const nodes = [];
const nodeGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0x44ccff });

for (let i = 0; i < 10; i++) {
  const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
  node.position.set(
    Math.random() * 10 - 5,
    Math.random() * 10 - 5,
    Math.random() * 10 - 5
  );
  scene.add(node);
  nodes.push(node);
}

// RAYCASTER PER INTERAZIONE
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let INTERSECTED = null;

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', onMouseMove, false);

// ANIMAZIONE
function animate() {
  requestAnimationFrame(animate);

  // Raycasting per effetto "hover"
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(nodes);

  nodes.forEach(node => {
    node.material.emissive.setHex(0x000000); // reset glow
    node.scale.set(1, 1, 1); // reset scala
  });

  if (intersects.length > 0) {
    INTERSECTED = intersects[0].object;
    INTERSECTED.material.emissive.setHex(0x4488ff); // effetto "glow"
    INTERSECTED.scale.set(1.2, 1.2, 1.2); // effetto "zoom"
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();

// ADATTAMENTO A RIDIMENSIONAMENTO FINESTRA
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
