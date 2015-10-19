/*
  currently only for sass compilation
*/



var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass','libs']);
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});
gulp.task('libs', function () {
  gulp.src(['./bower_components/ionic/release/**/*.min.css', './bower_components/ionic/release/**/*.min.js'])
      .pipe(gulp.dest('./www/libs/ionic/'));
  gulp.src(['./bower_components/ionic/release/**/*.*', '!/**/*.json'])
      .pipe(gulp.dest('./www/libs/ionic/'));


  gulp.src('./bower_components/angular-route/angular-route.min.js')
      .pipe(gulp.dest('./www/libs/'));
});




gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});
