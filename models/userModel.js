var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'name' : String,
	'password' : String
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
