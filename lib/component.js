//import Observables
var Observable = require("rxjs").Observable;

//wrap component constructor with a function that will return it
//when executed
//PS: CORE must be passed in as an argument
var Component = function (CORE) {
    //create Component constructor
    var Component = function (refString) {
        //check if arguments is empty
        if (arguments.length == 0) {
            //if arguments is empty, throw error
            throw new Error("supply component class or id as reference string");
            return;
        } else {
            //if arguments is not empty, set properties;
            this.refString = refString;
            this.self = document.querySelector(this.refString);
        }
    }

    //return component
    return Component;
}

module.exports = Component;

