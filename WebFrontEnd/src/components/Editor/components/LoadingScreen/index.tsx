import React from "react";

import "./styles.less";
import LoadingMessage from "../../../LoadingMessage";

interface Props {
	visible?: boolean;
}

interface State {

}

export default class LoadingScreen extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = { };
	}

	render() {
		if (!this.props.visible)
			return null;

		return (
			<div className="loading-screen-component">
				<div className="loading-message-outer">
                    <LoadingMessage />
                </div>
			</div>
		);
	}
}
