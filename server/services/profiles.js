module.exports = {

	factory: function(type) {
		var data = {type: type, connections: [], photo: ''};
		return this.normalize(type, data);
	},

	normalize: function(type, data) {

		data.type = type;

		if (data.connections) {
			if (typeof data.connections == 'string') {
				data.connections = [data.connections];
			}
		} else {
			data.connections = [];
		}

		if (type == 'shopping') {
			data.color = 'blue';
			data.title = 'Shopping';
		} else if (type == 'professional') {
			data.color = 'green';
			data.title = 'Professional';
			if (data.companies) {
				if (typeof data.companies == 'string') {
					data.companies = [data.companies];
				}
			} else {
				data.companies = [];
			}
		} else if (type == 'pet') {
			data.color = 'red';
			data.title = 'Pet';
		} else if (type == 'books') {
			data.color = 'yellow';
			data.title = 'Books';
		} else if (type == 'hobby') {
			data.color = 'grey';
			data.title = 'Hobby';
		} else if (type == 'design') {
			data.color = 'brown';
			data.title = 'Design';
		} else if (type == 'sport') {
			data.color = 'black';
			data.title = 'Sport';
		} else {
			data.color = 'white';
			data.title = '..';
		}

		return data;
	}
}