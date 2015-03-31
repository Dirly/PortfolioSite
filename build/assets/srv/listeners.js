(function(){
	var app = angular.module('listeners',[]);

	app.service('resize', ['$rootScope', function($rootScope) {
		var currentHeight = $(window).height();
		$(window).resize(function(target){
			currentHeight = $(window).height();
			$rootScope.$broadcast('height:updated', currentHeight);
		});
	}]);

	app.service('navigation', [function() {
		var currentHeight,
			fromWhere,
			toWhere;

		return {
			changePage: function(fromWhere,toWhere) {
				currentHeight = $(window).height();
				fromWhere = (fromWhere - 1)*currentHeight;
				toWhere = (currentHeight * toWhere)*-1;
				console.log("from:" + fromWhere + " | to:" + toWhere);
				$("html, body").animate({scrollTop: fromWhere + toWhere}, 1000);
			}
		};
	}]);

})();