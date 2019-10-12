'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var clean_css = require('gulp-clean-css');
var source_maps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

function bulma() {
    return gulp
        .src('./src/bulma.scss')
        .pipe(source_maps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(clean_css())
        .pipe(source_maps.write('.'))
        .pipe(gulp.dest('../assets/css/'));
}

function css() {
    return gulp
        .src("./src/index.scss")
        .pipe(rename('main.min.css'))
        .pipe(source_maps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(clean_css())
        .pipe(source_maps.write('.'))
        .pipe(gulp.dest('../assets/css/'));
}

function js() {
    return gulp.src('./src/index.js')
        .pipe(rename('main.min.js'))
        .pipe(source_maps.init())
        .pipe(uglify())
        .pipe(source_maps.write('.'))
        .pipe(gulp.dest('../assets/js/'));
}

const build = gulp.series(css, bulma, js);

exports.default = build;
