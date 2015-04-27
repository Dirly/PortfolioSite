//CAROUSEL SLIDER SERVICE 


(function(){
	var app = angular.module('Carousel',[]);

	app.service('Carousel', ['$http' ,function($http) {
		var contentData,
			transitionInProgress = false;

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
				if (transitionInProgress === true){
					return activeFocus;
				} else {
					var newFocus = activeFocus + toWhere;
					transitionInProgress = true;

					if(newFocus >= contentData.length){
						setTimeout(function(){
							transitionInProgress = false;
						},1000);
						return 0;
					} else if(newFocus < 0){
						setTimeout(function(){
							transitionInProgress = false;
						},1000);
						return contentData.length - 1;
					} else {
						setTimeout(function(){
							transitionInProgress = false;
						},1000);
						return newFocus;
					}
				}
			},
			declareState: function(index,activeFocus,caseName){
				if(index === activeFocus + 1 || (index === 0 && activeFocus === contentData.length)){
					return "rightFocus";
				} else if (index === activeFocus - 1 || (index === contentData.length && activeFocus === 0)){
					return "leftFocus";
				} else if (index === activeFocus){
					return "activeFocus";
				} else {
					return "inactive";
				}
			}
		};
	}]);
})();