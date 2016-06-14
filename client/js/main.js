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

$('.main #figure-container').dblclick(function() {
	$('#figure-container').fadeOut(function() {
	  $('#mynetwork').fadeIn(function() {
	  	initGraph();
	  });
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

// ----------------- Graph -------------------------------- //

var graphInitialized = false;
var initGraph = function() {

	if (!graphInitialized) {
		graphInitialized = true;
	} else {
		return;
	}

	var nodesData = [{
		id: 1,
		//ava: window.user.avatar,
		ava: 2,
		//title: window.user.firstName + ' ' + window.user.lastName,
		title: 'Alice Wonderland, VC',
		descr:
		'<div style=\"background-color: #FFD700\">iVentures</div>' +
		'<div style=\"background-color: #9370DB\">Sequoia</div>' +
		'<div style=\"background-color: #928f1a\">Anderson Horowitz</div>'
	},
	{
		id: 2,
		ava: 1,
		title: 'Lewis Katz, VC',
		descr:
		'<div style=\"background-color: #FFD700\">iVentures</div>' +
		'<div style=\"background-color: #008000\">JPMorgan</div>' +
		'<div>Bear Stearns</div>'
	},
	{
		id: 3,
		ava: 4,
		title: 'Lolita Snark, Entrepreneur',
		descr:
		'<div>Scrabble</div>' +
		'<div style=\"background-color: #e969f4\">Goldman Sachs</div>' +
		'<div style=\"background-color: #008000\">JPMorgan</div>'
	},
	{
		id: 4,
		ava: 3,
		title: 'Charles Stammer, Entrepreneur',
		descr:
		'<div>HaloGlass</div>' +
		'<div style=\"background-color: #0000FF\">Insight Partners</div>' +
		'<div style=\"background-color: #e969f4\">Goldman Sachs</div>'
	},
	{
		id: 5,
		ava: 5,
		title: 'Bob Liddell, Banker',
		descr:
		'<div style=\"background-color: #e969f4\">Goldman Sachs</div>' +
		'<div style=\"background-color: #008000\">JPMorgan</div>' +
		'<div style=\"background-color: #FF0000\">BNP Paribas</div>'
	},
	{
		id: 6,
		ava: 6,
		title: 'Carroll Merveille, Banker',
		descr:
		'<div style=\"background-color: #FF0000\">BNP Paribas</div>' +
		'<div>HSBC</div>' +
		'<div>Barclays</div>'
	},
	{
		id: 7,
		ava: 9,
		title: 'Michael Hargreaves, VC',
		descr:
		'<div style=\"background-color: #928f1a\">Anderson Horowitz</div>' +
		'<div>Accel Partners</div>' +
		'<div style=\"background-color: #BC8F8F\">Bloomberg Beta</div>'
	},
	{
		id: 8,
		ava: 8,
		title: 'Mary Haze, VC',
		descr:
		'<div style=\"background-color: #FFD700\">iVentures</div>' +
		'<div style=\"background-color: #BC8F8F\">Bloomberg Beta</div>' +
		'<div style=\"background-color: #E9967A\">Bessemer Venture Partners</div>'
	},
	{
		id: 9,
		ava: 7,
		title: 'Mia Corral, VC',
		descr:
		'<div style=\"background-color: #BC8F8F\">Bloomberg Beta</div>' +
		'<div style=\"background-color: #9370DB\">Sequoia</div>' +
		'<div style=\"background-color: #928f1a\">Anderson Horowitz</div>'
	},
	{
		id: 10,
		ava: 11,
		title: 'David Hatter, Lawyer',
		descr:
		'<div style=\"background-color: #ADFF2F\">Latham & Watkins</div>' +
		'<div>DLA Piper</div>' +
		'<div style=\"background-color: #0000FF\">Insight Partners</div>'
	},
	{
		id: 11,
		ava: 10,
		title: 'Rosaline Caterpillar, Lawyer',
		descr:
		'<div style=\"background-color: #E9967A\">Bessemer Venture Partners</div>' +
		'<div style=\"background-color: #ADFF2F\">Latham & Watkins</div>' +
		'<div>Baker & McKenzie</div>'
	},
	{
		id: 12,
		ava: 12,
		title: 'Clarence Cheshire, Entrepreneur',
		descr:
		'<div>Kitty Foods</div>' +
		'<div>Humane Society</div>' +
		'<div>Petco</div>'
	}];

	var nodes = [];
	nodesData.forEach(function(data) {
		nodes.push({
			id: data.id,
			shape: 'circularImage',
			image: '/img/avatar-'+ data.ava +'.jpg',
			title: [
				'<div class="graph-popup">',
					'<div class="title">'+ data.title +'</div>',
					'<p>'+ data.descr +'</p>',
				'</div>'
			].join('')
		});
	});

  // create an array with edges
  var edges = new vis.DataSet([
    {from: 1, to: 2, color:{color:'#FFD700'}}, //iVentures
    {from: 1, to: 8, color:{color:'#FFD700'}}, //iVentures
    {from: 1, to: 9, color:{color:'#9370DB'}}, //Sequoia
    {from: 1, to: 7, color:{color:'#928f1a'}}, //Anderson Horowitz
    {from: 1, to: 9, color:{color:'#928f1a'}}, //Anderson Horowitz
    {from: 2, to: 8, color:{color:'#FFD700'}}, //iVentures
	  {from: 2, to: 3, color:{color:'#008000'}}, //JPMorgan
	  {from: 2, to: 5, color:{color:'#008000'}}, //JPMorgan
	  {from: 3, to: 4, color:{color:'#e969f4'}}, //Goldman Sachs
	  {from: 3, to: 5, color:{color:'#e969f4'}}, //Goldman Sachs
	  {from: 4, to: 5, color:{color:'#e969f4'}}, //Goldman Sachs
	  {from: 4, to: 10, color:{color:'#0000FF'}}, //Insight Partners
	  {from: 5, to: 6, color:{color:'#FF0000'}}, //BNP Paribas
	  {from: 7, to: 9, color:{color:'#928f1a'}}, //Anderson Horowitz
	  {from: 7, to: 8, color:{color:'#BC8F8F'}}, //Bloomberg Beta
	  {from: 7, to: 9, color:{color:'#BC8F8F'}}, //Bloomberg Beta
	  {from: 8, to: 9, color:{color:'#BC8F8F'}}, //Bloomberg Beta
	  {from: 8, to: 11, color:{color:'#E9967A'}}, //Bessemer Venture Partners
	  {from: 10, to: 11, color:{color:'#ADFF2F '}}, //Latham & Watkins

  ]);

  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    nodes: {
      borderWidth:4,
      size:40,
      color: {
        border: '#222222',
        background: '#666666'
      },
      font:{color:'#eeeeee'}
    },
    edges: {
      color: 'lightgray',
		width: 3
    },
    interaction:{
		hover:true,
		hoverConnectedEdges: false,
	},
	  "physics": {
		  "barnesHut": {
			  "gravitationalConstant": -12000,
			  //"centralGravity": 0
		  }
	  }
  };

	var network = new vis.Network(container, data, options);
}