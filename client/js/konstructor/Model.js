define(['underscore', 'konstructor/Face'], function(_, Face) {

	var Model = function(faces, colors) {
		this.faces = faces || [];
		this.colors = colors || this.defaultColors;
		this.objects = [];
	}

	Model.prototype.defaultColors = [
		'blue',
		'green',
		'#ff8391',
		'#0938ab',
		'#f5f7f0',
		'#9386af',
		'#629255',
		'#262003',
		'#82f930',
		'#faf390',
		'#0a9255',
		'#f7c733',
		'#5209ff',
		'#cc77ae',
		'#90cef4',
		'#efedea',
		'red',
		'yellow',
		'grey',
	];

	Model.prototype.render = function(scene) {
		var me = this,
			materials = [],
			geometry;

		this.faces.forEach(function(face, index) {
			materials[index] = new THREE.MeshBasicMaterial({color: me.colors[face.index-1], opacity: face.opacity || 1, transparent: face.transparent, side:THREE.DoubleSide});
		});

		for(var i = 0; i < this.objects.length; i++) {
			scene.remove(this.objects[i]);
		}

		for (var i = 0; i < this.faces.length; i++) {
			geometry = new THREE.Geometry();
			geometry.vertices = this.faces[i].getVerticies();
			geometry.faces.push( new THREE.Face3(0,1,2));
			
			this.objects[i] = new THREE.Mesh(geometry, materials[i] );
			scene.add(this.objects[i]);
		}
	}

	Model.prototype.asJSON = function() {
		var result = {
			faces: _.map(this.faces, function(face) {
				return face.asJSON();
			})
		}

		return JSON.stringify(result);
	}

	Model.prototype.fromJSON = function(json) {
		var data = JSON.parse(json),
			face;
		for(var i = 0; i < data.faces.length; i++) {
			face = new Face();
			face.fromJSON(data.faces[i]);
			this.faces.push(face);
		}
	}	

	return Model;

});