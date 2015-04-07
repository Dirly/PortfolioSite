(function(){
	var app = angular.module('navigations',[]);

	app.service('navigations', ['$rootScope', function($rootScope) {
		var currentHeight = $(window).height(),
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
				$("html, body").animate({scrollTop: fromWhere + toWhere}, 500);
			}
		};
	}]);

})();