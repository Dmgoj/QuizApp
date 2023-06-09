/**
 * Questions are from https://opentdb.com/api.php?amount=50
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var questionsSchema = new Schema({
	'category' : String,
	'type' : String,
	'difficulty' : String,
	'question' : String,
	'correct_answer' : String,
	'incorrect_answers' : Array
});

module.exports = mongoose.model('questions', questionsSchema);


