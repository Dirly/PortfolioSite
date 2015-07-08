

(function(){
	var app = angular.module('port', ['Navigation', 'PolyGraph', 'Carousel']);

//POPUP
	app.directive('popup', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/popup.html',
			controller: ['Navigation', '$scope', function(Navigation, $scope){
				var popup = this;

				//Watch page change
				$scope.$on('popup:content', function(event,data){
					if(data){
						popup.content = data;
					}
				});
				
			}],
			controllerAs:'popup'
		};
	});

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
	app.directive('topbar', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/topbar.html',
			controller: ['Navigation', '$scope', function(Navigation, $scope){
				var topbar = this;

				//Watch page change
				$scope.$on('page:name', function(event,data){
					topbar.location = data;
					$scope.$apply();
				});
				
			}],
			controllerAs:'topbar'
		};
	});

//HOME
	app.directive('home', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/home.html',
			controller: ['Navigation', '$scope', '$timeout', function(Navigation, $scope, $timeout){

				var home = this;
					home.page = 1;
					home.name = "HOME";

					
				//turning on prev and next
				$timeout(function () {
					home.navigation = Navigation.pageInit(home.page);
				});

				//Watch page change
				$scope.$on('page:count', function(event,data){
					if(data === home.page){
						Navigation.announcePage(home.name);
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
					about.name = "SKILLS";
					
				//turning on prev and next
				$timeout(function () {
					about.navigation = Navigation.pageInit(about.page);
				});

				//Watch page change
				$scope.$on('page:count', function(event,data){
					if(data === about.page){
						Navigation.announcePage(about.name);	
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
					about.graph = PolyGraph.setGraph(about.skills, 40, 275, 40,"2008","present");

					//BUILDING BUCKETS
					function activeFocus (){
						var currentBucket,
							skillPush = [],
							buckets = {};

						for (var i = 0; i < about.skills.length; i++) {
							if(about.skills[i].bucket !== currentBucket){
								skillPush = [];
								currentBucket = about.skills[i].bucket;
								skillPush.push({"status" : "inactive", "name" : about.skills[i].name});
								buckets[currentBucket] = skillPush;
							} else {
								skillPush.push({"status" : "inactive", "name" : about.skills[i].name});
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

					//ANIMATES GRAPH
					$scope.activateFocuses = function(bucket, index, forced){
						var target;
						if(about.activeFocus[bucket][index].status === "active"){
							if(forced){
								target = document.getElementById("skillAnimate_" + about.activeFocus[bucket][index].name + "_" + forced);
								about.activeFocus[bucket][index].status = forced;
							} else {
								target = document.getElementById("skillAnimate_" + about.activeFocus[bucket][index].name + "_inactive");
								about.activeFocus[bucket][index].status = "inactive";
							}
							target.beginElement();
						} else if(about.activeFocus[bucket][index].status === "inactive"){
							if(forced){
								target = document.getElementById("skillAnimate_" + about.activeFocus[bucket][index].name + "_" + forced);
								about.activeFocus[bucket][index].status = forced;
							} else {
								target = document.getElementById("skillAnimate_" +about.activeFocus[bucket][index].name + "_active");
								about.activeFocus[bucket][index].status = "active";
							}
							target.beginElement();
						}

					};

					//EXPANDABLE BUCKETING
					$scope.bucketController = function(targetBucket){
						var promise;

						function delayedTime(bucketDelayed, delayed){
							promise = $timeout(function(){
								$scope.activateFocuses(bucketDelayed,delayed,'active');
							}, 250*delayed);
						}

						about.currentActivebucket = targetBucket;
						for (var bucket in about.activeFocus) {
							if(targetBucket === bucket){
								for (var i = 0; i < about.activeFocus[bucket].length; i++) {
									if(about.activeFocus[bucket][i].status === "inactive"){
										delayedTime(bucket,i);
									}
								}
							} else {
								for (var j = 0; j < about.activeFocus[bucket].length; j++) {
									if(about.activeFocus[bucket][j].status === "active"){
										$scope.activateFocuses(bucket,j,'inactive');
									}
								}
							}
						}
					};
				});


				//TODO: WIRE UP PieGraph

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
					portfolio.name = "PORTFOLIO";
					
				//turning on prev and next
				$timeout(function () {
					portfolio.navigation = Navigation.pageInit(portfolio.page);
				});

				//Watch page change
				$scope.$on('page:count', function(event,data){
					if(data === portfolio.page){
						Navigation.announcePage(portfolio.name);
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

				$scope.popSwitch = function(toOpen) {
					Navigation.popSwitch(toOpen);
				};


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
