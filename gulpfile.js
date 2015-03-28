var gulp = require('gulp');

gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(require('connect-livereload')({port: 4002}));
	app.use(express.static("build"));
	app.listen(4000);
});

var tinylr;
gulp.task('livereload', function() {
	tinylr = require('tiny-lr')();
	tinylr.listen(4002);
});

function notifyLiveReload(event) {
	console.log("firing");
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
	gulp.watch('build/assets/src/**/*.js', notifyLiveReload);
	gulp.watch('build/assets/srv/**/*.js', notifyLiveReload);
	gulp.watch('build/assets/dir/**/*.js', notifyLiveReload);
	gulp.watch('build/assets/ctrl/**/*.js', notifyLiveReload);
	gulp.watch('build/assets/css/**/*.css', notifyLiveReload);
});

gulp.task('default', ['express', 'livereload', 'watch'], function() {

});
