const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

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

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let INTERSECTED = null;

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(nodes);

  nodes.forEach(node => {
    node.material.emissive.setHex(0x000000);
    node.scale.set(1, 1, 1);
  });

  if (intersects.length > 0) {
    INTERSECTED = intersects[0].object;
    INTERSECTED.material.emissive.setHex(0x4488ff);
    INTERSECTED.scale.set(1.2, 1.2, 1.2);
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});