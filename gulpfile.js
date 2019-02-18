var gulp = require('gulp');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var conCat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');

//注册sass
gulp.task('watch', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('./src/css'))
});
gulp.task('dev', function() {
    gulp.series('sass', 'dserver', 'auto')
})

//合并js文件
gulp.task('js', function() {
    return gulp.src('./src/js/**/*.js')
        //压缩
        .pipe(uglify())
})

//webwerver
gulp.task('default', function() {
    return gulp.src('src')
        .pipe(server({
            host: '169.254.79.153',
            port: 8080,
            open: true,
            livereload: true,
            mideleware: function(req, res, next) {
                var pathname = url.parser(req.url).pathname;
                if (pathname === '/api/product') {
                    res.end(JSON.stringify({ code: 1, data: productsdata }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})

//压缩css
gulp.task('zipCss', function() {
    return gulp.src('./src/css/**/*.js')
        .pipe(cleanCss())
        .pipe(rename(function(path) {
            path.basename += '.min'
        }))
        .pipe(gulp.dest('./build/css'))
})

//压缩js
gulp.task('zipjs', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename(function(path) {
            path.basename += '.min'
        }))
        .pipe(gulp.dest('./build/js'))
})