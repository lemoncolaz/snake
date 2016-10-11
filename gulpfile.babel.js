import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import less from 'gulp-less';
import watch from 'gulp-watch';
import rollup from 'gulp-rollup';
import rbabel from 'rollup-plugin-babel';

let PATH = {
    CSS: `src/css/*.less`,
    DIST: `dist/`,
    JS: `src/js/*.js`,
    ENTRY: `src/js/main.js`,
}
gulp.task("default", ()=>{
    console.log('正在处理...');

    gulp.start("build");
})

gulp.task("build", ["trans:less", "bundle"]);

gulp.task("watch", ["build", "watch:css","watch:js"]);

gulp.task("trans:less", ()=>{
    return gulp.src(PATH.CSS)
    .pipe(concat("snake.less"))
    .pipe(less())
    .pipe(gulp.dest(PATH.DIST));
});

gulp.task('bundle', function() {
  gulp.src(PATH.JS)
    // transform the files here.
    .pipe(rollup({
      // any option supported by Rollup can be set here.
      entry: PATH.ENTRY,
      format: 'cjs',
      plugins: [ rbabel() ],
      dest: 'snake.js'
    }))
    .pipe(babel())
    .pipe(gulp.dest(PATH.DIST));
});

// watch
gulp.task('watch:css', () => {
  return gulp.watch(PATH.CSS, ['trans:less'])
});
gulp.task('watch:js', () => {
  return gulp.watch(PATH.JS, ['bundle'])
});
