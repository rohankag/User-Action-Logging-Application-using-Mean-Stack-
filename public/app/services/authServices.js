angular.module('authServices',[])

.factory('Auth',function($http, AuthToken,$route){
	var authFactory= {};
    
    //User.create(regData);
    authFactory.login = function(loginData){
    	return $http.post('/api/authenticate', loginData).then(function(data){
      
        AuthToken.setToken(data.data.token);
        return data;
    	});
    }


    authFactory.isLoggedin= function(){
	  if(AuthToken.getToken()){
	  	return true;
	  } else{
	  	return false;
	  }
    };
   
    authFactory.getUser= function(){
      if(AuthToken.getToken()){
      	return $http.post('/api/me');
      }  else{
      	       $q.reject({message : 'User has no token'});
      }
    };

    authFactory.getLog= function(loginData){
     // return return $http.post('/api/me');
     
     console.log(loginData);
     return $http.post('/api/logs', loginData).then(function(data){
        
        //AuthToken.setToken(data.data.token);
        return data;
      });
    };

    authFactory.getAction= function(loginData){
     // return return $http.post('/api/me');
     
     //console.log(loginData);
     return $http.post('/api/actionlog', loginData).then(function(data){
        //AuthToken.setToken(data.data.token);
        return data;
      });
    };

    authFactory.getTotalAction= function(loginData){
     // return return $http.post('/api/me');
     
     //console.log(loginData);
     return $http.post('/api/totalactioncount', loginData).then(function(data){
        //AuthToken.setToken(data.data.token);
        return data;
      });
    };

    authFactory.getActioncount= function(loginData){
     // return return $http.post('/api/me');
     
     //console.log(loginData);
     return $http.post('/api/actioncount', loginData).then(function(data){
        //AuthToken.setToken(data.data.token);
        return data;
      });
    };

    authFactory.getLogcount= function(loginData){
     // return return $http.post('/api/me');
     
     //console.log(loginData);
     return $http.post('/api/logcount', loginData).then(function(data){
        //AuthToken.setToken(data.data.token);
        return data;
      });
    };

    

     authFactory.logout= function(){
          AuthToken.setToken();
       };

      


    return authFactory;
})





.factory('AuthToken', function($window){

	var authTokenFactory= {};
    
    //AuthToken.setToken(token);

    authTokenFactory.setToken= function(token){
        if(token){
        	$window.localStorage.setItem('token',token);
        }else{
        	$window.localStorage.removeItem('token');
        }
        
    }

    authTokenFactory.getToken= function(token){
      return  $window.localStorage.getItem('token');
    }

	return authTokenFactory;
})


.factory('Authinterceptors',function(AuthToken){
   var authinterceptorsFactory= {};

   authinterceptorsFactory.request =function(config){
     
     var token=AuthToken.getToken();
     if(token) config.headers['x-access-token'] = token;
     return config;
   };


   return authinterceptorsFactory;
});
