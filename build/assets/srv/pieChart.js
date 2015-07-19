//PolyGraph SLIDER SERVICE 
/*
https://jbkflex.wordpress.com/2011/07/28/creating-a-svg-pie-chart-html5/
*/

(function(){
	var app = angular.module('PieChart',[]);

	app.service('PieChart', ['$http' ,function($http) {
		var contentData,
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
			setGraph: function(start, diameter){
				var startAngle = 0,
					endAngle = 0,
					total = 0,
					x1,
					x2,
					y1,
					y2,
					slicesAngle = [],
					cords = [];
					
				for (var i = 0; i < contentData.length; i++) {
					total += contentData[i].amount;
				}

				for (var j = 0; j < contentData.length; j++) {
					var angle = Math.ceil(360 * contentData[j].amount/total);
					slicesAngle.push(angle);
				}
				
				for(var k=0; k <slicesAngle.length; k++){
					startAngle = endAngle;
					endAngle = startAngle + slicesAngle[k];

					x1 = parseInt(200 + 180*Math.cos(Math.PI*startAngle/180));
					y1 = parseInt(200 + 180*Math.sin(Math.PI*startAngle/180));

					x2 = parseInt(200 + 180*Math.cos(Math.PI*endAngle/180));
					y2 = parseInt(200 + 180*Math.sin(Math.PI*endAngle/180));                

					var d = "M200,200  L" + x1 + "," + y1 + "  A180,180 0 0,1 " + x2 + "," + y2 + " z";
					contentData[k].pathCords = d;
					contentData[k].lableCords = d;
				}
				return contentData;
			}
		};
	}]);
})();