//NAVIGATION SET UP FOR SCREEN WIDTH PAGES


(function(){
	var app = angular.module('Navigation',[]);

	app.service('Navigation', ['$rootScope', '$timeout', function($rootScope, $timeout) {
		
		//GLOBAL VARS
		var currentHeight,
			whereAreWe,
			pages,
			currentPage,
			mainHeight,
			fromWhere,
			toWhere;

		//DEFAULT SET
		currentHeight = $(window).height();
		whereAreWe = $(window).scrollTop();

		//GET DOC HEIGHT
		//delay needs to exist for dom to load...  
		$timeout(function () {
			mainHeight = $(document).height();
			pages = mainHeight/currentHeight;
		});

		//WINDOW RESIZE
		$(window).resize(function(){
			currentHeight = $(window).height();
			mainHeight = $(document).height();
			$rootScope.$broadcast('height:updated', currentHeight);
		});

		//WINDOW SCROLL CURRENT ACTIVE PAGE DETECT
		$(window).scroll(function(target){
			whereAreWe = $(window).scrollTop();
			for (var i = 1; i <= pages; i++) {
				if (currentPage !== i){
					currentPage = i;
					if(i === 1){
						if (whereAreWe <= currentHeight*(i-1)){
							console.log('page', i);
							$rootScope.$broadcast('page:updated', i);
						}
					} else if (i === pages){
						if ( whereAreWe === currentHeight*(i-1)){
							console.log('page', i);
							$rootScope.$broadcast('page:updated', i);
						}
					} else {
						if ( whereAreWe > (currentHeight*(i-1)) && whereAreWe < currentHeight*i){
							console.log('page', i);
							$rootScope.$broadcast('page:updated', i);
						}
					}
				}
			}
		});

		return {
			pageInit: function(pageNumber) {
				console.log(pageNumber,pages);
				if(pageNumber === pages){
					return ({
						prev : true,
						next : false
					});
				} else if(pageNumber === 1){
					return ({
						prev : false,
						next : true
					});
					
				} else {
					return ({
						prev : true,
						next : true
					});
				}
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