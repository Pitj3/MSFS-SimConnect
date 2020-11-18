import React from "react";

import "./styles.less";
import LoadingMessage from "../../components/LoadingMessage";

interface State {
}

export default class LoadingMode extends React.Component<{}, State> {
	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {
		return (
			<div className="loading-screen-mode">
				<div className="loading-message-outer">
					<LoadingMessage />
				</div>
			</div>
		);
	}
}
