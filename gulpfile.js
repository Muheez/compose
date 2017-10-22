var gulp = require("gulp"),
    jasmine = require("gulp-jasmine"),
    reporter = require("jasmine-console-reporter")

gulp.task("test", function () {
    gulp.src("spec/test.js")
        .pipe(jasmine({
            reporter: new reporter({
                colors: 1,
                cleanStack: 1,
                verbosity: 4,
                listStyle: "indent",
                activity: false
            })
        }));
})