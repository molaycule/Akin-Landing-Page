const { task, src, dest, series, watch } = require('gulp');
const imagemin = require('gulp-imagemin');
const uglifycss = require('gulp-uglifycss');

task('html', function() {
    return src('./src/*.html').pipe(dest('./public/'));
});

task('imagemin', function() {
    return src('./src/img/*')
        .pipe(imagemin())
        .pipe(dest('./public/img'));
});

task('css', function() {
    return src('./src/css/*.css')
        .pipe(
            uglifycss({
                uglyComments: true
            })
        )
        .pipe(dest('./public/css/'));
});

task('run', series('html', 'imagemin', 'css'));

task('watch', function() {
    watch('./src/*.html', series('html'));
    watch('./src/img/*', series('imagemin'));
    watch('./src/css/*.css', series('css'));
});

task('default', series('run', 'watch'));
