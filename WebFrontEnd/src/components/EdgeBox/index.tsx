import React from "react";

import "./styles.less";

interface Props {
    
}

export default class EdgeBox extends React.Component<Props> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="edge-box-component">
                <div className="box-content">
                    {this.props.children}
                </div>
            </div>
		);
	}
}
