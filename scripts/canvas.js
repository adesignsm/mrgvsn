var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var windowW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var windowH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMapEnabled = false;
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("canvas-container").appendChild(renderer.domElement);

window.addEventListener("resize", function() {

	var width = window.innerWidth;
	var height = window.innerHeight;

	renderer.setSize(width, height);

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});

$(document).ready(function() {

	if (windowW >= 320 && windowW <= 480) {

		scene.remove(mirrorFrame);
		scene.remove(mirror);
	
	} else {

		scene.add(mirrorFrame);
		scene.add(mirror);
	}
});

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 20;
camera.position.z = 15;

var light1 = new THREE.PointLight(0xffffff, 100);
scene.add(light1);
light1.position.set(0, -1, 0);

// lightHelper = new THREE.PointLightHelper(light, 00); 
// scene.add(lightHelper); 

var showCaseGeo = new THREE.CubeGeometry(5, 10, 5);
var showCaseMaterial = new THREE.MeshStandardMaterial({color: 0x000000, side: THREE.DoubleSide, transparent: true, opacity: .2, depthWrite: false, depthTest: false});
var showCase = new THREE.Mesh(showCaseGeo, showCaseMaterial);
scene.add(showCase);

var logoPlaneGeo = new THREE.PlaneGeometry(5, 5, 10);
var logoPlaneMaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("assets/logo.jpg"), side: THREE.DoubleSide});
var logoPlane = new THREE.Mesh(logoPlaneGeo, logoPlaneMaterial);
scene.add(logoPlane); 

var mirrorFrameGeo = new THREE.PlaneGeometry(8, 15, 5);
var mirrorFrameMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
var mirrorFrame = new THREE.Mesh(mirrorFrameGeo, mirrorFrameMaterial);
scene.add(mirrorFrame);

var mirrorGeo = new THREE.PlaneGeometry(7, 14, 4);
var mirror = new THREE.Reflector(mirrorGeo, {

	clipBias: 0.005,
	textureWidth: window.innerWidth,
	textureHeight: window.innerHeight,
	color: 0xcccccc,
	recursion: 10
});
scene.add(mirror);

var composer = new THREE.EffectComposer(renderer);

var renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

var glitchPass = new THREE.GlitchPass(10);
composer.addPass(glitchPass);
glitchPass.renderToScreen = false;

var FXAA = new THREE.ShaderPass(THREE.FXAAShader);
composer.addPass(FXAA);
FXAA.renderToScreen = true;

var titleBtn = document.getElementById("title-box");
var archiveBtn = document.getElementById("archive-li");
var ssBtn = document.getElementById("ss-li");
var aboutBtn = document.getElementById("about-li");

archiveBtn.onmousedown = function(event) {

	console.log("clicked");

	scene.remove(mirror);
	scene.remove(mirrorFrame);

	scene.remove(showCase);
	scene.remove(logoPlane);
}

ssBtn.onmousedown = function(event) {

	console.log("clicked");

	scene.remove(mirror);
	scene.remove(mirrorFrame);
	scene.remove(showCase);
	scene.remove(logoPlane);
}

aboutBtn.onmousedown = function(event) {

	console.log("clicked");

	scene.remove(mirror);
	scene.remove(mirrorFrame);

	scene.remove(showCase);
	scene.remove(logoPlane);
}

var update = function() {

	showCase.rotation.y += 0.005;
	logoPlane.rotation.y += 0.005;

	mirrorFrame.position.x = 11;
	mirrorFrame.position.z = "-10";
	mirrorFrame.rotation.y = 5.5;

	mirror.position.x = 11;
	mirror.position.z = "-9.8";
	mirror.rotation.y = 5.5;
};

var render = function() {

	composer.render();
	// renderer.render(scene, camera);

	mirror.material.needsUpdate = true;
};

var animate = function() {

	requestAnimationFrame(animate);

	update();
	render();
};

animate();