import React from "react";

import "./styles.less";

interface Props {
	disableAnimation?: boolean;
    className?: string;
}

export default class AttentionBox extends React.Component<Props> {
	constructor(props) {
		super(props);
	}

	render() {
		const { disableAnimation } = this.props;

		return (
			<div className={"attention-box-component " + this.props.className + (!disableAnimation ? " animated" : "")}>
                <div className="box-content">
                    {this.props.children}
                </div>
                <div className="box-inner-horizontal">

                </div>
                <div className="box-inner-vertical">

                </div>
            </div>
		);
	}
}
