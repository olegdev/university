/**
 * Модель пользователя
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	age: Number,
	gender: Number,
	country: String,
	city: String,
	email: String,
	pass: String,
	avatar: Number,

	sport: String,
	style: String,
	pet: String,
	shoppingProfile: Object,

	exists_profiles: Array, // List of types connected profiles

	profiles: Object, // List of profiles. Key is a profile type

	connections: Object, // List of connections. Key is a profile type (eg. {sport: [...], pet: [...]})


});
var model = mongoose.model('users', schema);

module.exports = model;