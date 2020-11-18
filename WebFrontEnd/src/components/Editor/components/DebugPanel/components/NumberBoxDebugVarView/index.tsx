import React from "react";

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { DebugUI } from "../../../../../../utils/DebugUi";

interface Props {
	debugVar: DebugUI.DebugVariable;
	onChange?: Function;
}

interface State {
	value: string;
}

export default class NumberBoxDebugVarView extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.debugVar.value
		};
	}

	componentWillReceiveProps(newProps) {
		if (newProps != null && newProps.debugVar != null) {
			this.setState({
				value: (+newProps.debugVar.value) + ""
			});
		}
	}

	handleTextFieldChange = (event) => {
		this.setState({value: event.target.value}, async () => {
			if (this.props.onChange != null) {
				await this.props.onChange(this.props.debugVar.name, this.props.debugVar.type, event.target.value + "");
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
					<TextField type="number" fullWidth value={this.state.value} onChange={this.handleTextFieldChange} />
				</div>
			</div>
		);
	}
}
