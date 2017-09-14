var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ActionSchema = new Schema({
	username :{type: String, lowercase: true, required: true},
	eventtype:{type:String, required:true},
	timestamp : {type: Date, default: Date.now},

});

ActionSchema.pre('save', function(next) {
  var action=this;

  next();
});


module.exports = mongoose.model('Action', ActionSchema); 