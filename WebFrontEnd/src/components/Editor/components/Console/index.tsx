import React from "react";

import "./styles.less";
import Window from "../Window";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

interface Props {
	caption?: string;
	visible?: boolean;
}

interface State {
	logs: string[];
	command: string
}

export default class Console extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			logs: [
				"Quadrion Engine"
			],
			command: ""
		}
	}

	componentDidMount() {
		window.addEventListener("log", this.onLog);
    }

    componentWillUnmount() {
        window.removeEventListener("log", this.onLog);
    }

	onLog = (e) => {
		const logs = this.state.logs;

		if (e == null || e.detail == null || typeof e.detail.length === "undefined")
			return;

		for (let i = 0, len = e.detail.length; i < len; ++i)
			logs.push(e.detail[i]);

		this.setState({
			logs: logs
		})
	}

	onCommandChange = (e) => {
		this.setState({
			command: e.target.value
		});
	}

	onSubmit = (e) => {
		if (this.state.command == null || this.state.command == "")
			return;

		let logs = this.state.logs;

		const command = this.state.command;

		logs.push(command);

		this.setState({
			logs: logs,
			command: ""
		});

        // TODO: Implement a way to dispatch an event to the backend.
		// EventManager.dispatchToBackend("consoleCommand", {
		// 	command: command
		// });
	}

	renderLogs() {
		return this.state.logs.map((item, index) => {
			return (
				<div key={"log-" + index}>
					{item}
				</div>
			);
		});
	}

	render() {
		return (
			<Window caption="Console" draggable className={"dev-console" + (this.props.visible ? " visible" : "")}>
				<div className="dev-console-body">
					{this.renderLogs()}
				</div>
				<div className="dev-console-control-bar">
					<div className="text-box-outter">
						<TextField
							fullWidth
							onKeyPress={(e) => {
								if (e.key === "Enter")
									this.onSubmit(null);
							}}
							className="text-box"
							placeholder="Enter a command..."
							value={this.state.command}
							onChange={this.onCommandChange} />
					</div>

					<div className="submit-button-outter">
						<Button fullWidth size="small"
								onClick={this.onSubmit}
								className="submit-button"
								variant="outlined"
								color="inherit"
								style={{
									padding: "0 8px"
								}}>
							Submit
						</Button>
					</div>
				</div>
			</Window>
		);
	}
}
