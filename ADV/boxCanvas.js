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

var logoGeo = new THREE.PlaneGeometry(11, 4, 5);
var logoMaterial = new THREE.MeshBasicMaterial({
	map: new THREE.TextureLoader().load("menaceLogo.png"), 
	side: THREE.DoubleSide,
	depthTest: false,
	depthWrite: false,
	transparent: true,
	opacity: 1
});
var logo = new THREE.Mesh(logoGeo, logoMaterial);
scene.add(logo);

var composer = new THREE.EffectComposer(renderer);
var renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

var glitchPass = new THREE.GlitchPass(10);
composer.addPass(glitchPass);
glitchPass.renderToScreen = true;

var update = function() {

	logo.rotation.y += 0.02;
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