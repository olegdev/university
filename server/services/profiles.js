var _ = require('underscore');

module.exports = {

	list: [
		{
			type: 'shopping',
			title: 'Shopping',
			color: '#b5121b',
			required: true,
			order: 0
		},
		{
			type: 'professional',
			title: 'Professional',
			color: '#eeb84c',
			required: true,
			order: 1
		},
		{
			type: 'health',
			title: 'Health',
			color: '#c75100',
			order: 2
		},
		{
			type: 'food',
			title: 'Food',
			color: '#ffe95b',
			order: 3
		},
		{
			type: 'family',
			title: 'Family',
			color: '#0011ff',
			order: 4
		},
		{
			type: 'friends',
			title: 'Friends',
			color: '#e3ff95',
			order: 5
		},
		{
			type: 'education',
			title: 'Education',
			color: '#79ce16',
			order: 6
		},
		{
			type: 'spirituality',
			title: 'Spirituality',
			color: '#88a3de',
			order: 7
		},
		{
			type: 'travel',
			title: 'Travel',
			color: '#6cbbc4',
			order: 8
		},
		{
			type: 'music',
			title: 'Music',
			color: '#cdafc3',
			order: 9
		},
		{
			type: 'video',
			title: 'Video',
			color: '#f64e3f',
			order: 10
		},
		{
			type: 'finance',
			title: 'Finance',
			color: '#09b3a7',
			order: 11
		},
		{
			type: 'dating',
			title: 'Dating',
			color: '#ee6363',
			order: 12
		},
		{
			type: 'nature',
			title: 'Nature',
			color: '#99aa99',
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
			color: '#c51d1d',
			order: 15
		},
		{
			type: 'pet',
			title: 'Pet',
			color: '#ffa500',
			order: 16
		},
		{
			type: 'books',
			title: 'Books',
			color: '#8b3a3a',
			order: 17
		},
		{
			type: 'hobby',
			title: 'Hobbies',
			color: '#e0eee0',
			order: 18
		},
		//{
		//	type: 'sport',
		//	title: 'Sport',
		//	color: '#8b7355',
		//	order: 19
		//},
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