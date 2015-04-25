//NAVIGATION SET UP FOR SCREEN WIDTH PAGESCara


(function(){
	var app = angular.module('Carousel',[]);

	app.service('Carousel', ['$http' ,function($http) {
		var contentData;

		return {
			getData: function(url,callback) {
				$http.get(url).success(function(data) {
					contentData = data;
					callback();
				}).	
				error(function(error) {
					console.log("error with data loading:", error);
				});
			},
			returnData: function(){
				return contentData;
			},
			changeFocus: function(activeFocus,toWhere) {
				var newFocus = activeFocus + toWhere;
				if(newFocus >= contentData.length){
					return 0;
				} else if(newFocus < 0){
					return contentData.length - 1;
				} else {
					return newFocus;
				}
			},
			declareState: function(index,activeFocus,caseName){
				console.log("________________");

				if(index === activeFocus + 1 || (index === 0 && activeFocus === contentData.length)){
					console.log(caseName," is right");
					return "rightFocus";
				} else if (index === activeFocus - 1 || (index === contentData.length && activeFocus === 0)){
					console.log(caseName, " is left");
					return "leftFocus";
				} else if (index === activeFocus){
					console.log(caseName, " is active");
					return "activeFocus";
				}
			}
		};
	}]);
})();