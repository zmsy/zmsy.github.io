'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
// var pump = require('pump');

// Process bulma variables
gulp.task('bulma', function() {
    console.log('running sass');
    return gulp.src('./node_modules/bulma/bulma.sass')
        .pipe(sass())
        .pipe(gulp.dest('.'));
});

// Process main scss.
gulp.task('main-css', function() {
    console.log('running sass');
    return gulp.src('./sources/scss/main.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./static/css/'));
});