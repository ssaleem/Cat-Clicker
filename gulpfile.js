var gulp         = require('gulp'),
    cssnano      = require('gulp-cssnano'),
    sass         = require('gulp-sass');
    browserSync = require('browser-sync').create();

var supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
];

gulp.task('css', function(){
    return gulp.src(['sass/**/*.scss'])
        .pipe(sass())
        .pipe(cssnano({
            autoprefixer: {browsers: supported, add: true}
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 8081,   //browser url port
    ui: {
        port: 8080
    },
  })
});


gulp.task('watch', ['css','browserSync'], function (){
  gulp.watch('sass/**/*.scss', ['css']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('*.js', browserSync.reload);
});