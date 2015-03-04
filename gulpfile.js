var gulp = require("gulp");
var connect = require("gulp-connect");
var path = require("path");

var paths = [
  "./root/createjs/**/*.css",
  "./root/createjs/**/*.html",
  "./root/createjs/**/*.js"
];


gulp.task("connect", function() {
  connect.server({
    livereload: true,
    port: 8001,
    root: path.resolve("./root/")
  });
});

gulp.task("connect-static", function() {
  connect.server({
    livereload: false,
    port: 8001,
    root: path.resolve("./root/")
  });
});


gulp.task("watch", function() {
  gulp.watch(paths, ["reload"]);
});


gulp.task("reload", function() {
  gulp.src(paths)
    .pipe(connect.reload());
});


gulp.task("default", ["connect", "watch"]);
gulp.task("static", ["connect-static", "watch"]);
