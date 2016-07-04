define(['threejs', 'underscore', 'figures/tetra'], function(th, _, Tetra) {

var Figure = function(config) {
	this.config = config;
	this.objects = [];

	this.faces = [{
		vertices: [
			[
				[-200, -200, -200],
				[200, -200, -300],
				[-300, -200, 300],
			],
			[
				'0:0:1',
				[300, -200, 200],
				'0:0:2',	
			]
		],
		multi: true,
		rotation: {radius: 1000, phi: 3.141591653589793, theta: 0.2199114857512854},
	},{
		vertices: [
			[
				[-300, 200, -300],
				[300, 200, -200],
				[-200, 200, 200],
			],
			[
				'1:0:1',
				[200, 200, 300],
				'1:0:2',	
			]
		],
		multi: true,
		rotation: {radius: 999.9999999999992, phi: 0.000001000044449303342, theta: -1.5917402778188283},
	},{
		vertices: [
			'0:0:0',
			'0:0:1',
			'1:0:0',
		],
		rotation:  {radius: 999.9999999999987, phi: 1.6336271798222497, theta: 3.1311206780778247},
	},{
		vertices: [
			'0:0:1',
			'1:0:1',
			'1:0:0',
		],
		rotation:  {radius: 999.9999999999987, phi: 1.6336271798222497, theta: 3.1311206780778247},
	},{
		vertices: [
			'0:0:0',
			'0:0:2',
			'1:0:0',
		],
		rotation: {radius: 999.9999999999989, phi: 1.6650431060251434, theta: -1.675516081914556},
	},{
		vertices: [
			'1:0:0',
			'1:0:2',
			'0:0:2',	
		],
		rotation: {radius: 999.9999999999989, phi: 1.6650431060251434, theta: -1.675516081914556},
	},{
		vertices: [
			'0:0:1',
			'0:1:1',
			'1:0:1',
		],
		rotation: {radius: 1000.000000000001, phi: 1.8849545917764274, theta: 1.989675347273551},
	},{
		vertices: [
			'1:0:1',
			'1:1:1',
			'0:1:1',
		],
		rotation: {radius: 999.9999999999984, phi: 1.2985239631063359, theta: 1.4660765716752384},
	},{
		vertices: [
			'0:1:1',
			'0:0:2',
			'1:1:1',
		],
		rotation: {radius: 1000.0000000000166, phi: 1.8221247394595252, theta: 0.41189770347069277},
	},{
		vertices: [
			'0:0:2',
			'1:0:2',
			'1:1:1',	
		],
		rotation: {radius: 1000.0000000000091, phi: 1.5289094251244815, theta: 0.010471975511967374},
	}];
}

Figure.prototype = new Tetra({});
Figure.prototype.constructor = Figure;
return Figure;
});