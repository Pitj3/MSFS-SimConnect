import React from "react";

import "./styles.less";

interface Props {
    visible: boolean;
    min: number;
    max: number;
    value: number;
}

interface State {
	
}

export default class StaminaBar extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = { }
	}

	componentDidMount() {
		
    }

    renderFill() {
        const { min, max, value } = this.props;

        const range = (max - min);
        const perc = (value / max) * 100;

        return (
            <div className="bar-fill" style={{ width: perc + "%" }}>

            </div>
        )
    }

	render() {
        return (
			<div className={"stamina-bar-component" + (this.props.visible ? " visible" : "")}>
                <div className="bar-outter">
                    {this.renderFill()}
                </div>
            </div>
		);
	}
}
