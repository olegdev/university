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
var renderer = new THREE.WebGLRenderer({ alpha: false});
var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = false;

renderer.setSize(600, 600);
$('#figure-container').append(renderer.domElement);

var geometry = new THREE.DodecahedronGeometry(300,0);
// var geometry = new THREE.BoxGeometry(400,400,400);
// var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});

// instantiate a loader
var loader = new THREE.TextureLoader();

var cube;
var dynamicTexture;

loader.load('img/shopping_text3.jpg', function ( shoppingTexture ) {
	var boxMaterials = [];

	for(var i = 0; i < 40; i++) {
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

	cube = new THREE.Mesh(geometry, boxMaterial);
	cube.rotation.x += 0.22;
	cube.rotation.z += 0.37;
	cube.rotation.y += -0.5;
	var edges = new THREE.EdgesHelper( cube, 0xFF0000 );
	scene.add(cube);
	scene.add(edges);
	camera.position.z = 1000;        
	render();
});

function render() {
	requestAnimationFrame(render);
	// cube.rotation.y += 0.01;
	// cube.rotation.z += 0.01;
	renderer.render(scene, camera);
};

// ------------------ DOM listeners ----------------------- //

$('#figure-container').dblclick(function() {
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

// ----------------- Graph -------------------------------- //

var graphInitialized = false;
var initGraph = function() {

	if (!graphInitialized) {
		graphInitialized = true;
	} else {
		return;
	}

  // create an array with nodes
  var nodes = new vis.DataSet([
    {id: 1,  shape: 'circularImage', image: '/img/ava_'+ window.userAvatar +'.png'},
    {id: 2,  shape: 'circularImage', image: '/img/ava_2.png'},
    {id: 3,  shape: 'circularImage', image: '/img/ava_3.png'},
    {id: 4,  shape: 'circularImage', image: '/img/ava_5.png'},
    {id: 5,  shape: 'circularImage', image: '/img/ava_6.png'},
    {id: 6,  shape: 'circularImage', image: '/img/ava_7.png'},
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 1, to: 4},
    {from: 1, to: 5},
    {from: 1, to: 6}
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
      color: 'lightgray'
    }
  };

	var network = new vis.Network(container, data, options);
}