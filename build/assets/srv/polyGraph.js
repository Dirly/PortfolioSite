//PolyGraph SLIDER SERVICE 
/*
http://stackoverflow.com/questions/7198144/how-to-draw-a-n-sided-regular-polygon-in-cartesian-coordinates
x[n] = r * cos(2*pi*n/N)
y[n] = r * sin(2*pi*n/N)
*/

(function(){
	var app = angular.module('PolyGraph',[]);

	app.service('PolyGraph', ['$http' ,function($http) {
		var contentData,
			totalPoints,
			maxValue,
			valuePoints;

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
			setGraph: function(axisLength,spacing){
				for (var i = 1; i < axisLength; i++) {
					var x = spacing * Math.cos(2*Math.PI*i/axisLength),
						y = spacing * Math.sin(2*Math.PI*i/axisLength);
						console.log(x,y);
				}
			}
		};
	}]);
})();