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
			pageInit: function(pageNumber,pageName) {
				console.log(pageNumber);
			},
			changePage: function(fromWhere,toWhere) {
				currentHeight = $(window).height();
				fromWhere = (fromWhere - 1)*currentHeight;
				toWhere = (currentHeight * toWhere)*-1;
				$("html, body").animate({scrollTop: fromWhere + toWhere}, 1000);
			}
		};
	}]);

})();