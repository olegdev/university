// ------------- Figure --------------- //

var options = {
	baseColor: 0xFFFFFF,
	transparent: true,
	opacity: 0.8,
	faceColor1: 0x00FF00,
	faceColor2: 0x0000FF,
};

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);
var renderer = new THREE.WebGLRenderer({ alpha: true });
var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = false;
var raycaster;
var mouse;

renderer.setSize(600, 600);
$('#figure-container').append(renderer.domElement);

var geometry = new THREE.DodecahedronGeometry(450,0);
// var geometry = new THREE.SphereGeometry( 300, 4, 16 );
// var geometry = new THREE.BoxGeometry(400,400,400);
// var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});

// instantiate a loader
var loader = new THREE.TextureLoader();

var cube;
var dynamicTexture;

loader.load('img/sample.jpg', function ( sampleTexture ) {
loader.load('img/shopping_text.jpg', function ( shoppingTexture ) {
	var boxMaterials = [];

	for(var i = 0; i < 36; i++) {
		boxMaterials.push(new THREE.MeshBasicMaterial({color:options.baseColor, opacity: options.opacity, transparent: options.transparent}));
	}

	// Shopping text
	boxMaterials[27] = new THREE.MeshBasicMaterial({ map: shoppingTexture, side:THREE.DoubleSide });
	boxMaterials[28] = new THREE.MeshBasicMaterial({ map: shoppingTexture, side:THREE.DoubleSide });
	boxMaterials[29] = new THREE.MeshBasicMaterial({ map: shoppingTexture, side:THREE.DoubleSide });

	// left face
	boxMaterials[0] = new THREE.MeshBasicMaterial({color:options.faceColor1, opacity: 1, transparent: false, side:THREE.DoubleSide });
	boxMaterials[1] = new THREE.MeshBasicMaterial({color:options.faceColor1, opacity: 1, transparent: false, side:THREE.DoubleSide });
	boxMaterials[2] = new THREE.MeshBasicMaterial({color:options.faceColor1, opacity: 1, transparent: false, side:THREE.DoubleSide });

	// Right face
	boxMaterials[3] = new THREE.MeshBasicMaterial({color:options.faceColor2, opacity: 1, transparent: false, side:THREE.DoubleSide });
	boxMaterials[4] = new THREE.MeshBasicMaterial({color:options.faceColor2, opacity: 1, transparent: false, side:THREE.DoubleSide });
	boxMaterials[5] = new THREE.MeshBasicMaterial({color:options.faceColor2, opacity: 1, transparent: false, side:THREE.DoubleSide });

	// Create a MeshFaceMaterial, which allows the cube to have different materials on each face 
	var boxMaterial = new THREE.MeshFaceMaterial(boxMaterials);

	// boxMaterial =  new THREE.MeshBasicMaterial({ map: sampleTexture });
	// boxMaterial = new THREE.MeshLambertMaterial( { color: 0x222244 } );

	cube = new THREE.Mesh(geometry, boxMaterial);
	cube.rotation.x += 0.22;
	cube.rotation.z += 0.37;
	cube.rotation.y += -0.5;
	var edges = new THREE.EdgesHelper( cube, 0xFF0000 );
	scene.add(cube);
	scene.add(edges);
	camera.position.z = 1000;        
	render();

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	// document.addEventListener( 'mousedown', onDocumentMouseDown, false );
});
});

function onDocumentMouseDown(event) {
	event.preventDefault();

	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects([cube], true);

	if ( intersects.length > 0 ) {
		intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );

		var particle = new THREE.Sprite( particleMaterial );
		particle.position.copy( intersects[ 0 ].point );
		particle.scale.x = particle.scale.y = 16;
		scene.add( particle );

	}

	/*
	// Parse all the faces
	for ( var i in intersects ) {

		intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

	}
	*/
}

function render() {
	requestAnimationFrame(render);
	// cube.rotation.y += 0.01;
	// cube.rotation.z += 0.01;
	renderer.render(scene, camera);
};

// ------------------ DOM listeners ----------------------- //

// $('.main #figure-container').dblclick(function() {
// 	$('#figure-container').fadeOut(function() {
// 	  $('#mynetwork').fadeIn(function() {
// 	  	initGraph();
// 	  });
// 	});
// });

$('.main #figure-legend li').click(function() {
	var type = $(this).attr('data-type');
	$.ajax({
		url: 'profile_connections?type=' + type,
		success: function(data) {
			$('#mynetwork').html('');
			$('#figure-container').fadeOut(function() {
			  $('#mynetwork').fadeIn(function() {
			  	Graphs.factory(type, data.user, data.connections);
			  });
			});
		}
	})
});

$('.hexagon-icon').click(function() {
	$('#mynetwork').fadeOut(function() {
	  $('#figure-container').fadeIn(function() {
	  		//
	  });
	});
});

$('.search-field .dropdown-menu li').click(function() {
	$('.search-field input').focus();
});
