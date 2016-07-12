define([
	'figures/tetra',
	'figures/peta',
	'figures/sixta',
	'figures/7ta',
	'figures/8ta',
	'figures/9ta',
	'figures/10ta',
	'figures/11ta',
	'figures/12ta',
	'figures/13ta',
	'figures/14ta',
	'figures/15ta',
	'figures/16ta',
	'figures/17ta',
	'figures/18ta',
	'figures/19ta',
], function(Tetra, Peta, Sixta, f7ta, f8ta, f9ta, f10ta, f11ta, f12ta, f13ta, f14ta, f15ta, f16ta, f17ta, f18ta, f19ta) {
	var FigureFactory = {
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
				case 4: 
					figure = new Tetra(config);
					break;
				case 5:
					figure = new Peta(config);
					break;
				case 6:
					figure = new Sixta(config);
					break;
				case 7:
					figure = new f7ta(config);
					break;
				case 8:
					figure = new f8ta(config);
					break;
				case 9:
					figure = new f9ta(config);
					break;
				case 10:
					figure = new f10ta(config);
					break;
				case 11:
					figure = new f11ta(config);
					break;
				case 12:
					figure = new f12ta(config);
					break;
				case 13:
					figure = new f13ta(config);
					break;
				case 14:
					figure = new f14ta(config);
					break;
				case 15:
					figure = new f15ta(config);
					break;
				case 16:
					figure = new f16ta(config);
					break;
				case 17:
					figure = new f17ta(config);
					break;
				case 18:
					figure = new f18ta(config);
					break;
				case 19:
				default:
					figure = new f19ta(config);
					break;
			}

			figure.create(scene);
			return figure;
		}
	}

	return FigureFactory;
});