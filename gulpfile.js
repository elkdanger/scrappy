'use strict'

let gulp = require('gulp')
let plugins = require('gulp-load-plugins')()
let browserSync = require('browser-sync').create()

let sources = {
    sass: 'public/**/*.scss'
}

/* Browser sync */
gulp.task('browser-sync', () => {

  browserSync.init({
    proxy: 'localhost:3000',
    port: 4202,
    open: false
  })

})

gulp.task('sass', () =>    
    gulp.src(sources.sass)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.stream())
)

gulp.task('serve', ['browser-sync'], () => {

  plugins.nodemon({
    script: 'bin/www',
    ext: 'js hbs',
    env: { 'NODE_ENV': 'development' }
  })
  
  gulp.watch('views/**/*.hbs')
    .on('change', browserSync.reload)
    
  gulp.watch(sources.sass, ['sass'])

})
