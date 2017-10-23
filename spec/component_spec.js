//require component module
var componentModule = require("../lib/component"),
    jsdom = require("jsdom").JSDOM;

describe("instantiating a component", function () {
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

    //fake CORE object
    var CORE,
        Component;

    beforeEach(function () {
        //mock CORE
        CORE = {
            components: {}
        }

        //get component constructor with fake CORE
        Component = componentModule(CORE);
    })
    

    it("should return error if no arguments are provided", function () {
        expect(function () {
            return new Component();
        }).toThrowError("supply component class or id as reference string");
    });

    it("should return an instance of component", function () {
        var p = new Component(".para");
        var pref = document.querySelector(".para");

        expect(p.refString).toEqual(".para");
        expect(pref).toEqual(p.self);
    });

    it("should throw error if element was not found", function () {
        expect(function () {
            return new Component(".classthatdoesnotexist");
        }).toThrowError(Error);
        expect(CORE.components).toEqual({});
    });

    it("should store component instance in CORE components object", function () {
        var p = new Component(".para");
        
        expect(CORE.components.hasOwnProperty(".para")).toBe(true);
    });

    it("should throw error if component already exists", function () {
        var p = new Component(".para");

        expect(function () {
            return new Component(".para");
        }).toThrowError(Error);
    })
})