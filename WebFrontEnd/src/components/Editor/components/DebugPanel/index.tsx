import React from "react";

import { DebugUI } from "../../../../utils/DebugUi";
import NumberBoxDebugVarView from "./components/NumberBoxDebugVarView";
import SliderDebugVarView from "./components/SliderDebugVarView";
import Slider2dDebugVarView from "./components/Slider2dDebugVarView";
import Vec3DebugVarView from "./components/Vec3DebugVarView";

import "./styles.less";
import CheckBoxDebugVarView from "./components/CheckBoxDebugVarView";

interface State {
	debugVars: DebugUI.DebugVariable[];
}

export default class DebugPanel extends React.Component<{}, State> {
	isLoaded: boolean;
	debugVarUpdatedHandle: number = null;

	constructor(props) {
		super(props);

		this.state = {
			debugVars: null
		};
	}

	componentDidMount() {
		this.isLoaded = true;

		setTimeout(async () => {
			await this.updateDebugVarsAsync();
		}, 0);

		setTimeout(() => {
			//this.enableUpdateLoop();
		}, 200);
	}

	componentWillUnmount() {
		this.isLoaded = false;
	}

	onDebugVarUpdated = (e) => {
		console.log("Received callback for onDebugVarUpdated.");
	}

	onDebugUpdated = (e) => {
		setTimeout(async () => {
			if (!this.isLoaded)
				return;

			//console.log("Debug updated. Retrieving new values...");

			await this.updateDebugVarsAsync();
		}, 0);
	}

	async updateDebugVarsAsync() {
		if (!this.isLoaded)
			return;

		// let debugVars = await DebugUI.getVarsAsync();

		// if (debugVars != null) {
		// 	this.setState({
		// 		debugVars: debugVars
		// 	});
		// }
	}

	enableUpdateLoop() {
		if (!this.isLoaded)
			return;

		let updateFunc = async () => {
			if (!this.isLoaded)
				return;

			await this.updateDebugVarsAsync();

			if (this.isLoaded)
				setTimeout(updateFunc, 100);
		};

		setTimeout(updateFunc, 100);
	}

	handleDebugVarUpdate = async (name: string, type: string, value: string) => {
		try {
			// Create and send a new query.
			// var request_id = (window as any).cefQuery({
			// 	request: 'my_request',
			// 	persistent: false,
			// 	onSuccess: function(response) {},
			// 	onFailure: function(error_code, error_message) {}
			// });

			// // Optionally cancel the query.
			// (window as any).cefQueryCancel(request_id);

			// await DebugUI.uploadVarsAsync([
			// 	{
			// 		name: name,
			// 		type: type,
			// 		value: value
			// 	}
			// ]);
		} catch (error) {
			console.error("An error has occurred while uploading debug variable values. Error: " + error.message);
		}
	}

	renderDebugVars() {
		let debugVarComponents = [];

		if (this.state.debugVars != null && this.state.debugVars.length > 0) {
			for (let i = 0, len = this.state.debugVars.length; i < len; ++i) {
				let debugVar = this.state.debugVars[i];

				if (debugVar == null)
					continue;

				switch (debugVar.type.toLowerCase()) {
					case "numberbox":
						debugVarComponents.push(
							<NumberBoxDebugVarView key={"debugvar-" + i}
											   debugVar={debugVar}
											   onChange={this.handleDebugVarUpdate} />
						);
					 	break;

					case "slider":
						debugVarComponents.push(
							<SliderDebugVarView key={"debugvar-" + i}
											   debugVar={debugVar}
											   onChange={this.handleDebugVarUpdate} />
						);
						 break;

					case "slider2d":
						 debugVarComponents.push(
							 <Slider2dDebugVarView key={"debugvar-" + i}
												debugVar={debugVar}
												onChange={this.handleDebugVarUpdate} />
						 );
						  break;

					case "vec3":
						 debugVarComponents.push(
							 <Vec3DebugVarView key={"debugvar-" + i}
												debugVar={debugVar}
												onChange={this.handleDebugVarUpdate} />
						 );
						  break;

					case "checkbox":
						 debugVarComponents.push(
							 <CheckBoxDebugVarView key={"debugvar-" + i}
												debugVar={debugVar}
												onChange={this.handleDebugVarUpdate} />
						 );
						  break;

					default:
						console.warn("Unknown Debug Variable type: " + debugVar.type);
						break;
				}
			}
		}

		return debugVarComponents;
	}

	render() {
		return (
			<div className="debug-panel-outter">
				{this.renderDebugVars()}
			</div>
		);
	}
}
