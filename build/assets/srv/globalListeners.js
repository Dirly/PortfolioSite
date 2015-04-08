(function(){
	var app = angular.module('GlobalListeners',[]);

	app.service('GlobalListeners', ['$rootScope', '$timeout', function($rootScope, $timeout) {
		var currentHeight = $(window).height(),
			mainHeight,
			whereAreWe = $(window).scrollTop();

		//GET DOC HEIGHT
		//delay needs to exist for dom to load: http://ejohn.org/blog/how-javascript-timers-work/
		/*$timeout(function() {
			mainHeight = $(document).height();
			console.log(mainHeight);
		}, 100);*/

		//WINDOW RESIZE FUNCTION
		$(window).resize(function(){
			currentHeight = $(window).height();
			mainHeight = $(document).height();
			$rootScope.$broadcast('height:updated', currentHeight);
		});

		//WINDOW SCROLL FUNCTION
		$(window).scroll(function(target){
			whereAreWe = $(window).scrollTop();
			$rootScope.$broadcast('page:updated', pageNumber);
		});
	}]);

})();