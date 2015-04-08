(function(){
	var app = angular.module('port', ['GlobalListeners', 'Navigations']);

//MAIN 
	app.directive('main', ['GlobalListeners', '$timeout', function(GlobalListeners, $timeout) {
		return function (scope, element, attrs) {
			//DELAY NEEDS TO EXIST FOR DOM LOAD
			$timeout(function () {
				mainHeight = $(document).height();
				console.log(mainHeight);
			}, 100);
		};
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
			controller: ['Navigations', '$scope', function(Navigations, $scope){

				var home = this;
					home.page = 1;
					home.name = "home";
					home.next = true;
					home.prev = false;

				$scope.newheight = $(window).height();

				//INCREASE PAGE COUNT
				Navigations.pageInit(home.page, "home");
				
				//WATCH HEIGHT
				$scope.$on('height:updated', function(event,data){
					$scope.newheight = data;
					$scope.$apply();
				});

				//Wire Page Navigation
				$scope.pageNavigation = function(fromWhere, toWhere) {
					Navigations.changePage(fromWhere, toWhere);
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
			controller: ['Navigations', '$scope', function(Navigations, $scope){

				var about = this;
				about.page = 2;
				about.next = true;
				about.prev = true;
				$scope.newheight = $(window).height();

				//INCREASE PAGE COUNT
				Navigations.pageInit(about.page, "about");

				//Watch height change
				$scope.$on('height:updated', function(event,data){
					$scope.newheight = data;
					$scope.$apply();
				});

				//Wire Page Navigation
				$scope.pageNavigation = function(fromWhere, toWhere) {
					Navigations.changePage(fromWhere, toWhere);
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
