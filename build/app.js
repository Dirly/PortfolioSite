(function(){
	var app = angular.module('port', ['Navigation', 'swipe', 'PolyGraph', 'PieChart', 'Carousel']);

	//Defaults
	app.run(function(Navigation){
		//CREATE PRELOADER HERE
			preloader = function(images,videos,callback){
				for (var i = 0; i < images.length; i++) {
					$("<img />").attr("src", images[i]);
				}

				function videoLoader(count){
					var videostate;
						userAgent = window.navigator.userAgent;
					if(videos.length !== count && userAgent.indexOf("safari") !== -1){	
						$("#videoPreloader").html('<video id="videoPreloading" width="0" height="264" muted preload="auto">'+'<source src="'+videos[count]+'"></source>'+'</video>');

						var video = document.querySelector('#videoPreloading');

						var videoStatus = setInterval(function (){
							var currentState = video.readyState;
							switch(currentState){
								case 4:
									clearInterval(videoStatus);
									videoLoader(count + 1);
								break;
							}
						},1000);
					} else {
						callback();
					}
				}
				videoLoader(0);
			};
			preloader([
				"assets/img/preLoader.gif",
				"assets/img/bubble.png",
				"assets/img/icon_HTML5.png",
				"assets/img/icon_Illustrator.png",
				"assets/img/icon_Photoshop.png",
				"assets/img/icon_Sketchup.png",
				"assets/img/icons.png",
				"assets/img/inkSplash.png",
				"assets/img//philadelphia.jpg",
				"assets/img/AmazingApp/AA_Background.jpg",
				"assets/img/AmazingApp/AA_iPad.png",
				"assets/img/AmazingApp/AA_Logo.png",
				"assets/img/AmazingApp/AA_People.png",
				"assets/img/AmazingApp/AA_Thumbnail_01.jpg",
				"assets/img/AmazingApp/AA_Thumbnail_02.jpg",
				"assets/img/FlightCheck/FC_Background.jpg",
				"assets/img/FlightCheck/FC_iPad.png",
				"assets/img/FlightCheck/FC_Logo.png",
				"assets/img/FlightCheck/FC_Planets.png",
				"assets/img/FlightCheck/FC_Right.png",
				"assets/img/FlightCheck/FC_Thumbnail_01.jpg",
				"assets/img/FlightCheck/FC_Thumbnail_02.jpg",
				"assets/img/iPrep/iPrep_Logo.png",
				"assets/img/iPrep/iPrep_iPad.png",
				"assets/img/iPrep/iPrep_Thumbnail_01.jpg",
				"assets/img/iPrep/iPrep_Thumbnail_02.jpg",
				"assets/img/iPrep/iPrep_StarBurst.jpg",
				"assets/img/SZF/SZF_Background.jpg",
				"assets/img/SZF/SZF_Building.png",
				"assets/img/SZF/SZF_Device.png",
				"assets/img/SZF/SZF_Mountains.png"
			],[
				"assets/vid/Compiled.mp4"
			],function(){
				$("#preloader").addClass("loaded");
				$("#preloadText").click(function(){
					$("#mainContainer").show();
					Navigation.startNav();
					$("#preloader").remove();
					var video = document.getElementById("homeVideo");
					video.play();

				});
			});

		Navigation.initialStates({
			scroller: "#mainContainerScroller",
			pages: 4,
		});
	});

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
					topbar.location = "HOME";
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
			controller: ['Navigation', '$scope', 'swipe', '$timeout', function(Navigation, $scope, swipe, $timeout){

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
						home.status = "active";
					} else {
						home.status = "inactive";
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
			controller: ['Navigation', 'swipe', 'PolyGraph', 'PieChart', '$scope', '$timeout', function(Navigation, swipe, PolyGraph, PieChart, $scope, $timeout){


				var about = this;
					about.page = 2;
					about.name = "SKILLS";
					about.triggered = false;

				
				//turning on prev and next
				$timeout(function () {
					about.navigation = Navigation.pageInit(about.page);
				});

				//Watch page change
				$scope.$on('page:count', function(event,data){
					if(data === about.page){
						Navigation.announcePage(about.name);	
						about.status = "active";
						if(about.triggered === false){
							$scope.bucketController('designer');
							about.triggered = true;
						}
					} else {
						about.status = "inactive";
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
					about.graph = PolyGraph.setGraph(about.skills, 40, 275, 40.08,"2008","present");

					about.lineMarkerA = "M275 275 L" + about.graph.cordMarkers[2 + (about.skills[0].points.length * 4)].x + " " + about.graph.cordMarkers[2 + (about.skills[0].points.length * 4)].y;
					about.lineMarkerB = "M275 275 L" + about.graph.cordMarkers[5 + (about.skills[0].points.length * 4)].x + " " + about.graph.cordMarkers[5 + (about.skills[0].points.length * 4)].y;
					about.lineMarkerC = "M275 275 L" + about.graph.cordMarkers[3 + (about.skills[0].points.length * 4)].x + " " + about.graph.cordMarkers[3 + (about.skills[0].points.length * 4)].y;

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

				//WIRE UP PieChart for label
				PieChart.getData("assets/src/curves.json",function(){
					about.curves = PieChart.setGraph(185, 220, 275);
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
			controller: ['Navigation', 'Carousel', 'swipe', '$scope', '$timeout', function(Navigation, Carousel, swipe, $scope, $timeout){

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
						portfolio.status = "active";
					} else {
						portfolio.status = "inactive";
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
						var status = Carousel.declareState(index, activeFocus, caseName);
						switch(status){
							case "inactive":
								portfolio.case[index].status = true;
							break;
							default:
								portfolio.case[index].status = false;
							break;
						}
						return status;
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
	app.directive('contact', function(){
		return {
			restrict: 'E',
			templateUrl: 'views/contact.html',
			controller: ['Navigation', '$scope', 'swipe', '$timeout', function(Navigation, $scope, swipe, $timeout){

				var contact = this,
					formsFinished;

					contact.page = 4;
					contact.name = "CONTACT";
					contact.correctCount = 0;
					contact.userName = "name";
					contact.emailAddress = "enter your email address";
					contact.message = "write your message";
					contact.emailTest = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
					contact.standardTest = new RegExp(/[a-z]/i);

				//turning on prev and next
				$timeout(function () {
					contact.navigation = Navigation.pageInit(contact.page);
				});

				//Watch page change
				$scope.$on('page:count', function(event,data){
					if(data === contact.page){
						Navigation.announcePage(contact.name);
						contact.status = "active";
					} else {
						contact.status = "inactive";
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

				//Form handling
				$scope.focusedField = function(event, defaultValue, tester, error){
					clearInterval (formsFinished);
					$(event.currentTarget).toggleClass('active');
					if(event.currentTarget.value === defaultValue || event.currentTarget.value === error){
						event.currentTarget.value = "";
						if($(event.currentTarget).hasClass('incorrect')){
							$(event.currentTarget).removeClass('incorrect');
						}
					}
					formsFinished = setInterval(function(){
						var targetTester = tester.test(event.currentTarget.value);
						if(event.currentTarget.value !== "" && targetTester === true){
							event.currentTarget.inactiveStatus = "valid";
							if($(event.currentTarget).hasClass('incorrect')){
								$(event.currentTarget).removeClass('incorrect');
							}
							if(!event.currentTarget.activeStatus || event.currentTarget.activeStatus === "incorrect"){
								event.currentTarget.activeStatus = "valid";
								if(!$(event.currentTarget).hasClass('valid')){
									$scope.$apply(function(){
										contact.correctCount = contact.correctCount + 1;
									});
								}
							}
						} else if (event.currentTarget.value === "" || targetTester === false){
							event.currentTarget.inactiveStatus = "incorrect";
							if($(event.currentTarget).hasClass('valid')){
								$(event.currentTarget).removeClass('valid');
							}
							if(event.currentTarget.activeStatus === "valid"){
								event.currentTarget.activeStatus = "incorrect";
								if(!$(event.currentTarget).hasClass('incorrect')){
									$scope.$apply(function(){
										contact.correctCount = contact.correctCount - 1;
									});
								}
							}
						}
					},500);
				};

				//Foucus off on fields
				$scope.blurField = function(event, defaultValue, error){
					clearInterval(formsFinished);
					$(event.currentTarget).toggleClass('active');
					if(event.currentTarget.value === "" ){
						event.currentTarget.value = defaultValue;
						if($(event.currentTarget).hasClass('valid')){
							$(event.currentTarget).removeClass('valid');
						}
					} else if(event.currentTarget.inactiveStatus === 'incorrect'){
						event.currentTarget.value = error;
						if($(event.currentTarget).hasClass('valid')){
							$(event.currentTarget).removeClass('valid');
							$(event.currentTarget).addClass('incorrect');
						} else 	if(!$(event.currentTarget).hasClass('incorrect')){
							$(event.currentTarget).addClass('incorrect');
						} 
					} else if(event.currentTarget.inactiveStatus === 'valid'){
						if($(event.currentTarget).hasClass('incorrect')){
							$(event.currentTarget).removeClass('incorrect');
						}
						if(!$(event.currentTarget).hasClass('valid')){
							$(event.currentTarget).addClass('valid');
						}
						
					}
				};

				//Communicate to server
				$scope.sendContact =  function(){
					contact.correctCount = 0;
					/*var xmlHttp = new XMLHttpRequest();
					xmlHttp.open("GET","http://localhost:4000/test",true);*/
					$.post("http://localhost:4000/contact", {
						name: contact.userName, 
						email: contact.emailAddress, 
						message: contact.message
					}, function(data){
						if(data==='emailSent'){
							$scope.$apply(function(){
								contact.sendContact = "sent";
							});
						}
					});
				};
			}],
			controllerAs:'contact'
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

	app.directive('bounce', [function () {
		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {
				setInterval(function(){
					elem.toggleClass("on");
				},500);
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
