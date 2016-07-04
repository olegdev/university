define(['threejs', 'underscore'], function(th, _) {

var Figure = function(config) {
	this.config = config;
	this.objects = [];

	this.faces = [{
		vertices: [
			[-300, -300, 300],
			[300, -300, 0],
			[-300, 0, -300],
		],
		rotation: {radius: 1000, phi: 3.141591653589793, theta: 0.2199114857512854},
	},{
		vertices: [
			'0:0',
			'0:1',
			[0, 300, 0]
		],
		rotation: {radius: 1000, phi: 1.3299398898642185, theta: 0.6283185307179586},
	},{
		vertices: [
			'0:0',
			'0:2',
			'1:2',
		],
		rotation: {radius: 1000, phi: 1.0576705267530155, theta: -1.2880529879718166},
	},{
		vertices: [
			'0:1',
			'0:2',
			'1:2',
		],
		rotation: {radius: 1000, phi: 1.1833322326966929, theta: 2.8379053637427782},
	}]
}
Figure.prototype.create = function(scene) {
	var me = this,
		geometry,
		materials = [],
		indexes,
		verts,

		getVerticies = function(faceVerticies) {
			var vertices = [];
			for(var i = 0; i < faceVerticies.length; i++) {
				if (typeof faceVerticies[i] == 'string') {
					indexes = faceVerticies[i].split(':');
					if (indexes.length == 2) {
						verts = me.faces[parseInt(indexes[0])].vertices[ parseInt(indexes[1]) ];
					} else {
						verts = me.faces[parseInt(indexes[0])].vertices[ parseInt(indexes[1]) ][ parseInt(indexes[2]) ];
					}
					vertices.push(new THREE.Vector3(verts[0],verts[1],verts[2]));
				} else {
					vertices.push(new THREE.Vector3(faceVerticies[i][0],faceVerticies[i][1],faceVerticies[i][2]));
				}
			}
			return vertices;
		};

	this.config.faces.forEach(function(face, index) {
		materials[index] = new THREE.MeshBasicMaterial({color: face.color, opacity: face.opacity || 1, transparent: face.transparent, side:THREE.DoubleSide});
	});

	for(var i = 0; i < this.faces.length; i++) {
		geometry = new THREE.Geometry();
		if (this.faces[i].multi) {
			for(var j = 0; j < this.faces[i].vertices.length; j++) {
				geometry.vertices = geometry.vertices || [];
				geometry.vertices = geometry.vertices.concat(getVerticies(this.faces[i].vertices[j]));
				geometry.faces.push( new THREE.Face3(3*j+0,3*j+1,3*j+2));	
			}
		} else {
			geometry.vertices = getVerticies(this.faces[i].vertices);
			geometry.faces.push( new THREE.Face3(0,1,2));
		}
		this.objects[i] = new THREE.Mesh(geometry, materials[i] );
		scene.add(this.objects[i]);
	}
}
Figure.prototype.rotateTo = function(type, orbit) {
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

	target = this.faces[index] ? this.faces[index].rotation : this.faces[0].rotation;

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

return Figure;

});