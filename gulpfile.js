var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();

var paths = {
    app_js: ['./src/train-example-app.js'],
    js: ['./src/*.js']
};

gulp.task('js', function() {
    browserify(paths.app_js)
        .transform(reactify)
        .bundle()
        .pipe(source('train-example-app.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.reload({stream: true, once: true}));
});

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
