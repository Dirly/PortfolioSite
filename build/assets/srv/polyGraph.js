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
			cords,
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
			setGraph: function(maxY,maxX,spacing,center){
				var currentCord,
					cordPointValues;
					cords = [];

				for (var i = 0; i <= maxY; i++) {
					cordPointValues = [];
					for (var j = 1; j <= maxX; j++) {
						var x = Math.round(spacing*(i+1) * Math.cos(2*Math.PI*j/maxX)+center),
							y = Math.round(spacing*(i+1) * Math.sin(2*Math.PI*j/maxX)+center);
						currentCord = x + "," + y;
						cordPointValues.push(currentCord);
					}
					cords.push(cordPointValues);
				}
				console.log(cords);
				return cords;
			}
		};
	}]);
})();