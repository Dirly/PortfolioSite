(function(){
	var app = angular.module('listeners',[]);

	app.service('resize', [ function() {
		var currentSize = $(window).resize(function(){
			return	$(window).height();
		});
	}]);

})();
