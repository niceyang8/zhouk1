var gulp = require('gulp');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var conCat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = rquire('gulp-rename');
var webserver = require('gulp-webserver');

//注册sass
gulp.task('delsass', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('./src/css'))
});