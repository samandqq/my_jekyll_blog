'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var util = require('gulp-util');

gulp.task('less', function () {
  return gulp.src('app/web/static/style/less/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleanCSS({ advanced: true }))
    .pipe(gulp.dest('app/web/static/style/css'));
});

gulp.task('build', function () {
  return gulp.src('app/web/**/*.html')
    .pipe(replace('<!-- build:js scripts/vendor.js -->', '<!-- build:js vendor.js -->'))
    .pipe(replace('<!-- endbuild -->', '<!-- endbuild -->\n<!-- build:js app.js -->'))
    .pipe(replace('<!-- build:css styles/vendor.css -->', '<!-- build:css vendor.css -->'))
    .pipe(replace('<!-- endbuild -->', '<!-- endbuild -->\n<!-- build:css styles/app.css -->'))
    .pipe(usemin({
      css: [autoprefixer(), cleanCSS({ advanced: true }), 'concat'],
      html: [htmlmin({ collapseWhitespace: true })],
      js: [jshint(), jshint.reporter('jshint-stylish'), uglify()]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('less', 'build'));