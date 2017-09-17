'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var clean_css = require('gulp-clean-css');
var source_maps = require('gulp-sourcemaps');
var purify = require('gulp-purify-css');
var rename = require('gulp-rename');

// Process bulma variables
gulp.task('bulma', function() {
    return gulp.src('./node_modules/bulma/bulma.sass')
        .pipe(source_maps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
//         .pipe(purify(['./static/js/*.js', './templates/*.html']))
        .pipe(clean_css())
        .pipe(source_maps.write('.'))
        .pipe(gulp.dest('./static/css/'));
});

// Process main scss.
gulp.task('main-css', function() {
    return gulp.src('./sources/scss/main.scss')
        .pipe(rename('main.min.css'))
        .pipe(source_maps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(clean_css())
        .pipe(source_maps.write('.'))
        .pipe(gulp.dest('./static/css/'));
});


// Process main javascript.
gulp.task('main-js', function() {
    return gulp.src('./sources/js/main.js')
        .pipe(rename('main.min.js'))
        .pipe(source_maps.init())
        .pipe(uglify())
        .pipe(source_maps.write('.'))
        .pipe(gulp.dest('./static/js/'));
});