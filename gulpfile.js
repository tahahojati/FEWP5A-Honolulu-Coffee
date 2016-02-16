// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
//var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssbeautify = require('gulp-cssbeautify');
var prettify = require('gulp-html-prettify');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var shell = require('gulp-shell');
//var jsbeautify = require('gulp-prettify');
// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// gulp.task('jsbeautify', function(){
//     gulp.src('./src/js/*.js')
//     .pipe(jsbeautify({
//         collapseWhitespace: true
//     }))
//     .pipe(gulp.dest('./src/'))
// });

gulp.task('css', function(){
    return gulp.src('./src/styles/*.css')
        .pipe(cssbeautify())
        .pipe(gulp.dest('./src/styles/'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/'));

});
/*// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});*/
 
gulp.task('html', function() {
  gulp.src('./src/*.html')
    .pipe(prettify({indent_char: ' ', indent_size: 4}))
    .pipe(gulp.dest('./src/'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});
 
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['src/js/helper.js', 'src/js/model.js', 'src/js/viewmodel.js'])
        .pipe(concat('all.js'))
        //.pipe(gulp.dest('dist/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch('src/*.html', ['html']);
    //gulp.watch('src/scss/*.scss', ['sass']);
});

gulp.task('documentation', shell.task(['./node_modules/.bin/jsdoc src/js/helper.js src/js/model.js src/js/viewmodel.js']));

// Default Task
gulp.task('default', ['lint','html', 'scripts' , 'css' , 'watch']);
