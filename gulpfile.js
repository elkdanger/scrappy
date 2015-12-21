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

gulp.task('build', () => {
    
    // Copy front-end assets
    gulp.src('node_modules/bootstrap/dist/**/*.*')
        .pipe(gulp.dest('public/vendor/bootstrap'))
        
    gulp.src([
     'node_modules/react/dist/**/*.*',
     'node_modules/react-dom/dist/**/*.*'   
    ])
    .pipe(gulp.dest('public/vendor/react'))
    
    // Fonts
    gulp.src('node_modules/font-awesome/css/*.css')
        .pipe(gulp.dest('public/vendor/fontawesome/css'))
        
    gulp.src('node_modules/font-awesome/fonts/*.*')
        .pipe(gulp.dest('public/vendor/fontawesome/fonts'))

})

gulp.task('serve', ['build', 'browser-sync'], () => {

  plugins.nodemon({
    script: 'bin/www',
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    ignore: [
        'node_modules',
        'public/vendor',
        'tests'
    ]
  }).on('restart', () => {
      setTimeout(browserSync.reload, 500)
  })
  
  gulp.watch([
    'views/**/*.hbs'
  ])
    .on('change', browserSync.reload)
    
  gulp.watch(sources.sass, ['sass'])

})
