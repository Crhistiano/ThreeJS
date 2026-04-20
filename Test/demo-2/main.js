//Escena, camara y render


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(3,3,5);

const renderer = new THREE.WebGLRenderer({antialias: true});
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//Material

const material = new THREE.MeshStandardMaterial({
    color: 0x7ad0ff,
    metalness: 0.8,
    roughness: 0.4,
    side: THREE.DoubleSide

});

//Piso

const plane = new THREE.Mesh(new THREE.PlaneGeometry(12,12), material);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

//Dodecaedro

const dodeca = new THREE.Mesh(new THREE.DodecahedronGeometry(0.9), material);
dodeca.position.set(-1.5, 1.5, 0);
dodeca.castShadow = true;
scene.add(dodeca);

//TorusKnot

const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.6, 0.2, 128, ), material);
torusKnot.position.set(1.5, 1.5, 0);
torusKnot.castShadow = true;
scene.add(torusKnot);


//Luces

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffcc77, 0.5);
pointLight.position.set(-3, 2, 2);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(3, 5, 2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.bias = -0.001;
scene.add(directionalLight);


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//Helpers

const axesHelper = new THREE.AxesHelper(10);
const gridHelper = new THREE.GridHelper(20, 20);
const dirHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5);
const pointHelper = new THREE.PointLightHelper(pointLight, 0.3);
scene.add(axesHelper, gridHelper, dirHelper, pointHelper);

//Animación

function animate(){
    torusKnot.rotation.y += 0.01;
    dodeca.rotation.y -= 0.005;
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();