// ------------- Figure --------------- //

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);
var renderer = new THREE.WebGLRenderer({ alpha: true });
var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = false;
orbit.autoRotate = true;
var raycaster;
var mouse;

renderer.setSize(600, 600);
$('#figure-container').append(renderer.domElement);

var faces = [];
Object.keys(user.profiles).forEach(function(type) {
	var profile = user.profiles[type];
	faces.push({
		color: profile.color,
		opacity: 1,
		transparent: false,
		type: profile.type,
	})
});

var figure = Figure.factory(scene, {faces: faces});

// var edges = new THREE.EdgesHelper( figure, 0xFF0000 );
// scene.add(edges);

camera.position.z = 1000;

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();
raycaster.setFromCamera( mouse, camera );
document.addEventListener( 'mousemove', onDocumentMouseDown, false );

render();

function onDocumentMouseDown(event) {
	event.preventDefault();

	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects(figure.objects, true);
	if (intersects.length) {
		// console.log(intersects);
	}
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	orbit.update();
};

$('#figure-legend li').click(function() {
	figure.rotateTo($(this).attr('data-type'), orbit);
});

$('.main #figure-legend li').dblclick(function() {
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
	});
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
