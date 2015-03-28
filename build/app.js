(function(){
	var app = angular.module('port',[ ]);

//POPUP
	app.directive('popup', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/popup.html',
			controller: function(){

			},
			controllerAs:'popup'
		};
	});

//MENU
	app.directive('menu', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/menu.html',
			controller: function(){

			},
			controllerAs:'menu'
		};
	});

//TOPBAR
	app.directive('top-bar', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/topBar.html',
			controller: function(){

			},
			controllerAs:'topBar'
		};
	});

//HOME
	app.directive('home', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/home.html',
			controller: function(){

			},
			controllerAs:'home'
		};
	});

//ABOUT
	app.directive('about', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/about.html',
			controller: function(){

			},
			controllerAs:'about'
		};
	});

//PORTFOLIO
	app.directive('portfolio', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/portfolio.html',
			controller: function(){

			},
			controllerAs:'portfolio'
		};
	});


//CONTACT
	app.directive('contact', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/contact.html',
			controller: function(){

			},
			controllerAs:'contact'
		};
	});

})();
