/**
 * Created by Joker on 2016/1/24.
 */
var gulp     = require('gulp'),
    cssmin   = require('gulp-minify-css'),
    compass  = require('gulp-compass'),
    concat   = require('gulp-concat'),
    uglify   = require('gulp-uglify'),
    rename   = require('gulp-rename'),
    imagemin = require('gulp-imagemin');

//定义方法操作css
gulp.task('sass', function () {
    //编译css
    //压缩css
    return gulp.src('./sass/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: 'stylesheets',
            sass: 'sass'
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./static/Css'));

});
gulp.task('css', ['sass'], function () {
    return gulp.src('./Css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./static/Css'));

});
gulp.task('minifyjs', function () {
    return gulp.src('./JavaScript/*.js')
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('./static/JavaScript'));  //输出
});

gulp.task('imagemin', function () {

    return gulp.src('./Images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./static/images/'))
});

gulp.task('watch', function () {
    return gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('default', ['css', 'minifyjs', 'imagemin', 'watch'], function () {
    console.log('gulp is watching\n press [ctrl+c] to stop');
});