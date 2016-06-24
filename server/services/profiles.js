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
			type: 'health',
			title: 'Health',
			color: '#ff8391',
		},
		{
			type: 'food',
			title: 'Food',
			color: '#0938ab',
		},
		{
			type: 'family',
			title: 'Family',
			color: '#f5f7f0',
		},
		{
			type: 'friends',
			title: 'Friends',
			color: '#9386af',
		},
		{
			type: 'education',
			title: 'Education',
			color: '#629255',
		},
		{
			type: 'spirituality',
			title: 'Spirituality',
			color: '#262003',
		},
		{
			type: 'travel',
			title: 'Travel',
			color: '#82f930',
		},
		{
			type: 'music',
			title: 'Music',
			color: '#faf390',
		},
		{
			type: 'video',
			title: 'Video',
			color: '#629255',
		},
		{
			type: 'finance',
			title: 'Finance',
			color: '#f7c733',
		},
		{
			type: 'dating',
			title: 'Dating',
			color: '#5209ff',
		},
		{
			type: 'nature',
			title: 'Nature',
			color: '#cc77ae',
		},
		{
			type: 'gaming',
			title: 'Gaming',
			color: '#90cef4',
		},
		{
			type: 'charity',
			title: 'Charity',
			color: '#efedea',
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
			title: 'Hobbies',
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