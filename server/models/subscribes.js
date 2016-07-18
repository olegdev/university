/**
 * Модель подписки
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	email: String,
	type: String,
});
var model = mongoose.model('subscribes', schema);

module.exports = model;