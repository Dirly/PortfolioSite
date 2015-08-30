//CREATE PRELOADER HERE
preloader = function(images,videos,callback){
	for (var i = 0; i < images.length; i++) {
		$("<img />").attr("src", images[i]);
	}

	function videoLoader(count){
		var videostate;
		if(videos.length !== count){
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
	"assets/img/aboutTop.png",
	"assets/img/bubble.png",
	"assets/img/icon_HTML5.png",
	"assets/img/icon_Illustrator.png",
	"assets/img/icon_Photoshop.png",
	"assets/img/icon_Sketchup.png",
	"assets/img/icons.png",
	"assets/img/inkSplash.png",
	"assets/img/AmazingApp/AA_Background.jpg",
	"assets/img/FlightCheck/FC_Background.jpg",
	"assets/img/FlightCheck/FC_iPad.png",
	"assets/img/FlightCheck/FC_Logo.png",
	"assets/img/FlightCheck/FC_Planets.png",
	"assets/img/FlightCheck/FC_Right.png",
	"assets/img/iPrep/iPrep_Background.jpg",
	"assets/img/iPrep/iPrep_Logo.png",
	"assets/img/iPrep/iPrep_iPad.png",
	"assets/img/iPrep/iPrep_Thumbnail_01.jpg",
	"assets/img/iPrep/iPrep_Thumbnail_02.jpg",
	"assets/img/iPrep/iPrep_StarBurst.png"
],[
	"assets/vid/Compiled.mp4"
],function(){
	$("#preloader").addClass("loaded");
	$("#preloadText").click(function(){
		$("#mainContainer").show();
		$("#preloader").remove();
	});
});