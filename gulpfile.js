'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	console.log('running sass');
	return gulp.src('./node_modules/bulma/bulma.sass')
		.pipe(sass())
		.pipe(gulp.dest('.'));
});
