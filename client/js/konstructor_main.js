requirejs.config({
    baseUrl: '/js',
    paths: {
		'jquery': './vendor/jquery/dist/jquery.min',
		'underscore': './vendor/underscore/underscore',
		'threejs': './vendor/threejs/build/three',
		'threex-dynamictexture': './vendor/threex.dynamictexture/threex.dynamictexture',
		'orbit': './OrbitControls',
	},
	"shim": {
		'threejs': ['threex-dynamictexture'],
		'orbit': ['threejs'],
    }
});

require(['jquery', 'threejs', 'orbit', 'konstructor/konstructor'], function($,t,o,konstructor) {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);
	var renderer = new THREE.WebGLRenderer({ alpha: true });
	var orbit = new THREE.OrbitControls( camera, renderer.domElement );
	orbit.enableZoom = false;
	orbit.autoRotate = false;

	var model;

	window.orbit = orbit;

	renderer.setSize(600, 600);
	$('#figure-container').append(renderer.domElement);

	// var edges = new THREE.EdgesHelper( figure, 0xFF0000 );
	// scene.add(edges);

	camera.position.z = 1000;

	render();

	function render() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		orbit.update();
	};

	function showControls() {
		var $el = $('#konstructor-controls ul');
		model.faces.forEach(function(face, index) {
			var html = '<li>';
			html += '<div data-face-id="'+ face.id +'" class="face-color" style="background-color: '+ model.colors[face.index-1] +';"></div>';
			html += '<input data-face-id="'+ face.id +'" name="face-index" value="'+ face.index +'"/>';
			html += '<input data-face-id="'+ face.id +'" data-v-id="'+ face.v1.id +'"name="ver-x" value="'+ face.v1.x +'"/>';
			html += '<input data-face-id="'+ face.id +'" data-v-id="'+ face.v1.id +'"name="ver-y" value="'+ face.v1.y +'"/>';
			html += '<input data-face-id="'+ face.id +'" data-v-id="'+ face.v1.id +'"name="ver-z" value="'+ face.v1.z +'"/>';
			html += '<div class="separator"></div>';
			html += '<input data-face-id="'+ face.id +'" name="face-index" value="'+ face.index +'"/>';
			html += '<input data-face-id="'+ face.id +'" data-v-id="'+ face.v2.id +'"name="ver-x" value="'+ face.v2.x +'"/>';
			html += '<input data-face-id="'+ face.id +'" data-v-id="'+ face.v2.id +'"name="ver-y" value="'+ face.v2.y +'"/>';
			html += '<input data-face-id="'+ face.id +'" data-v-id="'+ face.v2.id +'"name="ver-z" value="'+ face.v2.z +'"/>';
			html += '<div class="separator"></div>';
			html += '<input data-face-id="'+ face.id +'" name="face-index" value="'+ face.index +'"/>';
			html += '<input data-face-id="'+ face.id +'" data-v-id="'+ face.v3.id +'"name="ver-x" value="'+ face.v3.x +'"/>';
			html += '<input data-face-id="'+ face.id +'" data-v-id="'+ face.v3.id +'"name="ver-y" value="'+ face.v3.y +'"/>';
			html += '<input data-face-id="'+ face.id +'" data-v-id="'+ face.v3.id +'"name="ver-z" value="'+ face.v3.z +'"/>';
			html += '<div class="separator"></div>';
			html += '<input class="rotation-input" data-face-id="'+ face.id +'" readonly value="'+ face.rotation.theta +'"/>';
			html += '<button class="rotation-btn" data-face-id="'+ face.id +'" >R</button>';
			html += '</li>';
			$el.append(html);
		});
	}

	// ------------ DOM Listeners -----------------

	$(function() {
		$('#gen-btn').click(function() {
			var vCount = parseInt($('#gen-input').val());
			model = konstructor.generate(vCount);
			if (model) {
				model.render(scene);
				showControls();
				window.model = model;
			}
		});

		$('#save-btn').click(function() {
			if (model) {
				console.log(model.asJSON());
			}
		});

		$('#konstructor-controls').delegate('input', 'change', function() {
			var $el = $(this);
			var faceId = $el.attr('data-face-id');
			var face, ver, verId;

			model.faces.forEach(function(f) {
				if (f.id == faceId) {
					face = f;
				}
			});

			if ($el.attr('name') == 'face-index') {
				face.index = parseInt($el.val());
				$('.face-color[data-face-id="'+ faceId +'"]').css('background-color', model.colors[face.index-1]);
			} else {
				verId = $el.attr('data-v-id');
				if (face.v1.id == verId) {
					ver = face.v1;
				} else if (face.v2.id == verId) {
					ver = face.v2;
				} else {
					ver = face.v3;
				}

				if ($el.attr('name') == 'ver-x') {
					ver.x = $el.val();
				} else if ($el.attr('name') == 'ver-y') {
					ver.y = $el.val();
				} else {
					ver.z = $el.val();
				}

				$('input[data-v-id="'+ verId +'"]').each(function() {
					if ($(this).attr('name') == $el.attr('name')) {
						$(this).val($el.val());
					}
				});
			}

			model.render(scene);
		});

		$('#konstructor-controls').delegate('.rotation-btn', 'click', function() {
			var $el = $(this);
			var faceId = $el.attr('data-face-id');
			var faceIndex;

			model.faces.forEach(function(f) {
				if (f.id == faceId) {
					faceIndex = f.index;
				}
			});

			model.faces.forEach(function(face) {
				if (face.index == faceIndex) {
					face.rotation.radius = orbit.spherical.radius;
					face.rotation.phi = orbit.spherical.phi;
					face.rotation.theta = orbit.spherical.theta;
				}
				$('.rotation-input[data-face-id="'+ face.id +'"]').val(face.rotation.theta);
			});
		});

		// $('#gen-btn').click();
	});

});