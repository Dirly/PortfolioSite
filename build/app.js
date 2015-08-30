(function(){
	var app = angular.module('port', ['Navigation', 'PolyGraph', 'PieChart', 'Carousel']);
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
						popup.loaded = false;
					}
				});

				$scope.loadedPop = function(event) {
					popup.loaded = true;
				};
			}],
			controllerAs:'popup'
		};
	});

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
					Navigation.pageCount();

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
			controller: ['Navigation', 'PolyGraph', 'PieChart', '$scope', '$timeout', function(Navigation, PolyGraph, PieChart, $scope, $timeout){


				var about = this;
					about.page = 2;
					about.name = "SKILLS";
					Navigation.pageCount();

				
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
							points,
							blank,
							skillPush = [],
							buckets = {};

						for (var i = 0; i < about.skills.length; i++) {
							points = PolyGraph.aquireCords(about.skills[i].points);
							points = points.split(",");
							blank = PolyGraph.aquireCords('blank');
							blank = blank.split(",");
							if(about.skills[i].bucket !== currentBucket){
								skillPush = [];
								currentBucket = about.skills[i].bucket;
								skillPush.push(
									{
										"status" : "inactive", 
										"name" : about.skills[i].name, 
										"active" : points, 
										"inactive" : blank
									}
								);
								buckets[currentBucket] = skillPush;
							} else {
								skillPush.push(
									{
										"status" : "inactive", 
										"name" : about.skills[i].name, 
										"active" : points, 
										"inactive" : blank
									}
								);
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
						var s = Snap('#chartBlockSVG'),
							target = s.select("#skill_" + about.activeFocus[bucket][index].name);

						if(about.activeFocus[bucket][index].status === "active"){
							if(forced){
								target.animate({points : about.activeFocus[bucket][index][forced]},200);
								about.activeFocus[bucket][index].status = forced;
							} else {
								target.animate({points: about.activeFocus[bucket][index].inactive},200);
								about.activeFocus[bucket][index].status = "inactive";
							}
						} else if(about.activeFocus[bucket][index].status === "inactive"){
							if(forced){
								target.animate({points : about.activeFocus[bucket][index][forced]},100);
								about.activeFocus[bucket][index].status = forced;
							} else {
								target.animate({points : about.activeFocus[bucket][index].active},200);
								about.activeFocus[bucket][index].status = "active";
							}
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


				//WIRE UP PieChart
				PieChart.getData("assets/src/career.json",function(){
					about.careers = PieChart.setGraph(181, 82, 275);
				});


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
					Navigation.pageCount();
					
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

//SMALL DIRECTIVES
	app.directive('sbLoad', ['$parse', function ($parse) {
		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {
				var fn = $parse(attrs.sbLoad);
				elem.on('load', function (event) {
					scope.$apply(function() {
						fn(scope, { $event: event });
					});
				});
			}
		};
	}]);

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
