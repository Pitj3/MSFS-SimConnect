import React from "react";

import "./styles.less";

interface Props {
    className?: string;
}

export default class GuiWindow extends React.Component<Props> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={"window-component " + this.props.className}>
                <div className="window-content">
                    {this.props.children}
                </div>
            </div>
		);
	}
}
