//PolyGraph SLIDER SERVICE 

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
			setGraph: function(data, spacing, center, rotation, startLable, endLable){
				var currentCord,
					cordPointValues,
					x,
					y,
					maxY = 0,
					maxX = 0,
					lableMarkers = [],
					cordMarkers = [];
					cords = [];

				//Gathers maxX and maxY
				for (var dataBucket = 0; dataBucket < data.length; dataBucket++){
					maxX = data[dataBucket].points.length;
					for (var dataPoint = 0; dataPoint < data[dataBucket].points.length; dataPoint++) {
						if(data[dataBucket].points[dataPoint] > maxY){
							maxY = data[dataBucket].points[dataPoint];
						}
					}
				}

				for (var i = 0; i <= maxY; i++) {
					cordPointValues = [];
					for (var j = 1; j <= maxX; j++) {
						if(i === 0){
								x = Math.round(spacing*(2) * Math.cos(2*Math.PI*j/maxX + rotation)+center);
								y = Math.round(spacing*(2) * Math.sin(2*Math.PI*j/maxX + rotation)+center);
							currentCord = x + "," + y;
							cordPointValues.push(currentCord);
						} else {
								x = Math.round(spacing*((i/2)+2) * Math.cos(2*Math.PI*j/maxX + rotation)+center);
								y = Math.round(spacing*((i/2)+2) * Math.sin(2*Math.PI*j/maxX + rotation)+center);
							currentCord = x + "," + y;
							cordPointValues.push(currentCord);
							cordMarkers.push({"x": x, "y" : y});
						}
						if(i === maxY && j === maxX){
							x = Math.round(spacing*((i/2)+4) * Math.cos(2*Math.PI*j/maxX + rotation)+center);
							y = Math.round(spacing*((i/2)+4) * Math.sin(2*Math.PI*j/maxX + rotation)+center);
							lableMarkers.push({"text": endLable, "x": x, "y" : y});
						}
						if(i === maxY && j === 1){
							x = Math.round(spacing*((i/2)+4) * Math.cos(2*Math.PI*j/maxX + rotation)+center);
							y = Math.round(spacing*((i/2)+4) * Math.sin(2*Math.PI*j/maxX + rotation)+center);
							lableMarkers.push({"text": startLable, "x": x, "y" : y});
						}

					}
					cords.push(cordPointValues);
				}
				return {
					"cordMarkers" : cordMarkers, 
					"lableMarkers" : lableMarkers
				};
			},

			aquireCords: function(points){
				var collectedPoints = "";
				if(points !== "blank"){
					for (var i = 0; i < points.length; i++) {
						if(i === 0){
							collectedPoints = cords[points[i]][i];
						} else {
							collectedPoints = collectedPoints +","+ cords[points[i]][i];
						}
					}
				} else {
					for (var j = 0; j < cords[0].length; j++) {
						if(j === 0){
							collectedPoints = cords[0][j];
						} else {
							collectedPoints = collectedPoints +","+ cords[0][j];
						}
					}
				}
				return collectedPoints;
			}

		};
	}]);
})();