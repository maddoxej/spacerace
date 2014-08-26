var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    transform = require('vinyl-transform'),
    exorcist = require('exorcist'),
    mold = require('mold-source-map');
var paths = {
    js: 'js/*.js',
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
    }))
    .pipe(transform(function() {
        return mold.transformSourcesRelativeTo('.');
    }))
    .pipe(transform(function() {
        return exorcist('./bundle.map.js');
    }))
    .pipe(concat('bundle.js')).pipe(gulp.dest('.'));
});
        
gulp.task('default', ['browserify']);