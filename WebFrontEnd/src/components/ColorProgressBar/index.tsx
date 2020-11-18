import React from "react";

import "./styles.less";

interface Props {
    visible: boolean;
    min: number;
    max: number;
    value: number;
	foregroundColor?: string;
}

interface State {

}

export default class ColorProgressBar extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = { }
	}

	componentDidMount() {

    }

    renderFill() {
        const { min, max, value, foregroundColor } = this.props;

		const foreColor = foregroundColor != null ? foregroundColor : "white";

        const range = (max - min);
        const perc = (value / max) * 100;

        return (
            <div className="bar-fill" style={{ height: perc + "%", backgroundColor: foreColor }}>

            </div>
        )
    }

	render() {
        return (
			<div className={"color-progress-bar-component" + (this.props.visible ? " visible" : "")}>
                <div className="bar-outter">
                    {this.renderFill()}
                </div>
            </div>
		);
	}
}
