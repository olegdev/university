define(['underscore'], function(_) {

	var Vertice = function(x,y,z) {
		this.id = _.uniqueId();
		this.x = x;
		this.y = y;
		this.z = z;
	}

	Vertice.prototype.asJSON = function() {
		var result = {
			id: this.id,
			x: this.x,
			y: this.y,
			z: this.z
		};
		return result;
	}

	Vertice.prototype.fromJSON = function(data) {
		this.id = data.id;
		this.x = data.x;
		this.y = data.y;
		this.z = data.z;
	}

	return Vertice;

});