var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LogSchema = new Schema({
	username :{type: String, lowercase: true, required: true},
	timestamp : {type: Date, default: Date.now},

});

LogSchema.pre('save', function(next) {
  var log=this;

  next();
});


module.exports = mongoose.model('Log', LogSchema); 