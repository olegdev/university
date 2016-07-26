define([
	'konstructor/Model',
	'konstructor/Vertice',
	'konstructor/Face'
], function(Model, Vertice, Face) {

	var Konstructor = {
		generate: function(vCount) {
			var faces = [],
				vertices = [],
				vCount1, vCount2, vCount3, vCount4,
				faceIndex = 0;

			if (vCount < 8 || vCount > 16) {
				alert('Количество вершин не может быть меньше 8 и больше 16');
				return;
			}

			// каркас

			vertices = [
				new Vertice(-200, 200, 200),
				new Vertice(200, 200, 200),
				new Vertice(200, -200, 200),
				new Vertice(-200, -200, 200),
				new Vertice(-200, 200, -200),
				new Vertice(200, 200, -200),
				new Vertice(200, -200, -200),
				new Vertice(-200, -200, -200),
			];

			// структура первых двух граней куба

			vCount1 = Math.ceil((vCount - 8)/4);

			if (vCount1 == 0) {
				faces.push(new Face(++faceIndex, vertices[0], vertices[2], vertices[3]));
				faces.push(new Face(faceIndex, vertices[0], vertices[1], vertices[2]));
				faces.push(new Face(++faceIndex, vertices[3], vertices[6], vertices[7]));
				faces.push(new Face(faceIndex, vertices[3], vertices[2], vertices[6]));
			} else if (vCount1 == 1) {
				var newVert = new Vertice(0, -200, 200);
				faces.push(new Face(++faceIndex, vertices[0], newVert, vertices[3]));
				faces.push(new Face(faceIndex, vertices[0], newVert, vertices[1]));
				faces.push(new Face(faceIndex, newVert, vertices[1], vertices[2]));
				faces.push(new Face(++faceIndex, vertices[3], newVert, vertices[7]));
				faces.push(new Face(faceIndex, vertices[7], newVert, vertices[6]));
				faces.push(new Face(faceIndex, vertices[6], newVert, vertices[2]));
			} else if (vCount1 == 2) {
				//
			}

			// структура третей и четвертой граней куба

			vCount2 = Math.ceil((vCount - 8 - vCount1)/4);

			if (vCount2 == 0) {
				faces.push(new Face(++faceIndex, vertices[4], vertices[6], vertices[7]));
				faces.push(new Face(faceIndex, vertices[4], vertices[5], vertices[6]));
				faces.push(new Face(++faceIndex, vertices[0], vertices[1], vertices[5]));
				faces.push(new Face(faceIndex, vertices[0], vertices[5], vertices[4]));
			} else if (vCount2 == 1) {
				var newVert = new Vertice(0, 200, -200);
				faces.push(new Face(++faceIndex, vertices[7], newVert, vertices[4]));
				faces.push(new Face(faceIndex, vertices[7], newVert, vertices[6]));
				faces.push(new Face(faceIndex, vertices[6], newVert, vertices[5]));
				faces.push(new Face(++faceIndex, vertices[0], newVert, vertices[4]));
				faces.push(new Face(faceIndex, vertices[0], newVert, vertices[1]));
				faces.push(new Face(faceIndex, vertices[1], newVert, vertices[5]));
			} else if (vCount2 == 2) {
				//
			}			

			// структура пятой грани куба

			vCount3 = Math.ceil((vCount - 8 - vCount1 - vCount2)/4);

			if (vCount3 == 0) {
				faces.push(new Face(++faceIndex, vertices[1], vertices[6], vertices[2]));
				faces.push(new Face(faceIndex, vertices[1], vertices[5], vertices[6]));
			} else if (vCount3 == 1) {
				var newVert = new Vertice(200, -200, 0);
				faces.push(new Face(++faceIndex, vertices[2], newVert, vertices[1]));
				faces.push(new Face(faceIndex, vertices[1], newVert, vertices[5]));
				faces.push(new Face(faceIndex, vertices[6], newVert, vertices[5]));
			} else if (vCount3 == 2) {
				//
			}	

			// структура шестой грани куба

			vCount4 = Math.ceil((vCount - 8 - vCount1 - vCount2 - vCount3)/4);

			if (vCount4 == 0) {
				faces.push(new Face(++faceIndex, vertices[0], vertices[7], vertices[3]));
				faces.push(new Face(faceIndex, vertices[0], vertices[4], vertices[7]));
			} else if (vCount4 == 1) {
				var newVert = new Vertice(-200, 200, 0);
				faces.push(new Face(++faceIndex, vertices[0], newVert, vertices[3]));
				faces.push(new Face(faceIndex, vertices[3], newVert, vertices[7]));
				faces.push(new Face(faceIndex, vertices[7], newVert, vertices[4]));
			} else if (vCount4 == 2) {
				//
			}


			var model = new Model(faces);
			return model;
		}
	};

	return Konstructor;

});