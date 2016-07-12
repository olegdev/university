define(['underscore', 'konstructor/Vertice'], function(_, Vertice) {

	var Face = function(index, v1,v2,v3) {
		this.id = _.uniqueId();
		this.index = index;
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;
		this.rotation = {radius: 999, phi: 0, theta: -1.5917};
	}

	Face.prototype.getVerticies = function() {
		var vertices = [];

		vertices.push(new THREE.Vector3(this.v1.x,this.v1.y,this.v1.z));
		vertices.push(new THREE.Vector3(this.v2.x,this.v2.y,this.v2.z));
		vertices.push(new THREE.Vector3(this.v3.x,this.v3.y,this.v3.z));

		return vertices;
	}

	Face.prototype.asJSON = function() {
		var result = {
			id: this.id,
			index: this.index,
			vertices: [this.v1.asJSON(), this.v2.asJSON(), this.v3.asJSON()],
			rotation: this.rotation,
		};
		return result;
	}

	Face.prototype.fromJSON = function(data) {
		this.id = data.id;
		this.index = data.index;
		this.rotation = data.rotation;
		this.v1 = new Vertice();
		this.v1.fromJSON(data.vertices[0]);
		this.v2 = new Vertice();
		this.v2.fromJSON(data.vertices[1]);
		this.v3 = new Vertice();
		this.v3.fromJSON(data.vertices[2]);
	}

	return Face;

});