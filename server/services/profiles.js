var _ = require('underscore');

module.exports = {

	list: [
		{
			type: 'shopping',
			title: 'Shopping',
			color: 'blue',
			required: true,
		},
		{
			type: 'professional',
			title: 'Professional',
			color: 'green',
			required: true,
		},
		{
			type: 'pet',
			title: 'Pet',
			color: 'red',
		},
		{
			type: 'books',
			title: 'Books',
			color: 'yellow',
		},
		{
			type: 'hobby',
			title: 'Hobby',
			color: 'grey',
		},
		{
			type: 'design',
			title: 'Design',
			color: 'brown',
		},
		{
			type: 'sport',
			title: 'Sport',
			color: 'black',
		},
	],

	factory: function(type, data) {
		var data = _.extend({type: type, connections: [], photo: ''}, data || {});
		return this.normalize(type, data);
	},

	normalize: function(type, data) {
		var defaults = {};

		this.list.forEach(function(item) {
			if (item.type == type) {
				defaults = item;
			}
		});

		data = _.extend(defaults, data);

		if (data.connections) {
			if (typeof data.connections == 'string') {
				data.connections = [data.connections];
			}
		} else {
			data.connections = [];
		}

		if (type == 'professional') {
			if (data.companies) {
				if (typeof data.companies == 'string') {
					data.companies = [data.companies];
				}
			} else {
				data.companies = [];
			}
		}

		return data;
	}
}