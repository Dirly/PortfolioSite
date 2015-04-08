(function(){
	var app = angular.module('Navigations',[]);

	app.service('Navigations', ['$rootScope', function($rootScope) {
		var currentHeight = $(window).height(),
			fromWhere,
			pages = [],
			toWhere;

		return {
			pageInit: function(pageNumber,pageName) {
				pages.push({"page":pageName, "number":pageNumber});
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