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
	sport: String,
	style: String,
	pet: String,
	avatar: Number,
	shoppingProfile: Object
});
var model = mongoose.model('users', schema);

module.exports = model;