var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// basic server reloading on file change
gulp.task('serve', function() {
    browserSync.init({
        watch: true,
        browser: "google-chrome",
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default',gulp.series('serve'));

