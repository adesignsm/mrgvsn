var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMapEnabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function() {

	var width = window.innerWidth;
	var height = window.innerHeight;

	renderer.setSize(width, height);

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});

var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 10;

var bflyGeo = new THREE.PlaneGeometry(7, 5, 5);
var bflyMaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("bfly.png"), side: THREE.DoubleSide, depthWrite: false, depthTest: false});
var bfly = new THREE.Mesh(bflyGeo, bflyMaterial);
scene.add(bfly);

var composer = new THREE.EffectComposer(renderer);
var renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

var glitchPass = new THREE.GlitchPass(50);
composer.addPass(glitchPass);
glitchPass.renderToScreen = false;

var filmPass = new THREE.FilmPass();
composer.addPass(filmPass);
filmPass.renderToScreen = true;

var update = function() {

	bfly.rotation.y += 0.02;
};

var render = function() {

	composer.render();
	// renderer.render(scene, camera);
};

var animate = function() {

	requestAnimationFrame(animate);

	update();
	render();
};

animate();