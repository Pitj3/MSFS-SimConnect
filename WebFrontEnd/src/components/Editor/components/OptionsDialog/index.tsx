import React from "react";

import "./styles.less";
import Window from "../Window";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import ButtonBase from "@material-ui/core/ButtonBase";

interface Props {
	caption?: string;
	visible?: boolean;
}

interface State {
	selectedTab: number;
}

export default class OptionsDialog extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			selectedTab: 0
		}
	}

	handleClickAway = (event) => {
        window.dispatchEvent(new CustomEvent("hideOptions"));
	}

	handleChangeTabs = (event, newValue) => {
		this.setState({
			selectedTab: newValue
		});
	}

	onCloseClick = (e) => {
        window.dispatchEvent(new CustomEvent("hideOptions"));
	}

	renderControls() {
		let elements = [];

		elements.push(
			<ListItem key={"control-item-" + elements.length}  button className="control-item">
				<Typography className="control-action" component="div">
					Forward
				</Typography>
				<Typography className="control-bind" component="div">
					W
				</Typography>
			</ListItem>
		);

		elements.push(
			<ListItem key={"control-item-" + elements.length} button className="control-item">
				<Typography className="control-action" component="div">
					Left
				</Typography>
				<Typography className="control-bind" component="div">
					A
				</Typography>
			</ListItem>
		);

		elements.push(
			<ListItem key={"control-item-" + elements.length} button className="control-item">
				<Typography className="control-action" component="div">
					Back
				</Typography>
				<Typography className="control-bind" component="div">
					S
				</Typography>
			</ListItem>
		);
		
		elements.push(
			<ListItem key={"control-item-" + elements.length} button className="control-item">
				<Typography className="control-action" component="div">
					Right
				</Typography>
				<Typography className="control-bind" component="div">
					D
				</Typography>
			</ListItem>
		);

		return elements;
	}

	render() {
		const { selectedTab } = this.state;

		return (
			<Dialog open={this.props.visible} className="options-dialog">
			{/* <Dialog open={true} className="options-dialog"> */}
				{/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
					{/* <DialogTitle>
						Options
					</DialogTitle> */}
					<DialogContent>
						<div className="options-dialog-content">
							<Tabs
								value={selectedTab}
								onChange={this.handleChangeTabs}
								indicatorColor="secondary"
								textColor="secondary"
								centered
							>
								<Tab label="Controls" />
								<Tab label="Graphics" />
								<Tab label="Audio" />
							</Tabs>
							{selectedTab === 0 &&
								<div className="options-page-controls">
									<List dense={true}>
										{this.renderControls()}
									</List>
								</div>
							}
						</div>
					</DialogContent>
					<DialogActions>
						<Button color="secondary" variant="contained" size="small" className="main-menu-button" onClick={this.onCloseClick}>
							Close
						</Button>
					</DialogActions>
				{/* </ClickAwayListener> */}
			</Dialog>
		);
	}
}
