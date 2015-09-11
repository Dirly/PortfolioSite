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
			targetedScroller,
			toWhere;

		//targetedScroller SCROLL CURRENT ACTIVE PAGE DETECT
		function pageBroadcast(page){
			if(page !== currentPage){
				currentPage = page;
				$rootScope.$broadcast('page:count', page);
			} else if (!page){
				$rootScope.$broadcast('page:count', 1);
			}
		}
		pageBroadcast();

		

		return {
			initialStates: function(settings) {
				pages = settings.pages || 0;
				targetedScroller = settings.scroller || document;
				
				currentHeight = $(targetedScroller).height();
				whereAreWe = $(targetedScroller).scrollTop();
				lockLocation = $(targetedScroller).scrollTop();

				$(targetedScroller).scroll(function(target){
					mainHeight = currentHeight*pages;
					whereAreWe = $(targetedScroller).scrollTop();

					if (scrollLock === true){
						$(targetedScroller).scrollTop(lockLocation);
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

				$(window).resize(function(){
					scrollPercent = whereAreWe/mainHeight;
					currentHeight = $(targetedScroller).height();
					$rootScope.$broadcast('height:updated', currentHeight);
					mainHeight = currentHeight*pages;
					$(targetedScroller).scrollTop(Math.round(scrollPercent*mainHeight));
				});
				
			},
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
				currentHeight = $(targetedScroller).height();
				fromWhere = (fromWhere - 1)*currentHeight;
				toWhere = (currentHeight * toWhere)*-1;
				$(targetedScroller).animate({scrollTop: fromWhere + toWhere}, 500);
			},
			announcePage: function(pageName) {
				$rootScope.$broadcast('page:name', pageName);
			},
			scrollLocked: function(status) {
				scrollLock = status;
				$(targetedScroller).scrollTop();
			},
			popSwitch: function(content) {
				$rootScope.$broadcast('popup:content', content);
				if(content.pageType !== 'none'){
					lockLocation = $(targetedScroller).scrollTop();
					scrollLock = true;
				} else {
					scrollLock = false;
				}
			}
		};
	}]);
})();