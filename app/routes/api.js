
var User= require('../models/user');
var Log= require ('../models/log');	
var Action= require ('../models/action'); 
var jwt = require('jsonwebtoken');
var secret= 'adaptive';

var ses_user= null;
module.exports= function(router){

   
   //route for user registration
   router.post('/users', function(req, res){
     var user= new User();
    
     user.username= req.body.username;
     user.password= req.body.password;
     user.email= req.body.email;
     
     if(req.body.username==null || req.body.username== '' || req.body.password==null || req.body.password== '' || req.body.email==null || req.body.email== ''){
     	res.json({success: false, message: 'Email, username and password required'});

     } else{
     	 user.save(function(err){

     	if(err){
     		res.json({success: false, message: 'username or email already exists'});
     	}
     	else{
        
     		res.json({success: true, message: 'user created Successfully'});
     	}
     });
     }
     
     
});
    //http://localhost:8083/api/authenticate
   //router for user login
   router.post('/authenticate', function(req,res){


      User.findOne({username: req.body.username}).select('email username password').exec(
      	function(err,user){
      		if(err) throw (err);
            
            if(!user){
            	res.json({success:false, message: 'Invalid user'});
            }  
            else if(user){
            	var validPassword=user.comparePassword(req.body.password);
            	if(!validPassword){
                   res.json({success: false, message: 'Invalid password'});
            	} else{
                 var log=new Log();
                 log.username=req.body.username;
                 log.save();
                ses_user=user.username;
                 
                var token= jwt.sign({username: user.username, email: user.email }, secret,{expiresIn: '24h' })
            		res.json({success: true, message: 'Successfully validated', token : token});
            	}
            }
      	}); 

      
   });

   router.post('/logs',function(req,res){

Log.find({username: req.body.username}).select('timestamp').exec(
        function(err,logs){
    //  Log.find({username: req.body.username},function(err,logs){
          if(err) throw (err);
            
             else{
                //for(a : timestamp)
                console.log("timestamp");
                res.json ({loguser : logs});
              }
            })
        }); 

   router.post('/action',function(req,res){
     var action= new Action();
    
     action.username= ses_user;
     action.eventtype= req.body.eventype;
     action.save();
     //console.log(req.body.eventype);
     res.send(req.body.eventype);

   });


    router.post('/actioncount',function(req,res){
   var query = [{"$group": {_id: {username:"$username", action: "$eventtype"}, count: {$sum: 1}}}, { $sort : { _id: 1}}];
   Action.aggregate(query).exec(
        function(err,logs){
    //  Log.find({username: req.body.username},function(err,logs){
          if(err) throw (err);
            
             else{
                res.json ({events : logs});
              }
            })
        }); 

    router.post('/totalactioncount',function(req,res){
   Action.find({}).select('eventtype timestamp').exec(
        function(err,logs){
    //  Log.find({username: req.body.username},function(err,logs){
          if(err) throw (err);
            
             else{
                //for(a : timestamp)
                //console.log("eventtype");
                res.json ({events : logs});
              }
            })
        }); 

    router.post('/logcount',function(req,res){

      var query = [{"$group": {_id: {user: "$username", year: {"$year": "$timestamp"}, month: {"$month": "$timestamp"},day: {"$dayOfMonth": "$timestamp"}}, count: {"$sum": 1 }}}, { $sort: { _id: 1}}];
 //  var query = [{"$group": {_id: {username:"$username", action: "$eventtype"}, count: {$sum: 1}}}, { $sort : { _id: 1}}];
   Log.aggregate(query).exec(
        function(err,logs){
    //  Log.find({username: req.body.username},function(err,logs){
          if(err) throw (err);
            
             else{
              console.log(logs);
                res.json ({events : logs});
              }
            })
        }); 


   router.post('/actionlog',function(req,res){

Action.find({username: req.body.username}).select('eventtype timestamp').exec(
        function(err,logs){
    //  Log.find({username: req.body.username},function(err,logs){
          if(err) throw (err);
            
             else{
                //for(a : timestamp)
                //console.log("eventtype");
                res.json ({events : logs});
              }
            })
        }); 

      
   




   router.use(function(req,res,next){
     var token= req.body.token || req.body.query || req.headers['x-access-token'];
     
     if(token){
          jwt.verify(token,secret, function(err, decoded){
            if(err){res.json({success:false,message:'Token invalid'});}
            else {
              req.decoded=decoded;
              next();
            }
          });
     } else{
       res.json({success:false, message: 'No token provided'});
     }


   });

   router.post('/me',function(req,res){
    res.send(req.decoded);
   })
   return router;


}




