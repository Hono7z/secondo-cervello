import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

// Glow effect
const createNode = (color, label) => {
  const geometry = new THREE.SphereGeometry(1.2, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color });
  const sphere = new THREE.Mesh(geometry, material);

  // Glow
  const glowMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2 });
  const glow = new THREE.Mesh(new THREE.SphereGeometry(1.6, 32, 32), glowMaterial);
  sphere.add(glow);

  return sphere;
};

// Nodi simbolici
const labels = ["Daimon", "Pensieri", "Filosofia", "Scienza", "Io Bambino", "Empatia"];
const colors = ["#ffffff", "#ff69b4", "#87ceeb", "#32cd32", "#ffa500", "#ff4500"];

labels.forEach((label, i) => {
  const node = createNode(colors[i % colors.length], label);
  node.position.set(
    Math.sin(i * 1.05) * 10,
    Math.cos(i * 1.3) * 10,
    Math.sin(i * 0.8) * 10
  );
  scene.add(node);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
