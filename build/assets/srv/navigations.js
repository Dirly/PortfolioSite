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
			wholeCheck,
			scrollLock,
			lockLocation,
			modal,
			currentPop,
			scrollPercent,
			toWhere;

		//DEFAULT SET
		currentHeight = $(window).height();
		whereAreWe = $(window).scrollTop();
		lockLocation = $(window).scrollTop();

		//GET DOC HEIGHT
		//delay needs to exist for dom to load...  
		$timeout(function () {
			mainHeight = $(document).height();
			pages = mainHeight/currentHeight;
		});

		//WINDOW RESIZE
		$(window).resize(function(){
			scrollPercent = whereAreWe/mainHeight;
			currentHeight = $(window).height();
			$rootScope.$broadcast('height:updated', currentHeight);
			mainHeight = $(document).height();
			$(window).scrollTop(Math.round(scrollPercent*mainHeight));
		});

		//WINDOW SCROLL CURRENT ACTIVE PAGE DETECT
		function pageBroadcast(page){
			if(page !== currentPage){
				currentPage = page;
				$rootScope.$broadcast('page:count', page);
			}
		}

		$(window).scroll(function(target){
			whereAreWe = $(window).scrollTop();
			if (scrollLock === true){
				$(window).scrollTop(lockLocation);
			}
			for (var i = 1; i <= pages; i++) {
				if(i === 1){
					if (whereAreWe < currentHeight){
						pageBroadcast(i);
					}
				} else if (i === pages){
					if ( whereAreWe === currentHeight*(i-1)){
						pageBroadcast(i);
					}
				} else {
					if ( whereAreWe > (currentHeight*(i-1)-1) && whereAreWe < (currentHeight*i)-1){
						pageBroadcast(i);
					}
				}
			}
		});

		return {
			pageInit: function(pageNumber) {
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
			},
			announcePage: function(pageName) {
				$rootScope.$broadcast('page:name', pageName);
			},
			scrollLocked: function(status) {
				scrollLock = status;
				$(window).scrollTop();
			},
			popSwitch: function(content) {
				$rootScope.$broadcast('popup:content', content);
				if(content.pageType !== 'none'){
					lockLocation = $(window).scrollTop();
					scrollLock = true;
				} else {
					scrollLock = false;
				}
			}
		};
	}]);
})();