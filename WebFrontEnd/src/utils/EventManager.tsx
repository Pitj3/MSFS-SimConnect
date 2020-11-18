

interface EventInfo {
	name: string;
	details: any;
}

// export module EventManager {
// 	let events = {};

// 	export function initialize() {
// 		//console.log("Initializing EventManager.");

// 		//Qui.addHandler("event_dispatch", onEventDispatched);
// 	}

// 	export function cleanUp() {
// 		//Qui.removeHandler("event_dispatch", onEventDispatched);
// 	}

// 	function onEventDispatched(args: any[]) {
// 		//console.log("EventManager.onEventDispatched()");

// 		try {
// 			if (args == null)
// 				return;

// 			//console.log("args.length = " + args.length);

// 			let name = args[0] + "";
// 			let details = (args.length > 1 ? args[1] : null);

// 			//console.log("Event: " + name + " {" + details + "}");

// 			dispatch(name, details);

// 		} catch (error) {
// 			console.error("An error has occurred while processing an event.");
// 		}
// 	}

// 	export function addHandler(eventName: string, cbHandler: EventListenerObject | EventListener) {
// 		eventName = (eventName + '').toLowerCase();

// 		if (events[eventName] == null)
// 			events[eventName] = [];

// 		events[eventName].push(cbHandler);
// 	}

// 	export function removeHandler(eventName: string, cbHandler: EventListenerObject | EventListener) {
// 		eventName = (eventName + '').toLowerCase();

// 		if (events[eventName] == null)
// 			events[eventName] = [];

// 		let handlers = events[eventName];
// 		for (var i = 0, len = handlers.length; i < len; ++i) {
// 			var handler = handlers[i];

// 			if (handler != null && handler == cbHandler) {
// 				handlers.splice(i, 1);
// 				return;
// 			}
// 		}
// 	}

// 	/**
// 	 *
// 	 * @param eventName Dispatches an event with the specified name and options.
// 	 * Returns false if any of the registered handlers set the "cancel" property of the event to true,
// 	 * indicating that the event/operation should be canceled. Otherwise, returns true.
// 	 * @param details
// 	 */
// 	export async function dispatch(eventName: string, details?: any, dispatchAsync: boolean = true): Promise<boolean> {
// 		return new Promise<boolean>(function (resolve, reject) {
// 			eventName = (eventName + '').toLowerCase();

// 			//console.log("Dispatching Event: " + eventName);

// 			setTimeout(async function () {
// 				if (events[eventName] == null)
// 					events[eventName] = [];

// 				let handlers = events[eventName];
// 				let promises: Promise<boolean>[] = [];

// 				if (eventName != "onlogentry")
// 					performance.mark("event-start-" + eventName);

// 				for (var i = 0, len = handlers.length; i < len; ++i) {
// 					var handler = handlers[i];

// 					if (handler == null)
// 						continue;

// 					if (dispatchAsync) {
// 						promises.push(processHandler(handler, details));

// 					} else {
// 						try {
// 							if (!await processHandler(handler, details)) {
// 								// Event was cancelled.
// 								resolve(false);
// 								return;
// 							}
// 						} catch (error) {
// 							console.error("An error has occurred while dispatching a '" + eventName + "' event. Error: " + error.message, error);
// 						}
// 					}
// 				}

// 				if (!dispatchAsync) {
// 					resolve(true);
// 					return;
// 				}

// 				try {
// 					let results = await Promise.all(promises);

// 					if (eventName != "onlogentry") {
// 						performance.mark("event-end-" + eventName);

// 						performance.measure("Event: " + eventName, "event-start-" + eventName, "event-end-" + eventName);
// 					}

// 					if (results != null && results.length > 0) {
// 						for (var result of results) {
// 							if (result != null && result === false) {
// 								resolve(false);
// 								return;
// 							}
// 						}
// 					}

// 				} catch (error) {
// 					console.error("An error has occurred while dispatching a '" + eventName + "' event asynchronously. Error: " + error.message, error);
// 				}

// 				resolve(true);
// 			}, 0);
// 		});
// 	}

// 	function processHandler(handler, details: any) {
// 		return new Promise<boolean>((resolve, reject) => {
// 			setTimeout(async () => {
// 				try {
// 					let eventData = {
// 						detail: details,
// 						cancel: false
// 					};

// 					await handler(eventData);

// 					resolve(!eventData.cancel);
// 				} catch (error) {
// 					console.error("An error has occurred while executing an event handler. Error: " + error.message, error);
// 					reject(error);
// 				}
// 			}, 0);
// 		});
// 	}

// 	export function dispatchToBackend(eventName: string, data: any = null) {
// 		return new Promise<void>((resolve, reject) => {
// 			try {
// 				var xhr = new XMLHttpRequest;

// 				xhr.onload = function() {
// 					resolve();
// 				}

// 				xhr.onerror = function() {
// 					reject(new TypeError('Local request failed'))
// 				}

// 				xhr.open('POST', "http://events");
// 				xhr.send(JSON.stringify({
// 					eventName: eventName,
// 					data: data
// 				}));

// 			} catch (error) {
// 				console.error("An error has occurred while dispatching an event to the backend. Error: " + error.message);
// 				resolve(null);
// 				return;
// 			}
// 		});
// 	}
// }
