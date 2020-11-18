import React from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { DebugUI } from "../../../../../../utils/DebugUi";

import "./styles.less";

interface Props {
	debugVar: DebugUI.DebugVariable;
	onChange?: Function;
}

interface State {
	min: number;
	max: number;
	value: number;
}

export default class SliderDebugVarView extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			min: 0,
			max: 100,
			value: 0
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
			min: (+tokens[0]),
			max: (+tokens[1]),
			value: (+tokens[2])
		});
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
			<div className="debug-variable debug-var-slider">
				<div className="debug-var-name">
					<Typography variant="body1">
						{this.props.debugVar.name}
					</Typography>
				</div>
				<div className="debug-var-value">
					{/* <Slider value={this.state.value} min={this.state.min} max={this.state.max} step={0.00001} aria-labelledby="label" onChange={this.handleChange} />
					<div className="slider-value">
						{(+this.state.value > 99 ? (+this.state.value).toFixed(5) : (+this.state.value).toFixed(6))}
					</div> */}
				</div>
			</div>
		);
	}
}
