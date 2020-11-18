import React from "react";

import Typography from '@material-ui/core/Typography';
import Checkbox from "@material-ui/core/Checkbox";

import { DebugUI } from "../../../../../../utils/DebugUi";

interface Props {
	debugVar: DebugUI.DebugVariable;
	onChange?: Function;
}

interface State {
	value: boolean;
}

export default class CheckBoxDebugVarView extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			value: (this.props.debugVar.value !== "0" && this.props.debugVar.value !== "")
		};
	}

	componentWillReceiveProps(newProps) {
		if (newProps != null && newProps.debugVar != null) {
			this.setState({
				value: (newProps.debugVar.value !== "0" && newProps.debugVar.value !== "")
			});
		}
	}

	handleChange = (event) => {
		this.setState({value: !this.state.value}, async () => {
			if (this.props.onChange != null) {
				await this.props.onChange(this.props.debugVar.name, this.props.debugVar.type, (this.state.value ? "1" : "0"));
			}
		});
	}

	render() {
		return (
			<div className="debug-variable debug-var-numberbox">
				<div className="debug-var-name">
					<Typography variant="body1">
						{this.props.debugVar.name}
					</Typography>
				</div>
				<div className="debug-var-value" style={{padding: "0 2px"}}>
					<Checkbox color="default" checked={this.state.value} onMouseUp={this.handleChange} />
				</div>
			</div>
		);
	}
}
