// require observables
var Observable = require("rxjs").Observable;

// wrap event setter with a function with CORE and COMPONENT as dependencies
exports.registrar = function (CORE, COMPONENT) {
    return function (event, identifier) {
        // check if event and identifier are provided
        if (event && identifier) {
        	var event = event,
        	identifier = identifier;
    		//add event indentifier to event list
    		if(!CORE.events.hasOwnProperty(identifier)) {
    			CORE.events[identifier] = [];
    		}
    		//create observable from event
    		var obs = Observable.fromEvent(COMPONENT.self, event)
						.map(function(data) {
							//return an object containing element
							//and event object
							return {
								element: COMPONENT.self,
								event: data
							}
						});
			//subscibe to observable
			var sub = obs.subscribe(function(data) {
				//get event callbacks from events array with indentifier
				var callbacks = CORE.events[identifier];
				//loop through callback list and evoke each
				callbacks.forEach(function(cb) {
					//evoke
					cb(data);
				})
			})
			//push subscription to CORE subscription list
			CORE.subscriptions[identifier] = sub;
        } else {
            // thow error
            throw new Error("incomplete arguments; 'event' & 'identifier' needed");
        }
    }
}

//event listener
exports.listener = function(CORE) {
	return function(eventIdentifier, callback) {
		//check for complete arguments
		if(eventIdentifier && callback) {
			//if event identifier does not exist in core events list, add event
			if(!CORE.events.hasOwnProperty(eventIdentifier)) {
				//add event to event list
				CORE.events[eventIdentifier] = [];
			}
			//push callback to event array
			CORE.events[eventIdentifier].push(callback);
		} else {
			//thow error
			throw new Error("incomplete arguments; 'eventIdentifier' & 'callback' needed")
		}
	}
}