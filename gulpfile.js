var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    transform = require('vinyl-transform'),
    exorcist = require('exorcist'),
    mold = require('mold-source-map'),
    notification = require('node-notifier'),
    util = require('gulp-util');

// Standard error handler
function errorHandler(err){
  // Notification  
  notification.notify({ message: 'Error: ' + err.message });
  // Log to console
  util.log(util.colors.red('Error'), err.message);
}

// Handler for browserify
function browserifyHandler(err){
  errorHandler(err);
  this.end();
}

var paths = {
    js: ['js/*.js','test/src/*.js'],
    css: 'css/*.css'
}
gulp.task('browserify', function() {
    // start by reading a file that requires the rest of the files. 
    // Use BrowserIfy to evaluate the require statements, minify and combine them and make the source map for debugging
    // fix the sourcemap paths with mold. 
    // The sourcemap is created in-line put it in a separate file with exorcist
    // Write the resulting file to bundle.js. Since that is only one file and not a folder, use concat. 
    gulp.src('js/main.js')
        .pipe(browserify({
            debug: true
        }).on('error', browserifyHandler))
        .pipe(transform(function() {
            return mold.transformSourcesRelativeTo('.');
        })).on('error', errorHandler)
        .pipe(transform(function() {
            return exorcist('./bundle.map.js');
        })).on('error', errorHandler)
        .pipe(concat('bundle.js'))
        .on('error', errorHandler)
        .pipe(gulp.dest('.'));
});
gulp.task('bundleTests', function() {
    gulp.src('test/src/tests.js')
        .pipe(browserify({
            debug: true
        }).on('error', browserifyHandler))
        .pipe(transform(function() {
            return mold.transformSourcesRelativeTo('.');
        })).on('error', errorHandler)
        .pipe(transform(function() {
            return exorcist('./test/testBundle.map.js');
        })).on('error', errorHandler)
        .pipe(concat('test/testBundle.js'))
        .on('error', errorHandler)
        .pipe(gulp.dest('.'));
})
gulp.task('watch', function() {
    gulp.watch(paths.js, ['browserify', 'bundleTests']);
})
gulp.task('default', ['watch', 'browserify', 'bundleTests']);