import React from "react";

import "./styles.less";
import Window from "../Window";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import OptionsDialog from "../OptionsDialog";
//import img from "./ss.png";

interface Props {
	caption?: string;
	visible?: boolean;
}

interface State {
	isOptionsDialogShowing: boolean;
}

export default class MainMenuRed extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			isOptionsDialogShowing: false
		}
	}

	componentDidMount() {
		console.log("MainMenuRed mounted.");

		// Register event handlers.
		window.addEventListener("showOptions", this.onShowOptionsDialog);
		window.addEventListener("hideOptions", this.onHideOptionsDialog);
	}

	componentWillUnmount() {
		// Unregister event handlers.
		window.removeEventListener("showOptions", this.onShowOptionsDialog);
		window.removeEventListener("hideOptions", this.onHideOptionsDialog);
	}

	onResumeClick = (e) => {
        // TODO: Implement a way to dispatch an event to the backend.

		// We send the toggleGameMenu event to the backend because multiple things in the engine
		// are affected by wether the game menu is visible or not, so it's simpler to just let the
		// backend take care of calling showGameMenu and hideGameMenu.
		//EventManager.dispatchToBackend("toggleGameMenu");
	}

	onOptionsClick = (e) => {
        console.log("Options button clicked.");
        window.dispatchEvent(new CustomEvent("showOptions"));
	}

	onExitClick = (e) => {
		console.log("Exit button clicked.");
        window.dispatchEvent(new CustomEvent("quit"));
	}

	onShowOptionsDialog = (e) => {
		this.setState({ isOptionsDialogShowing: true });
	}

	onHideOptionsDialog = (e) => {
		this.setState({ isOptionsDialogShowing: false });
	}

	onToggleDrawer = (e) => {
		
	}

	render() {
		let className = "";

		if (this.props.visible != null) {
			if (this.props.visible === true)
				className = " show";
			else
			className = " hide";
		}

		return (
			<div className={"main-menu-red-component" + className} /*style={{backgroundImage: "./" + img}}*/>
				<Drawer open={this.props.visible} onClose={this.onToggleDrawer}>
					<div
					tabIndex={0}
					role="button"
					onClick={this.onToggleDrawer}
					onKeyDown={this.onToggleDrawer}
					>
					<div>
						<List>
							{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
							))}
						</List>
						<Divider />
						<List>
							{['All mail', 'Trash', 'Spam'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
							))}
						</List>
						</div>
					</div>
				</Drawer>
				{/* <div className="main-menu-background">

				</div>

				<div className="main-menu-background-white">
				</div> */}

				{/* <div className="main-menu">
					<div className="menu-content">
						<div className="menu-button">
							<Button onClick={this.onResumeClick}>
								Resume
							</Button>
						</div>

						<div className="menu-button">
							<Button onClick={this.onOptionsClick} className="menu-button">
								Options
							</Button>
						</div>

						<div className="menu-button">
							<Button onClick={this.onExitClick} className="menu-button">
								Quit
							</Button>
						</div>
					</div>

					<div id="quadrion-engine" className="menu-content section-right">
						<Typography color="inherit" variant="h3">
							Quadrion Engine
						</Typography>
					</div>
				</div>*/}

				<OptionsDialog visible={this.state.isOptionsDialogShowing} />
			</div>
		);
	}
}
