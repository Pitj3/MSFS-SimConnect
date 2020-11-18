import React from "react";

import Typography from '@material-ui/core/Typography';

import "./styles.less";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

interface Props {
	caption?: string;
	draggable?: boolean;
	className?: string;
}

interface State {

}

export default class Window extends React.Component<Props, State> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Draggable handle=".caption-bar" disabled={typeof this.props.draggable === "undefined" || !this.props.draggable}>
				<Paper className={"qui-window " + (this.props.className != null ? this.props.className : "")}>
					<div className="caption-bar">
						<Typography variant="subtitle1" style={{fontWeight: "bold"}}>
							{this.props.caption}
						</Typography>
					</div>
					<div className="window-body">
						{this.props.children}
					</div>
				</Paper>
			</Draggable>
		);
	}
}
