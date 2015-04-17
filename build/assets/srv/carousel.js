//NAVIGATION SET UP FOR SCREEN WIDTH PAGESCara


(function(){
	var app = angular.module('Carousel',[]);

	app.service('Carousel', ['$http' ,function($http) {
		//WINDOW SCROLL CURRENT ACTIVE PAGE DETECT
		
		return {
			gatherData: function(url) {
				$http.get(url).success(function(data) {
					console.log("data did load from:",url);
				}).
				error(function(error) {
					console.log("data did not load from:",url);
				});
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