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

            //check if the element was found
            if (this.self == null) {
                throw new Error("element '" + this.refString + "' not found");
            }

            //store component in core
            CORE.components[this.refString] = this;
        }
    }

    //return component
    return Component;
}

module.exports = Component;

