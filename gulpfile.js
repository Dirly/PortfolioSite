var gulp = require('gulp'),
 	counter = 0;

//https://codeforgeek.com/2014/09/handle-get-post-request-express-4/

gulp.task('express', function() {
	var express = require('express');
	var bodyParser = require("body-parser");
	var app = express();
	app.use(require('connect-livereload')({port: 4002}));
	app.use(express.static("build"));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.listen(4000);
	app.post('/contact',function(req,res){
		var name=req.body.name;
		var email=req.body.email;
		var message=req.body.message;
		console.log(name);
		console.log(email);
		console.log(message);
		res.end("done");
	});
});

var tinylr;
gulp.task('livereload', function() {
	tinylr = require('tiny-lr')();
	tinylr.listen(4002);
});

function notifyLiveReload(event) {
	counter++;
	console.log("Reload #" + counter);
	var fileName = require('path').relative(__dirname, event.path);
	tinylr.changed({
		body: {
			files: [fileName]
		}
	});
}

gulp.task('watch', function() {
	gulp.watch('build/app.js', notifyLiveReload);
	gulp.watch('build/*.html', notifyLiveReload);
	gulp.watch('build/views/**.html', notifyLiveReload);
	gulp.watch('build/assets/src/**.json', notifyLiveReload);
	gulp.watch('build/assets/srv/**.js', notifyLiveReload);
	gulp.watch('build/assets/dir/**.js', notifyLiveReload);
	gulp.watch('build/assets/ctrl/**.js', notifyLiveReload);
	gulp.watch('build/assets/css/**.css', notifyLiveReload);
	gulp.watch('build/assets/pages/**.html', notifyLiveReload);
});

gulp.task('default', ['express', 'livereload', 'watch'], function() {

});
