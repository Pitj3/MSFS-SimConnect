declare var DEBUG: boolean;

export module DebugUI {
	export interface DebugVariable {
		name: string;
		type: string;
		value: string;
	}

	export async function getVarsAsync(): Promise<DebugVariable[]> {
		return new Promise<DebugVariable[]>((resolve, reject) => {
			try {
				if (DEBUG) {
					let responseData = JSON.parse('{"debugVars":['
						+ '{"name":"test","type":"NumberBox","value":1.000000},'
						+ '{"name":"test","type":"NumberBox","value":1.000000},'
						+ '{"name":"test","type":"Slider2d","value":"0,0:100,100:50.000000,50.000000"},'
						+ '{"name":"test","type":"NumberBox","value":1.000000},'
						+ '{"name":"test","type":"CheckBox","value":1},'
						+ '{"name":"test","type":"CheckBox","value":0},'
						+ '{"name":"test","type":"NumberBox","value":1.000000},'
						+ '{"name":"test","type":"NumberBox","value":1.000000},'
						+ '{"name":"testSlider","type":"Slider","value":"0:10:0.200000"}'
						+ ']}');

					resolve(responseData.debugVars as DebugVariable[]);

				} else {
					var xhr = new XMLHttpRequest;

					xhr.onload = function() {
						let responseText = xhr.responseText;

						if (responseText == null || (responseText + "") === "") {
							resolve(null);
							return;
						}

						let responseData = JSON.parse(responseText);

						resolve(responseData.debugVars as DebugVariable[]);
					}

					xhr.onerror = function() {
						reject(new TypeError('Local request failed'))
					}

					xhr.open('GET', "http://debug");
					xhr.send(null);
				}

			} catch (error) {
				console.error("An error has occurred while updating the debug variables. Error: " + error.message);
				resolve(null);
				return;
			}
		});
	}

	export async function uploadVarsAsync(debugVars: DebugVariable[]): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			try {
				var xhr = new XMLHttpRequest;

				xhr.onload = function() {
					resolve();
				}

				xhr.onerror = function() {
					reject(new TypeError('Local request failed'))
				}

				xhr.open('POST', "http://debug");
				xhr.send(JSON.stringify(debugVars));

			} catch (error) {
				console.error("An error has occurred while updating the debug variables. Error: " + error.message);
				resolve(null);
				return;
			}
		});
	}
}
