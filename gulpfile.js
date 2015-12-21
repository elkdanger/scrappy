'use strict'

let gulp = require('gulp')
let plugins = require('gulp-load-plugins')()
let browserSync = require('browser-sync').create()

/* Browser sync */
gulp.task('browser-sync', () => {

  browserSync.init({
    proxy: 'localhost:3000',
    port: 4202
  })

})

gulp.task('serve', ['browser-sync'], () => {

  plugins.nodemon({
    script: 'bin/www',
    ext: 'js hbs',
    env: { 'NODE_ENV': 'development' }
  })

})
