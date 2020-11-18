import React from "react";
// import ReactDOM from "react-dom";
// import Typography from "@material-ui/core/Typography";

import "./styles.less";

interface Props {
	min: number[];
	max: number[];
	value: number[];
	small?: boolean;
	onChange?: Function;
}

interface State {
	x: number;
	y: number;
	width: number;
	height: number;
}

export default class Slider2d extends React.Component<Props, State> {
	// private isMouseDown = false;

	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		x: 0,
	// 		y: 0,
	// 		width: 12,
	// 		height: 12
	// 	};
	// }

	// componentWillMount() {

	// }

	// componentDidMount() {
	// 	let x = 0;
	// 	let y = 0;

	// 	if (this.props != null && this.props.value != null) {
	// 		let parentRect = (ReactDOM
	// 			.findDOMNode(this.refs['Slider2dSurface']) as any)
	// 			.getBoundingClientRect();

	// 		let minX = +this.props.min[0];
	// 		let minY = +this.props.min[1];
	// 		let maxX = +this.props.max[0];
	// 		let maxY = +this.props.max[1];
	// 		let xValueRange = maxX - minX;
	// 		let yValueRange = maxY - minY;

	// 		let xPerc = (this.props.value[0] - minX) / xValueRange;
	// 		let yPerc = (this.props.value[1] - minY) / yValueRange;

	// 		x = xPerc * parentRect.width;
	// 		y = yPerc * parentRect.height;
	// 		//y = this.props.value[1] - (height / 2);
	// 	}

	// 	this.setState({
	// 		x: x - (this.state.width / 2) - 1,
	// 		y: y - (this.state.height / 2) - 1
	// 	});
	// }

	// onMouseDown = (e) => {
	// 	this.isMouseDown = true;

	// 	this.setMousePos(e.clientX, e.clientY);
	// }

	// onMouseUp = (e) => {
	// 	this.isMouseDown = false;
	// }

	// onDragHandle = (e) => {
	// 	if (!this.isMouseDown)
	// 		return;

	// 	this.setMousePos(e.clientX, e.clientY);
	// }

	// setMousePos(x: number, y: number): void {
	// 	let parentRect = (ReactDOM
	// 		.findDOMNode(this.refs['Slider2dSurface']) as any)
	// 		.getBoundingClientRect();

	// 	let relativeX = (x - parentRect.x);
	// 	let relativeY = (y - parentRect.y);

	// 	this.setState({
	// 		x: relativeX - (this.state.width / 2) - 1,
	// 		y: relativeY - (this.state.height / 2) - 1
	// 	});

	// 	if (this.props.onChange != null) {
	// 		let xPerc = relativeX / parentRect.width;
	// 		let yPerc = relativeY / parentRect.height;

	// 		let xRange = this.props.max[0] - this.props.min[0];
	// 		let yRange = this.props.max[1] - this.props.min[1];

	// 		let xVal = (xPerc * xRange) + this.props.min[0];
	// 		let yVal = (yPerc * yRange) + this.props.min[1];

	// 		setTimeout(() => {
	// 			this.props.onChange([xVal, yVal]);
	// 		}, 0);
	// 	}
	// }

	// render() {
	// 	return (
	// 		<div className={"slider2d" + (this.props.small ? " slider2d-small" : "")}>
	// 			<div className="slider-surface"
	// 				onMouseDown={this.onMouseDown}
	// 				onMouseUp={this.onMouseUp}
	// 				onMouseMove={this.onDragHandle}
	// 				ref="Slider2dSurface"
	// 			>
	// 				<div className="drag-handle"
	// 					style={{
	// 						top: this.state.y,
	// 						left: this.state.x,
	// 						width: this.state.width + "px",
	// 						height: this.state.height + "px"
	// 					}}
	// 				></div>
	// 			</div>
	// 		</div>
	// 	);
	// }
}
