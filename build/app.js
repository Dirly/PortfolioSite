(function(){
	var app = angular.module('port', ['globalListeners', 'navigations']);


	app.controller('MainCtrl', ['globalListeners', function(globalListeners) {
		//CLOSES POPUP
		



	}]);


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
			controller: ['navigations', '$scope', function(navigations, $scope){

				var home = this;
					home.page = 1;
					home.name = "home";
					home.next = true;
					home.prev = false;

				$scope.newheight = $(window).height();

				//Increase Page Count
				navigations.pageInit(home.page, "home");
				
				
				//WATCH HEIGHT
				$scope.$on('height:updated', function(event,data){
					$scope.newheight = data;
					$scope.$apply();
				});

				//Wire Page Navigation
				$scope.pageNavigation = function(fromWhere, toWhere) {
					navigations.changePage(fromWhere, toWhere);
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
			controller: ['navigations', '$scope', function(navigations, $scope){

				var about = this;
				about.page = 2;
				about.next = true;
				about.prev = true;
				$scope.newheight = $(window).height();
				

				//Watch height change
				$scope.$on('height:updated', function(event,data){
					$scope.newheight = data;
					$scope.$apply();
				});

				//Wire Page Navigation
				$scope.pageNavigation = function(fromWhere, toWhere) {
					navigations.changePage(fromWhere, toWhere);
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
