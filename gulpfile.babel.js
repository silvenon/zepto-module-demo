import gulp from 'gulp';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import size from 'gulp-size';
import del from 'del';
import runSequence from 'run-sequence';

const bs = browserSync.create();

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';

let b = browserify({
  entries: ['./app/scripts/app.js'],
  debug: true
}, watchify.args);

// only watch for changes in development mode
if (process.env.GULP_ENV !== 'production') {
  b = watchify(b);
}

function bundle() {
  return b.bundle()
    .on('error', msg => {
      delete msg.stream;
      $.util.log(msg);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(bs.stream({once: true}));
}

gulp.task('scripts', bundle);
b.on('update', bundle);

gulp.task('connect', ['scripts'], done => {
  bs.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app']
    }
  }, done);
});

gulp.task('watch', ['connect'], () => {
  gulp.watch([
    'app/index.html'
  ]).on('change', bs.reload);
});

gulp.task('serve', ['connect', 'watch']);

gulp.task('compress', () => {
  gulp.src('.tmp/scripts/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(size({gzip: false}));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('default', (done) => {
  runSequence('clean', 'scripts', 'compress', done);
})
