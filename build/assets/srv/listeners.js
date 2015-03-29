(function(){
	var app = angular.module('listeners',[]);

	app.service('resize', ['$rootScope', function($rootScope) {
		var currentHeight = $(window).height();
		$(window).resize(function(target){
			currentHeight = $(window).height();
			$rootScope.$broadcast('height:updated', currentHeight);
		});
	}]);

	app.service('navigation', ['$rootScope', function($rootScope) {
		var currentHeight = $(window).height();
		$(window).resize(function(target){
			currentHeight = $(window).height();
			$rootScope.$broadcast('height:updated', currentHeight);
		});
	}]);

})();