var JasmineConsoleReporter = require('jasmine-console-reporter');

// init jasmine console reporter
var reporter = new JasmineConsoleReporter({
    colors: 1,           
    cleanStack: 1,   
    verbosity: 4,  
    listStyle: 'indent',
    activity: false
});

//add reporter to jasmine
jasmine.getEnv().addReporter(reporter);