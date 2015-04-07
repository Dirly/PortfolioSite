(function(){
	var app = angular.module('globalListeners',[]);

	app.service('globalListeners', ['$rootScope', function($rootScope) {
		var currentHeight = $(window).height(),
			fromWhere,
			toWhere;

		//WINDOW RESIZE FUNCTION
		$(window).resize(function(target){
			currentHeight = $(window).height();
			$rootScope.$broadcast('height:updated', currentHeight);
		});

		//WINDOW SCROLL FUNCTION
		$(window).scroll(function(target){
			console.log("testing");
		});
	}]);

})();