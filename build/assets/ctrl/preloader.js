//CREATE PRELOADER HERE
preloader = function(images,videos,callback){
	for (var i = 0; i < images.length; i++) {
		$("<img />").attr("src", images[i]);
	}

	function videoLoader(count){
		var videostate;
			userAgent = window.navigator.userAgent;
			console.log(userAgent);
		if(videos.length !== count && userAgent.indexOf("safari") !== -1){	
			$("#videoPreloader").html('<video id="videoPreloading" width="0" height="264" muted preload="auto">'+'<source src="'+videos[count]+'"></source>'+'</video>');

			var video = document.querySelector('#videoPreloading');

			var videoStatus = setInterval(function (){
				var currentState = video.readyState;
				switch(currentState){
					case 4:
						clearInterval(videoStatus);
						videoLoader(count + 1);
					break;
				}
			},1000);
		} else {
			callback();
		}
	}
	videoLoader(0);
};

preloader([
	"assets/img/preLoader.gif",
	"assets/img/bubble.png",
	"assets/img/icon_HTML5.png",
	"assets/img/icon_Illustrator.png",
	"assets/img/icon_Photoshop.png",
	"assets/img/icon_Sketchup.png",
	"assets/img/icons.png",
	"assets/img/inkSplash.png",
	"assets/img/AmazingApp/AA_Background.jpg",
	"assets/img/AmazingApp/AA_iPad.png",
	"assets/img/AmazingApp/AA_Logo.png",
	"assets/img/AmazingApp/AA_People.png",
	"assets/img/AmazingApp/AA_Thumbnail_01.jpg",
	"assets/img/AmazingApp/AA_Thumbnail_02.jpg",
	"assets/img/FlightCheck/FC_Background.jpg",
	"assets/img/FlightCheck/FC_iPad.png",
	"assets/img/FlightCheck/FC_Logo.png",
	"assets/img/FlightCheck/FC_Planets.png",
	"assets/img/FlightCheck/FC_Right.png",
	"assets/img/FlightCheck/FC_Thumbnail_01.jpg",
	"assets/img/FlightCheck/FC_Thumbnail_02.jpg",
	"assets/img/iPrep/iPrep_Logo.png",
	"assets/img/iPrep/iPrep_iPad.png",
	"assets/img/iPrep/iPrep_Thumbnail_01.jpg",
	"assets/img/iPrep/iPrep_Thumbnail_02.jpg",
	"assets/img/iPrep/iPrep_StarBurst.jpg",
	"assets/img/SZF/SZF_Background.jpg",
	"assets/img/SZF/SZF_Building.png",
	"assets/img/SZF/SZF_Device.png",
	"assets/img/SZF/SZF_Mountains.png"
],[
	"assets/vid/Compiled.mp4"
],function(){
	$("#preloader").addClass("loaded");
	$("#preloadText").click(function(){
		$("#mainContainer").show();
		
		$("#preloader").remove();
		var video = document.getElementById("homeVideo");
		video.play();
	});
});