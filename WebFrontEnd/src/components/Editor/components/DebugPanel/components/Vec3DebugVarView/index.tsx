import React from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';

import { DebugUI } from "../../../../../../utils/DebugUi";

import "./styles.less";

interface Props {
	debugVar: DebugUI.DebugVariable;
	onChange?: Function;
}

interface State {
	min: number[];
	max: number[];
	value: number[];
}

export default class Vec3DebugVarView extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			min: [0, 0, 0],
			max: [100, 100, 100],
			value: [0, 0, 0]
		};
	}

	componentWillMount() {
		if (this.props.debugVar != null)
			this.processValue(this.props.debugVar.value + "");
	}

	componentWillReceiveProps(newProps) {
		if (newProps != null && newProps.debugVar != null)
			this.processValue(newProps.debugVar.value + "");
	}

	processValue(value: string) {
		if (value == null)
			return;

		let tokens = value.split(":");

		if (tokens == null || tokens.length !== 3)
			return;

		this.setState({
			min: this.parseVec(tokens[0]),
			max: this.parseVec(tokens[1]),
			value: this.parseVec(tokens[2])
		})
	}

	parseVec(input: string): number[] {
		if (input == null)
			return [0, 0, 0];

		let vec: number[] = [];
		let parts = input.split("|");

		if (parts != null && parts.length === 3) {
			vec[0] = parseFloat(parts[0]);
			vec[1] = parseFloat(parts[1]);
			vec[2] = parseFloat(parts[2]);
		}

		return vec;
	}

	handleChange = (event, value) => {
		this.setState({ value }, async () => {
			if (this.props.onChange != null) {
				let valueStr = this.state.min + ":" + this.state.max + ":" + this.state.value;

				await this.props.onChange(this.props.debugVar.name, this.props.debugVar.type, valueStr);
			}
		});
	}

	renderValue() {
		let value = +this.state.value;

		if (value > 999)
			return value.toFixed(3);

		else if (value > 99)
			return value.toFixed(4);

		else if (value > 9)
			return value.toFixed(5);

		else
			return value.toFixed(6);
	}

	render() {
		return (
			<div className="debug-variable debug-var-vec3">
				<div className="debug-var-name">
					<Typography variant="body1">
						{this.props.debugVar.name}
					</Typography>
				</div>
				<div className="debug-var-value">
					<div className="vec3-value">
						<TextField type="text" fullWidth value={(this.state.value != null ? this.state.value[0] : "")} />
					</div>
					<div className="vec3-value">
						<TextField type="text" fullWidth value={(this.state.value != null ? this.state.value[1] : "")} />
					</div>
					<div className="vec3-value">
						<TextField type="text" fullWidth value={(this.state.value != null ? this.state.value[2] : "")} />
					</div>
				</div>
			</div>
		);
	}
}
