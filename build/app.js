(function(){
	var app = angular.module('port', ['listeners']);

//POPUP
	app.directive('popup', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/popup.html',
			controller: function(){
				console.log("popup");
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
				console.log("menu");
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
				console.log("topbar");
			},
			controllerAs:'topBar'
		};
	});

//HOME
	app.directive('home', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/home.html',
			controller: ['resize', function(resize){
				//var home = this;
					home.newheight = 0;
					home.newheight = resize();
			}],
			controllerAs:'home'
		};
	});

//ABOUT
	app.directive('about', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/about.html',
			controller: function(){
				console.log("about");
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
				console.log("portfolio");
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
