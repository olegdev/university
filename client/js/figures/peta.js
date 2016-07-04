define(['threejs', 'underscore', 'figures/tetra'], function(th, _, Tetra) {

var Figure = function(config) {
	this.config = config;
	this.objects = [];

	this.faces = [{
		vertices: [
			[
				[-250, -250, -250],
				[250, -250, -250],
				[-250, -250, 250],
			],
			[
				'0:0:1',
				[250, -250, 250],
				'0:0:2',	
			]
		],
		multi: true,
		rotation: {radius: 1000, phi: 3.141591653589793, theta: 0.2199114857512854},
	},{
		vertices: [
			'0:0:0',
			'0:0:1',
			[0, 250, 0]
		],
		rotation: {radius: 1000, phi: 1.7278759594743835, theta: -3.110176727053895},
	},{
		vertices: [
			'0:0:0',
			'0:0:2',
			'1:2',
		],
		rotation: {radius: 1000, phi: 1.6336281798666903, theta: -1.4974924982111348},
	},{
		vertices: [
			'0:0:1',
			'0:1:1',
			'1:2',
		],
		rotation: {radius: 1000, phi: 1.2985249634837788, theta: 1.4974924982111348},
	},{
		vertices: [
			'0:1:1',
			'0:0:2',
			'1:2',
		],
		rotation: {radius: 1000, phi: 1.3613568165555725, theta: 0.03141592653589793},
	}]
}

Figure.prototype = new Tetra({});
Figure.prototype.constructor = Figure;
return Figure;
});