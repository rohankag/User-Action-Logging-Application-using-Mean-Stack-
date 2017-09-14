var express = require('express');
var app = express(); 
var port = process.env.PORT || 3000;
var morgan = require('morgan'); // Import Morgan Package 
var mongoose = require('mongoose');
var router   = express.Router();
var appRoutes = require('./app/routes/api')(router);
var bodyParser = require('body-parser');
var path= require('path');



//End


app.use(morgan('dev')); // Morgan Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);


//http://localhost:8083/api/users

mongoose.connect('mongodb://localhost:27017/assignment1',function(err){
	if (err) {
		console.log("Not connected to the database: "+ err);
		
	}
	else{
		console.log('Successfully connected to mongodb');
	}
});
var MongooseHelper = {
	logUserInteraction: function(data){
			//TODO - log message save logic
	}
}

app.get('*', function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));

})

app.listen(port, function(){
	console.log('Running the server on port '+ port)
});

