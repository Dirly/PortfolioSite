(function(){
	var app = angular.module('port', ['Navigation']);

//POPUP
	/*app.directive('popup', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/popup.html',
			controller: function(){
				console.log("popup");
			},
			controllerAs:'popup'
		};
	});*/

//MENU
	/*app.directive('menu', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/menu.html',
			controller: function(){
				console.log("menu");
			},
			controllerAs:'menu'
		};
	});*/

//TOPBAR
	/*app.directive('top-bar', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/topBar.html',
			controller: ['resize', 'navigation', '$scope', function(resize, navigation, $scope){

				var topBar = this;
				topBar.page = currentPage;
				
				$scope.newheight = $(window).height();
				
				//WATCH HEIGHT
				$scope.$on('height:updated', function(event,data){
					$scope.newheight = data;
				});

			}],
			controllerAs:'topBar'
		};
	});*/

//HOME
	app.directive('home', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/home.html',
			controller: ['Navigation', '$scope', '$timeout', function(Navigation, $scope, $timeout){

				var home = this;
					home.page = 1;
					home.name = "home";
					
				//turning on prev and next
				$timeout(function () {
					home.navigation = Navigation.pageInit(home.page);
				});

				//Watch page change
				$scope.$on('page:count', function(event,data){
					if(data === home.page){
						Navigation.announcePage(home.page);
					}
				});

				//Watch height change
				$scope.newheight = $(window).height();
				$scope.$on('height:updated', function(event,data){
					$scope.newheight = data;
					$scope.$apply();
				});

				//Wire Page Navigation
				$scope.pageNavigation = function(fromWhere, toWhere) {
					Navigation.changePage(fromWhere, toWhere);
				};
			}],
			controllerAs:'home'
		};
	});

//ABOUT
	app.directive('about', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/about.html',
			controller: ['Navigation', '$scope', '$timeout', function(Navigation, $scope, $timeout){

				var about = this;
					about.page = 2;
					about.name = "about";
					
				//turning on prev and next
				$timeout(function () {
					about.navigation = Navigation.pageInit(about.page);
				});

				//Watch page change
				$scope.$on('page:count', function(event,data){
					if(data === about.page){
						Navigation.announcePage(about.page);
					}
				});

				//Watch height change
				$scope.newheight = $(window).height();
				$scope.$on('height:updated', function(event,data){
					$scope.newheight = data;
					$scope.$apply();
				});

				//Wire Page Navigation
				$scope.pageNavigation = function(fromWhere, toWhere) {
					Navigation.changePage(fromWhere, toWhere);
				};
			}],
			controllerAs:'about'
		};
	});

//PORTFOLIO
	/*app.directive('portfolio', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/portfolio.html',
			controller: function(){
				console.log("portfolio");
			},
			controllerAs:'portfolio'
		};
	});*/


//CONTACT
	/*app.directive('contact', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/contact.html',
			controller: function(){

			},
			controllerAs:'contact'
		};
	});*/
})();
