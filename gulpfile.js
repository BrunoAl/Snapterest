var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

gulp.task('default', function() {
  return browserify('./src/app.jsx')
         .transform("babelify", {presets: ["react"]})
         .bundle()
         .pipe(source('main.js'))
         .pipe(gulp.dest('./public/js/'))
         .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./src/app.jsx', ['default']);
});
