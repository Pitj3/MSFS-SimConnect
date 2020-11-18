import React from "react";
import Typography from '@material-ui/core/Typography';

import { DebugUI } from "../../../../../../utils/DebugUi";

import "./styles.less";
import Slider2d from "./components/Slider2d";

interface Props {
	debugVar: DebugUI.DebugVariable;
	onChange?: Function;
}

interface State {
	min: number[];
	max: number[];
	value: number[];
}

export default class Slider2dDebugVarView extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			min: [0, 0],
			max: [100, 100],
			value: [0, 0]
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
			min: (this.parseVec(tokens[0])),
			max: (this.parseVec(tokens[1])),
			value: (this.parseVec(tokens[2]))
		});
	}

	parseVec(input: string): number[] {
		if (input == null)
			return [];

		let tokens = input.split(",");

		if (tokens == null || tokens.length !== 2)
			return [];

		return [+tokens[0], +tokens[1]];
	}

	handleChange = (value) => {
		this.setState({ value }, async () => {
			if (this.props.onChange != null) {
				let valueStr = this.state.min[0] + "," + this.state.min[1] + ":" + this.state.max[0] + "," + this.state.max[1] + ":" + this.state.value[0] + "," + this.state.value[1];

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
		let x = (+this.state.value[0] > 99 ? (+this.state.value[0]).toFixed(5) : (+this.state.value[0]).toFixed(6));
		let y = (+this.state.value[1] > 99 ? (+this.state.value[1]).toFixed(5) : (+this.state.value[1]).toFixed(6));

		return (
			<div className="debug-variable debug-var-slider2d">
				<div className="debug-var-name">
					<Typography variant="body1">
						{this.props.debugVar.name}
					</Typography>
				</div>
				<div className="debug-var-value">
					<Slider2d value={this.state.value} min={this.state.min} max={this.state.max} onChange={this.handleChange} />
					<div className="slider-value">
						({x}, {y})
					</div>
				</div>
			</div>
		);
	}
}
