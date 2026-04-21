// escena
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0x111111);

// cámara
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 3);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const container = document.getElementById('container');
container.appendChild(renderer.domElement);


// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

// luz ambiental
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

// luz direccional
const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(3, 5, 2);
scene.add(directional);

// modelo
const loader = new THREE.GLTFLoader();

// declarar variable modelo
let model;

// cargando modelo
loader.load('assets/moai.glb', (gltf) => {
model = gltf.scene;
scene.add(model);

// calcular bounding box
const box = new THREE.Box3().setFromObject(model);
const size = box.getSize(new THREE.Vector3());
const center = box.getCenter(new THREE.Vector3());

// escalar
const maxSize = Math.max(size.x, size.y, size.z);
const scale = 1 / maxSize;
model.scale.setScalar(scale);

// posicionar cámara
camera.position.set(0, 1, 2);
controls.update();
});

function resize() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

resize();
window.addEventListener('resize', resize);

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

animate();