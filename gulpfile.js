'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var clean_css = require('gulp-clean-css');
var source_maps = require('gulp-sourcemaps');
// var pump = require('pump');

// Process bulma variables
gulp.task('bulma', function() {
    console.log('running sass');
    return gulp.src('./node_modules/bulma/bulma.sass')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./static/css/'));
});

// Process main scss.
gulp.task('main-css', function() {
    console.log('running sass');
    return gulp.src('./sources/scss/main.scss')
        .pipe(source_maps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(clean_css())
        .pipe(source_maps.write('.'))
        .pipe(gulp.dest('./static/css/'));
});