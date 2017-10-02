console.log("routes");
var app=angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider, $locationProvider){

	$routeProvider.when('/',{
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/about',{
		templateUrl: 'app/views/pages/about.html'
	})

	.when('/contact',{
		templateUrl: 'app/views/pages/about.html'
	})

    .when('/check',{
        templateUrl: 'app/views/pages/check.html'
    })

	.when('/register', {
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regctrl',
        controllerAs: 'register',
        authenticated: false
        
    })

    .when('/login', {
        templateUrl: 'app/views/pages/users/login.html',
        authenticated: false
        
    })

    .when('/logout', {
        templateUrl: 'app/views/pages/users/logout.html',
        authenticated: true
        
    })

    .when('/profile', {
        templateUrl: 'app/views/pages/users/profile.html',
        authenticated: true
        
    })

    .when('/socialModeling', {
        templateUrl: 'app/views/pages/users/socialModeling.html',
        authenticated: true
        
    })
    .when('/LoginModel', {
        templateUrl: 'app/views/pages/users/LoginModel.html',
        authenticated: true
        
    })

	.otherwise({ redirectTo: '/'});

    $locationProvider.html5Mode({ enabled: true, requireBase: false }); // Required to remove AngularJS hash from URL (no base is required in index file)
 
});


app.run(['$rootScope','Auth','$location',function($rootScope,Auth,$location){
	$rootScope.$on('$routeChangeStart',function(event,next,current){
		if(next.$$route.authenticated==true){
			if(!Auth.isLoggedin()){
				event.preventDefault();
				$location.path('/');
			}

		}else if(next.$$route.authenticated==false){
			if(Auth.isLoggedin()){
				event.preventDefault();
				$location.path('/profile');
			}

		}

    
	});
}]);

