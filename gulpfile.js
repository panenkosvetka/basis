var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var reload = browserSync.reload;

var markup = './markup';
var dist = './dist'

var markupPaths = {
	html: [ markup + '/*.html'],
	scss: [ markup + '/assets/scss/**/*.scss'],
	js: [markup + '/assets/js/**/*.js']
}

var distPaths = {
	css:[ dist + '/assets/css']
}

gulp.task('html', function () {
  return gulp.src(markupPaths.html)
    .pipe(gulp.dest('./dist'))
    .pipe(reload({
    	stream: true
    }));
});

gulp.task('js', function () {
  return gulp.src(markupPaths.js)
  .pipe(concat('assets.js'))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(reload({
    	stream: true
    }));
});

gulp.task('sass', function () {
  return gulp.src(markupPaths.scss)
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
  			browsers: ['last 2 versions'],
			cascade: false
  	}))
  	.pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(reload({
    	stream: true
    }));
});
 
gulp.task('browserSync', function() {
  browserSync({
   server: {
            baseDir: './dist'
        },
        logConnections: true,
        debugInfo: true,
        injectChanges: false,
        port: 3004,
        open: true,
        browser: 'default',
        startPath: '/index.html',
        notify: true,
        reloadOnRestart: true
  });
});

gulp.task('watch', function () {
  watch(markupPaths.html, function(){
  	gulp.start('html');
  });
  watch(markupPaths.scss, function(){
  	gulp.start('sass');
  });
  watch(markupPaths.js, function(){
  	gulp.start('js');
  });
});

gulp.task('dev', ['watch', 'browserSync']);

