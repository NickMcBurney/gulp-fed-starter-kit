// this is gulp init
var gulp = require('gulp');
// used for logging custom messages to the terminal
var gutil = require('gulp-util');
// used to compile SCSS to CSS
var sass = require('gulp-sass');
// minify css
var cleanCSS = require('gulp-clean-css');
// used to minify CSS, JS, html
var uglify = require('gulp-uglify');
var pump = require('pump');
// used to rename files
var rename = require("gulp-rename");
// auto prefixes css properties
var autoprefixer = require('gulp-autoprefixer');

// connect to webserver
var connect = require('gulp-connect');




// copy html to dist folder
/*gulp.task('copy', function() {
  gulp.src('./src/index.html')
  .pipe(gulp.dest('./dist'))
});*/

// basic log example
gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});


// compile SCSS to CSS
gulp.task('handle-scss', function() {
  gulp.src('./src/styles/*.scss') // source file(s)

  .pipe(sass({style: 'compressed'})) // output compressed
    .on('error', gutil.log) // if error log error
    .pipe(autoprefixer()) // auto prefix css properties
    .pipe(cleanCSS()) // minify css
    .pipe(rename({ suffix: '.min' })) // add .min to file name
    .pipe(gulp.dest('./dist/styles')) // destination location for compiled / compressed CSS
    .pipe(connect.reload()) // reload browser
});


// compress JS to minified version
gulp.task('handle-js', function () {
  gulp.src('./src/scripts/*.js') // source file(s)
    .pipe(uglify()) // minify js
    .pipe(rename({ suffix: '.min' })) // add .min to file name
    .pipe(gulp.dest('./dist/scripts/')) // destination location for compiled JS
    .pipe(connect.reload()) // reload browser
})


// handle html
gulp.task('handle-html', function() {
  gulp.src('./src/*.html')
  .pipe(gulp.dest('./dist'))
  .pipe(connect.reload())
});


// watch for changes to JS / CSS
gulp.task('watch', function() {
  gulp.watch('./src/scripts/*.js', ['handle-js']);
  gulp.watch('./src/styles/*.scss', ['handle-scss']);
  gulp.watch('./src/*.html', ['handle-html']);
});


// connect to webserver
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});



gulp.task('default', ['handle-html', 'handle-js', 'handle-scss', 'connect', 'watch']);