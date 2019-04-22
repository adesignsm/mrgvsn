var loadingPage = document.getElementById("loading-page");
var loadingQuoteArr = [
	"Short stories, tragic endings.",
	"Nobody is going to give a Fuck.",
	"Our knowledge is a receding Mirage in an ever expanding desert of ignorance.",
	"All I am is smoke and mirrors, a mirage.",
	"The system does not control one, but one controls the system."
];

var randomQuote = loadingQuoteArr[Math.floor(Math.random() * loadingQuoteArr.length)];

var loadingPageQuote = document.getElementById("quote-generator");
loadingPageQuote.innerHTML = randomQuote;

function loading_canvas() {

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.shadowMapEnabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.getElementById("loading-page").appendChild(renderer.domElement);

	window.addEventListener("resize", function() {

		var width = window.innerWidth;
		var height = window.innerHeight;

		renderer.setSize(width, height);

		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	});

	camera.position.z = 20;

	var loadingLogoGeo = new THREE.PlaneGeometry(8, 7, 1);
	var loadingLogoMaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("./assets/bfly.png"), side: THREE.DoubleSide});
	var loadingLogo = new THREE.Mesh(loadingLogoGeo, loadingLogoMaterial);
	scene.add(loadingLogo);

	var update = function() {

		loadingLogo.rotation.y += 0.02;
	};

	var render = function() {

		renderer.render(scene, camera);
	};

	var animate = function() {

		requestAnimationFrame(animate);

		update();
		render();
	};

	animate();
}

loading_canvas();
