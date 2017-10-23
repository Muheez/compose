//require component module
var Component = require("../lib/component")(),
    jsdom = require("jsdom").JSDOM;

describe("initializing component", function () {
    //setup dom
    var dom = new jsdom(
        "<!DOCTYPE html>" +
        "<html>" +
        "<head></head>" +
        "<body>" +
        "<p class='para'>Hello World</p>" +
        "</body>" +
        "</html>"
    );

    global.window = dom.window;
    global.document = dom.window.document;

    it("should return error if no arguments are provided", function () {
        expect(function () {
            return new Component();
        }).toThrowError("supply component class or id as reference string");
    })

    it("should initialize an instance of component", function () {
        var p = new Component(".para");
        var pref = document.querySelector(".para");

        expect(p.refString).toEqual(".para");
    })
})