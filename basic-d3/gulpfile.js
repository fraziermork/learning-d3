'use strict';

const gulp    = require('gulp');
const webpack = require('webpack-stream');
const eslint  = require('gulp-eslint');
const del     = require('del');
const webpackConfig = require('./webpack.config.js');

const PATHS = {
  entry:      `${__dirname}/entry.js`,
  src:        `${__dirname}/src`,
  src__html:  `${__dirname}/src/*.html`,
  src__data:  `${__dirname}/public/data/*`,
  dest:       `${__dirname}/build`
};

gulp.task('eslint', () => {
  gulp.src(PATHS.src)
  .pipe(eslint())
  .pipe(eslint.format());
});


gulp.task('build:clear', () => {
  return del([`${PATHS.dest}/*`]);
});
gulp.task('build:html', () => {
  return gulp.src(PATHS.src__html)
    .pipe(gulp.dest(PATHS.dest));
});
gulp.task('build:data', () => {
  return gulp.src(PATHS.src__data)
    .pipe(gulp.dest(PATHS.dest));
});
gulp.task('build:webpack', () => {
  return gulp.src(PATHS.entry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(PATHS.dest));
});
gulp.task('build:all', [
  'eslint',
  'build:clear',
  'build:data',
  'build:html',
  'build:webpack'
], () => {
  console.log('----------------REBUILT----------------');
});
