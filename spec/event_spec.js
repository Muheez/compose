var event = require("../lib/event"),
	jsdom = require("jsdom").JSDOM;

describe("event registration", function() {
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

	//fake CORE, COMPONENT
	var CORE,
	COMPONENT,
	register;

	beforeEach(function() {
		CORE = {
			events: {},
			subscriptions: {}
		};
		COMPONENT = {
			self: document.querySelector(".para")
		};
		register = event.registrar(CORE, COMPONENT);
	})

	it("should throw error if arguments are not complete", function() {
		expect(function() {
			return register("click");
		}).toThrowError("incomplete arguments; 'event' & 'identifier' needed");
	});

	it('add new array to CORE.events with event identifier as property name', function() {
		var eventIdentifier = "paragraphClick";
		register("click", eventIdentifier);
		var hasProperty = CORE.events.hasOwnProperty(eventIdentifier);
		expect(hasProperty).toBe(true);
	});

	it('add new subscription object to CORE subscription list with event identifier', function() {
		var eventIdentifier = "paragraphClick",
		hasProperty;
		register("click", eventIdentifier);
		hasProperty = CORE.subscriptions.hasOwnProperty(eventIdentifier);
		expect(hasProperty).toBe(true);
	})
})

describe('event listening', function() {
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
	global.Event = dom.window.Event;

	//fake CORE, COMPONENT
	var CORE,
	listen,
	register;

	beforeEach(function() {
		CORE = {
			events: {},
			subscriptions: {}
		};
		COMPONENT = {
			self: document.querySelector(".para")
		};
		listen = event.listener(CORE);
		register = event.registrar(CORE, COMPONENT);
	});

	it('throw error if arguments are incomplete', function() {
		expect(function() {
			return listen("paragraphClick");
		}).toThrowError("incomplete arguments; 'eventIdentifier' & 'callback' needed");
	});

	it('should populate events object if eventName does not exist yet', function() {
		var eventName = "anotherParagraphClick",
		callback = function(data) {
			console.log(data);
		},
		hasProperty;
		listen(eventName, callback);
		hasProperty = CORE.events.hasOwnProperty(eventName);
		expect(hasProperty).toBeTruthy();
	});

	it('should add callback function to event array', function() {
		var eventName = "anotherParagraphClick",
		callback = function(data) {
			console.log(data);
		};
		listen(eventName, callback);
		expect(CORE.events[eventName][0]).toEqual(callback);
	});

	it('should invoke callback function when registered event is triggered', function() {
		var eventName = "paragraphClick",
		called,
		callback = function(data) {
			called = true;
		},
		clickEvent = new Event("click");
		register("click", eventName);
		listen(eventName, callback);
		COMPONENT.self.dispatchEvent(clickEvent);
		expect(called).toBeTruthy();
	});
});