var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect-multi')();

//templates
gulp.task('templates', function buildHTML() {
    gulp.src('./dev/pug/**/*.pug')
    .pipe(pug({
        locals: {
            outerwear: [
                {
                    title: 'Double-Layered Top',
                    description: '€ 79,85'
                },
                {
                    title: 'Lorem ipsum dolor',
                    description: '€ 50,85'
                },
                {
                    title: 'Jacket',
                    description: '€ 100,85'
                },
                {
                    title: 'Double-Layered Top',
                    description: '€ 65,85'
                }
            ],
            tShirts: [
                {
                    title: 'Double Top',
                    description: '€ 79,85'
                },
                {
                    title: 'Lorem ipsum dolor',
                    description: '€ 50,85'
                },
                {
                    title: 'Sit amet consectetur',
                    description: '€ 100,85'
                },
                {
                    title: 'Quam sint elit',
                    description: '€ 65,85'
                }
            ]
        }
    }))
    .pipe(gulp.dest('./site'))
    .pipe(connect.reload());
});

//styles
gulp.task('styles', function(){
    gulp.src('./dev/sass/style.sass')
        .pipe(sass({
            outputStyle: 'compressed'
            }))
    .pipe(prefix('last 12 version'))
    .pipe(gulp.dest('./site'))
    .pipe(connect.reload());
});

//scripts
gulp.task('scripts', function(){
    return gulp.src('./dev/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./site'))
        .pipe(connect.reload());
});

//images
gulp.task('images', function(){
    gulp.src('./dev/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./site/images'))
        .pipe(connect.reload());
});

//watch
gulp.task('watch', function () {
    gulp.watch('./dev/*.pug', ['templates']);
    gulp.watch('./dev/sass/style.sass', ['styles']);
    gulp.watch('./dev/js/*.js', ['scripts']);
    gulp.watch('images/*.{jpg, png, svg}', ['images']);
});

//connect
gulp.task('connect', connect.server({
    host: '127.0.0.1',
    port: 9090,
    root: ['site'],
    livereload: true,
    open: {
        browser: 'Chrome'
    }
}));

gulp.task('default', ['templates','styles', 'scripts', 'images']);

gulp.task('dev', ['default', 'connect', 'watch']);