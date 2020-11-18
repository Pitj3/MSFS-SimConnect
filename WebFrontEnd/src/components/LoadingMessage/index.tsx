import React from "react";
import AnimatedBall from "../AnimatedBall";

import "./styles.less";
import Typography from "@material-ui/core/Typography";

interface Props {

}

interface State {
	
}

export default class LoadingMessage extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = { };
	}

	render() {
		return (
			<div className="loading-message-component">
                <div className="loading-text">
                    <Typography variant="h4" color="inherit">
                        Loading
                    </Typography>
                </div>
                <div className="animated-ball-outer">
                    <AnimatedBall />
                </div>
            </div>
		);
	}
}
