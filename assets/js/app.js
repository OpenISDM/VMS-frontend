var app = angular.module("myApp", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/login");

	$stateProvider
		.state('register', {
			url: "/register",
			templateUrl: "app/components/user/userPrivacy.html"
		});
});