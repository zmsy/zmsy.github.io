'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var clean_css = require('gulp-clean-css');
var source_maps = require('gulp-sourcemaps');
var purify = require('gulp-purify-css');
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

function purifyBulma() {
    return gulp
        .src('../assets/css/bulma.css')
        .pipe(purify(['../assets/js/*.js', './build/**/*.html']))
        .pipe(gulp.dest('./dist/'));
}

const build = gulp.series(css, bulma, js);
const refine = gulp.series(purifyBulma);

exports.default = build;
exports.refine = refine;
