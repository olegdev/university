var _ = require('underscore');

module.exports = {

	list: [
		{
			type: 'shopping',
			title: 'Shopping',
			color: 'blue',
			required: true,
			order: 0
		},
		{
			type: 'professional',
			title: 'Professional',
			color: 'green',
			required: true,
			order: 1
		},
		{
			type: 'health',
			title: 'Health',
			color: '#ff8391',
			order: 2
		},
		{
			type: 'food',
			title: 'Food',
			color: '#0938ab',
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
			color: '#9386af',
			order: 5
		},
		{
			type: 'education',
			title: 'Education',
			color: '#629255',
			order: 6
		},
		{
			type: 'spirituality',
			title: 'Spirituality',
			color: '#262003',
			order: 7
		},
		{
			type: 'travel',
			title: 'Travel',
			color: '#82f930',
			order: 8
		},
		{
			type: 'music',
			title: 'Music',
			color: '#faf390',
			order: 9
		},
		{
			type: 'video',
			title: 'Video',
			color: '#0a9255',
			order: 10
		},
		{
			type: 'finance',
			title: 'Finance',
			color: '#f7c733',
			order: 11
		},
		{
			type: 'dating',
			title: 'Dating',
			color: '#5209ff',
			order: 12
		},
		{
			type: 'nature',
			title: 'Nature',
			color: '#cc77ae',
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
			color: '#efedea',
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
			color: 'yellow',
			order: 17
		},
		{
			type: 'hobby',
			title: 'Hobbies',
			color: 'grey',
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