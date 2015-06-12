
(function(){
	var app = angular.module('port', ['Navigation', 'PolyGraph', 'Carousel']);

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
			controller: ['Navigation', 'PolyGraph', '$scope', '$timeout', function(Navigation, PolyGraph, $scope, $timeout){

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

				//Custom Page function block ------------------

				//Wired up PolyGraph
				PolyGraph.getData("assets/src/skills.json",function(){
					about.skills = PolyGraph.returnData();
					about.graph = PolyGraph.setGraph(about.skills, 40, 350, 40,"2008","present");

					//BUILDING BUCKETS
					function activeFocus (){
						var currentBucket,
							skillPush = [],
							buckets = {};

						for (var i = 0; i < about.skills.length; i++) {
							if(about.skills[i].bucket !== currentBucket){
								skillPush = [];
								currentBucket = about.skills[i].bucket;
								skillPush.push("inactive");
								buckets[currentBucket] = skillPush;
							} else {
								skillPush.push("inactive");
								buckets[currentBucket] = skillPush;
							}
						}
						return buckets;
					}
					about.activeFocus = activeFocus();
					
					//DECIFER VALUES TO POINTS
					$scope.aquireCords = function(state, points){
						if(state === "active"){
							return PolyGraph.aquireCords(points);
						} else {
							return PolyGraph.aquireCords("blank");
						}
					};

					//ANIMATES
					$scope.activateFocuses = function(bucket, index, name){
						var target;
						if(about.activeFocus[bucket][index] === "active"){
							target = document.getElementById("skillAnimate_" + name + "_inActive");
							about.activeFocus[bucket][index] = "inactive";
							target.beginElement();
						} else if(about.activeFocus[bucket][index] === "inactive"){
							target = document.getElementById("skillAnimate_" + name + "_active");
							about.activeFocus[bucket][index] = "active";
							target.beginElement();
						}
					};
				});

				//---------------------------------------------

			}],
			controllerAs:'about'
		};
	});

//PORTFOLIO
	app.directive('portfolio', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/portfolio.html',
			controller: ['Navigation', 'Carousel', '$scope', '$timeout', function(Navigation, Carousel, $scope, $timeout){

				var portfolio = this;
					portfolio.page = 3;
					portfolio.name = "portfolio";
					
				//turning on prev and next
				$timeout(function () {
					portfolio.navigation = Navigation.pageInit(portfolio.page);
				});

				//Watch page change
				$scope.$on('page:count', function(event,data){
					if(data === portfolio.page){
						Navigation.announcePage(portfolio.page);
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

				//Custom Page function block ------------------

				//Wired up Carousel
				Carousel.getData("assets/src/cases.json",function(){
					portfolio.activeFocus = 0;
					portfolio.case = Carousel.returnData();

					$scope.carouselFocus = function(index, activeFocus, caseName){
						return Carousel.declareState(index, activeFocus, caseName);
					};

					$scope.carouselNavigation = function(activeFocus, toWhere){
						portfolio.activeFocus = Carousel.changeFocus(activeFocus, toWhere);
					};
				});

				//---------------------------------------------
			}],
			controllerAs:'portfolio'
		};
	});


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


//CUSTOM FILTERS
	app.filter('bucketCheck', function() {
		return function(items, bucket) {
			var filtered = [];
			angular.forEach(items, function(item) {
				if(bucket === item.bucket) {
					filtered.push(item);
				}
			});
			return filtered;
		};
	});



})();
