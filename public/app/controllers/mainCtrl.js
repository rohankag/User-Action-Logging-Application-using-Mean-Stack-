angular.module('mainController', ['authServices'])

.controller('mainCtrl',function(Auth, $timeout, $location,$rootScope){

 //var socket = io('http://localhost');
 // socket.on('connected', function (data) {
   // console.log(data);
    // socket.emit('user-interaction', { my: 'data', username: "Rohank Agarwal" });
  //});



   var app=this;

   $rootScope.$on('$routeChangeStart',function(){
      if(Auth.isLoggedin()){

   	app.isLoggedin= true;
   	Auth.getUser().then(function(data){
   		
   		app.username= data.data.username;
       Auth.getLog(data.data).then(function(data){
       	 console.log("checked");
       console.log(data.data.loguser);
       app.logs=data.data.loguser;
       })

       Auth.getAction(data.data).then(function(data){
       	 console.log("checked Action log");

       console.log(data.data.events);
       app.actions=data.data.events
      // app.logs=data.data.loguser;
       })


   		//app.log= "ddss";
   	});

   
   }else{
   	app.isLoggedin= false;
   	app.username= '';
   }
   });
   
   
  
	this.dologin= function(loginData){
		app.errorMsg=false;
         Auth.login(app.loginData).then(function(data){

			 if(data.data.success){

			 	app.successMsg= data.data.message + '..redirecting to dashboard';
			 	$timeout(function(){
			 		$location.path('/profile');
			 		app.loginData='';
			 		app.successMsg='';
                   app.errorMsg=false;
                   app.log="dd";
			 	},1000);
			 	

			 }  
			 else{
			 	app.errorMsg= data.data.message;
			 }
		})

        

	};

	this.logout= function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){
          $location.path('/');
		},1000)
	};
	
});




