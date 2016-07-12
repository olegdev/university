var _ = require('underscore');

module.exports = {

	list: [
		{
			type: 'shopping',
			title: 'Shopping',
			color: '#00FF00',
			required: true,
			order: 0
		},
		{
			type: 'professional',
			title: 'Professional',
			color: '#00FFFF',
			required: true,
			order: 1
		},
		{
			type: 'health',
			title: 'Health',
			color: '#FFFFFF',
			order: 2
		},
		{
			type: 'food',
			title: 'Food',
			color: '#C0C0C0',
			order: 3
		},
		{
			type: 'family',
			title: 'Family',
			color: '#f5f7f0',
			order: 4
		},
		{
			type: 'friends',
			title: 'Friends',
			color: '#808080',
			order: 5
		},
		{
			type: 'education',
			title: 'Education',
			color: '#FF0000',
			order: 6
		},
		{
			type: 'spirituality',
			title: 'Spirituality',
			color: '#800000',
			order: 7
		},
		{
			type: 'travel',
			title: 'Travel',
			color: '#FFFF00',
			order: 8
		},
		{
			type: 'music',
			title: 'Music',
			color: '#808000',
			order: 9
		},
		{
			type: 'video',
			title: 'Video',
			color: '#008000',
			order: 10
		},
		{
			type: 'finance',
			title: 'Finance',
			color: '#008080',
			order: 11
		},
		{
			type: 'dating',
			title: 'Dating',
			color: '#0000FF',
			order: 12
		},
		{
			type: 'nature',
			title: 'Nature',
			color: '#000080',
			order: 13
		},
		{
			type: 'gaming',
			title: 'Gaming',
			color: '#90cef4',
			order: 14
		},
		{
			type: 'charity',
			title: 'Charity',
			color: '#FF00FF',
			order: 15
		},
		{
			type: 'pet',
			title: 'Pet',
			color: 'red',
			order: 16
		},
		{
			type: 'books',
			title: 'Books',
			color: '#800080',
			order: 17
		},
		{
			type: 'hobby',
			title: 'Hobbies',
			color: '#000000',
			order: 18
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