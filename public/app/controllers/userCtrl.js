angular.module('userControllers', ['userServices'])

.controller('regctrl', function($http,$location, $timeout,User){

	var app=this;
	this.regUser= function(regData){
		app.errorMsg=false;
         
         User.create(app.regData).then(function(data){

			 if(data.data.success){

			 	app.successMsg= data.data.message + '..redirecting to login page';
			 	$timeout(function(){
			 		$location.path('/');

			 	},2000);
			 	

			 }  
			 else{
			 	app.errorMsg= data.data.message;
			 }
		});
	};
});

 