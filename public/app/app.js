
angular.module('userApp', ['appRoutes','userControllers','userServices','mainController','authServices'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('Authinterceptors');
});

