(function(){
    var app = angular.module('portfolio',[ ]);
    
    app.controller('PortfolioCtrl', function(){
    	this.windowHeight = docHeight;
    });

    var docHeight = "innerHeight" in window 
    				? window.innerHeight
    				: document.documentElement.offsetHeight; 

})();
