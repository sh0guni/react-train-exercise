var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();

var paths = {
    app_js: ['./src/app.js'],
    js: ['./src/*']
};

gulp.task('js', function() {
    browserify(paths.app_js)
        .transform(reactify)
        .bundle()
        .on('error', onError)
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.reload({stream: true, once: true}));
});

function onError(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('js-watch', ['js']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });

    gulp.watch(paths.js, ['js-watch']);
});

gulp.task('default', ['js', 'browser-sync']);
