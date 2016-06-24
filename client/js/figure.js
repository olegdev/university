var Figure = {
	factory: function(scene, config) {
		var figure;

		switch(config.faces.length) {
			case 2:
				config.faces.push({color: 0x88FFFF, transparent: true, opacity:0.8});
				config.faces.push({color: 0x88FFFF, transparent: true, opacity:0.8});
				figure = new Tetra(config);
				break;
			case 3:
				config.faces.push({color: 0x88FFFF, transparent: true, opacity:0.8});
				figure = new Tetra(config);
				break;
			// case 4: 
			// 	figure = new Tetra(config);
			// 	break;
			// case 6:
			// 	figure = new Cube(config);
			// 	break;
			default:
				figure = new Tetra(config);
				break;
		}

		figure.create(scene);
		return figure;
	}
}

var Tetra = function(config) {
	this.config = config;
	this.objects = [];
}
Tetra.prototype.create = function(scene) {
	var geometry,
		materials = [];

	this.config.faces.forEach(function(face, index) {
		materials[index] = new THREE.MeshBasicMaterial({color: face.color, opacity: face.opacity || 1, transparent: face.transparent, side:THREE.DoubleSide});
	});

	geometry = new THREE.Geometry();
	geometry.vertices = [
		new THREE.Vector3(-300, -300, 300),
		new THREE.Vector3(300, -300, 0),
		new THREE.Vector3(-300, 0, -300),
	];
	geometry.faces.push( new THREE.Face3(0,1,2));
	geometry.computeFaceNormals();
    this.objects[0] = new THREE.Mesh( geometry, materials[0] );
    scene.add(this.objects[0]);
	
	geometry2 = new THREE.Geometry();
	geometry2.vertices = [
		geometry.vertices[0],
		geometry.vertices[1],
		new THREE.Vector3(0, 300, 0),
	];
	geometry2.faces.push( new THREE.Face3(0,1,2));
	geometry2.computeFaceNormals();
    this.objects[1] = new THREE.Mesh( geometry2, materials[1] );
    scene.add(this.objects[1]);

	geometry3 = new THREE.Geometry();
	geometry3.vertices = [
		geometry.vertices[0],
		geometry.vertices[2],
		geometry2.vertices[2],
	];
	geometry3.faces.push( new THREE.Face3(0,1,2));
	geometry3.computeFaceNormals();
    this.objects[2] = new THREE.Mesh( geometry3, materials[2] );
    scene.add(this.objects[2]);

   	geometry4 = new THREE.Geometry();
  
	geometry4.vertices = [
		geometry.vertices[1],
		geometry.vertices[2],
		geometry2.vertices[2],
	];
	geometry4.faces.push( new THREE.Face3(0,1,2));
	geometry4.computeFaceNormals();
    this.objects[3] = new THREE.Mesh( geometry4, materials[3] );
    scene.add(this.objects[3]);
}
Tetra.prototype.rotateTo = function(type, orbit) {
	var index;
	for(var i = 0; i < this.config.faces.length; i++) {
		if (this.config.faces[i].type == type) {
			index = i;
			break;
		}
	}

	var target,
		duration = 500,
		steps = 25,
		d1,d2,d3,
		rotateInterval;

	if (this.rotateInterval) {
		clearInterval(this.rotateInterval);
	}

	switch(index) {
		case 0:
			target = {radius: 1000.0000000000016, phi: 3.141591653589793, theta: 0.2199114857512854};
			break;
		case 1:
			target = {radius: 1000.0000000000015, phi: 1.3299398898642185, theta: 0.6283185307179586};
			break;
		case 2:
			target = {radius: 1000.0000000000007, phi: 1.0576705267530155, theta: -1.2880529879718166};
			break;
		case 3:
			target = {radius: 1000.0000000000008, phi: 1.1833322326966929, theta: 2.8379053637427782};
			break;
		default:
			target = {radius: 1000.0000000000008, phi: 1.1833322326966929, theta: 2.8379053637427782};
	}

	d1 = ( orbit.spherical.radius - target.radius ) / 25;
	d2 = ( orbit.spherical.phi - target.phi ) / 25;
	d3 = ( orbit.spherical.theta - target.theta ) / 25;

	orbit.autoRotate = false;

	rotateInterval = this.rotateInterval = setInterval(function() {
		if (steps-- > 0) {
			orbit.update({
				radius: orbit.spherical.radius - d1,
				phi: orbit.spherical.phi - d2,
				theta: orbit.spherical.theta - d3,
			})
		} else {
			clearInterval(rotateInterval);
			orbit.autoRotate = true;
		}
	}, duration / steps);
}

var Cube = function(faces) {
	var geometry = new THREE.BoxGeometry(450,450,450);
	var materials = [];

	faces.forEach(function(face, index) {
		materials[index] = new THREE.MeshBasicMaterial({color: face.color, opacity: face.opacity || 1, transparent: face.transparent, side:THREE.DoubleSide});
	});

	var material = new THREE.MeshFaceMaterial(materials);

	return new THREE.Mesh(geometry, material);
}