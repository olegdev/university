requirejs.config({
    baseUrl: '/js',
    paths: {
		'jquery': './vendor/jquery/dist/jquery.min',
		'underscore': './vendor/underscore/underscore',
		'threejs': './vendor/threejs/build/three',
		'threex-dynamictexture': './vendor/threex.dynamictexture/threex.dynamictexture',
		'vis': './vendor/vis/dist/vis.min',
		'orbit': './OrbitControls',
	},
	"shim": {
		'threejs': ['threex-dynamictexture'],
		'orbit': ['threejs'],
    }
});

require(['jquery', 'underscore', 'threejs', 'orbit', 'figure_factory', 'graphs'], function($,_,t,o,FigureFactory, Graphs) {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);
	var renderer = new THREE.WebGLRenderer({ alpha: true });
	var orbit = new THREE.OrbitControls( camera, renderer.domElement );
	orbit.enableZoom = false;
	orbit.autoRotate = true;
	var raycaster;
	var mouse;

	window.orbit = orbit;

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

	var figure = FigureFactory.factory(scene, {faces: faces});

	// var edges = new THREE.EdgesHelper( figure, 0xFF0000 );
	// scene.add(edges);

	camera.position.z = 1000;

	// raycaster = new THREE.Raycaster();
	// mouse = new THREE.Vector2();
	// raycaster.setFromCamera( mouse, camera );
	// document.addEventListener( 'mousemove', onDocumentMouseDown, false );

	render();
	showLegend();

	// function onDocumentMouseDown(event) {
	// 	event.preventDefault();

	// 	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	// 	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

	// 	raycaster.setFromCamera( mouse, camera );

	// 	var intersects = raycaster.intersectObjects(figure.objects, true);
	// 	if (intersects.length) {
	// 		// console.log(intersects);
	// 	}
	// }

	function render() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		orbit.update();
	};

	function showLegend() {
		var profiles = [],
			html = '<ul>';

		profiles = _.sortBy(_.values(user.profiles), "order");
		profiles.forEach(function(p) {
			html += '<li data-type="'+ p.type +'">' +
					'<div class="icon" style="border-color: '+ p.color +' transparent;">'+
						'<div class="icon-top" style="border-color: transparent transparent '+ p.color +';"></div>' +
					'</div>' +
					'<a href="#">'+ p.title +'</a>'+
				'</li>';
		});

		html += '</ul>';
		$('#figure-legend').html(html);	
	}

	$('#figure-legend li').click(function() {
		figure.rotateTo($(this).attr('data-type'), orbit);
	});

	$('#figure-legend li a').click(function() {
		var type = $(this).parent().attr('data-type');
		$.ajax({
			url: '/profile_connections?type=' + type + '&id=' + (user ? user.id : ''),
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

	// hack! ))
	if (user && user.profiles && user.profiles.professional && user.profiles.professional.companies) {
		var html = [];
		user.profiles.professional.companies.forEach(function(c) {
			if (c.name) {
				html.push(c.name);
			}
		});
		$('.public .person-info h3').html(html.join(', '));
	}


});