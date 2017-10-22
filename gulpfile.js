var gulp = require("gulp"),
    jasmine = require("gulp-jasmine"),
    reporter = require("jasmine-console-reporter"),
    webpack = require("gulp-webpack");

gulp.task("test", function () {
    gulp.src("spec/*.js")
        .pipe(jasmine({
            reporter: new reporter({
                colors: 1,
                cleanStack: 1,
                verbosity: 4,
                listStyle: "indent",
                activity: false
            })
        }));
});

gulp.task("bundle", function () {
    gulp.src("./lib/core.js")
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(gulp.dest("./"));
});

gulp.task("default", ["test", "bundle", "watch"]);

gulp.task("watch", function () {
    gulp.watch("./lib/*.js", ["test", "bundle"]);
})

