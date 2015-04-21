//NAVIGATION SET UP FOR SCREEN WIDTH PAGESCara


(function(){
	var app = angular.module('Carousel',[]);

	app.service('Carousel', ['$http' ,function($http) {
		var theData;
		
		return {
			getData: function(url,callback) {
				$http.get(url).success(function(data) {
					theData = data;
					callback();
				}).
				error(function(error) {
					console.log("error with data loading:", error);
				});
			},
			changeFocus: function(fromWhere,toWhere) {
				currentWidth = $(window).width();
				fromWhere = (fromWhere - 1)*currentWidth;
				toWhere = (currentWidth * toWhere)*-1;
				$("html, body").animate({scrollTop: fromWhere + toWhere}, 500);
			},
			returnData: function(){
				return theData;
			}
		};
	}]);
})();