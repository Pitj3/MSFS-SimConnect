import React from "react";

import "./styles.less";

interface Props {

}

interface State {
	
}

export default class AnimatedBall extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = { };
	}

	render() {
		return (
			<div className="ball">
                <div className="circle circle-1">

                </div>
                <div className="circle circle-2">

                </div>

                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-3"></div>
            </div>
		);
	}
}
