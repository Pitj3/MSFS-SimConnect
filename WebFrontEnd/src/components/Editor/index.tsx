import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

// Icons
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Reorder from '@material-ui/icons/Reorder';
import MailIcon from '@material-ui/icons/Mail';

import SidePanel from "./components/SidePanel";
import Console from "./components/Console";
import MainMenuRed from "./components/MainMenuRed";
import LoadingScreen from "./components/LoadingScreen";
import AnimatedBall from "../AnimatedBall";

import "./styles.less";
import OptionsDialog from "./components/OptionsDialog";
import StaminaBar from "../StaminaBar";
import { Typography } from "@material-ui/core";
import EquippedWeaponInfoWrapper from "../EquippedWeaponInfoWrapper";
import InteractableTextWrapper from "../InteractableTextWrapper";
import AttentionBox from "../AttentionBox";
import EdgeBox from "../EdgeBox";
import InventoryWrapper from "../InventoryWrapper";
import AnnouncementBar from "../AnnouncementBar";

interface State {
	isGameMenuShowing: boolean;
	isOptionsDialogShowing: boolean;
    isConsoleShowing: boolean;
    stamina: number;
}

export default class Editor extends React.Component<{}, State> {
	private hoverTimerHandle = null;

	constructor(props) {
		super(props);

		this.state = {
			isGameMenuShowing: false,
			isOptionsDialogShowing: false,
            isConsoleShowing: false,
            stamina: 100,
		}

		this.hoverTimerHandle = null;
	}

	componentDidMount() {
        // Register event handlers.
		window.addEventListener("showGameMenu", this.onShowGameMenu);
		window.addEventListener("hideGameMenu", this.onHideGameMenu);
		window.addEventListener("showOptions", this.onShowOptionsDialog);
		window.addEventListener("hideOptions", this.onHideOptionsDialog);
		window.addEventListener("showConsole", this.onShowConsole);
        window.addEventListener("hideConsole", this.onHideConsole);
        window.addEventListener("reportStamina", this.onReportStamina);

		this.hoverTimerHandle = null;

		// TODO: Remove the block below after testing.
		// setTimeout(() => {
		// 	EventManager.dispatch("showGameMenu");
		// }, 300);

		// setTimeout(() => {
		// 	EventManager.dispatch("showConsole");
		// }, 400);
	}

	componentWillUnmount() {
		// Unregister event handlers.
		window.removeEventListener("showGameMenu", this.onShowGameMenu);
		window.removeEventListener("hideGameMenu", this.onHideGameMenu);
		window.removeEventListener("showOptions", this.onShowOptionsDialog);
		window.removeEventListener("hideOptions", this.onHideOptionsDialog);
		window.removeEventListener("showConsole", this.onShowConsole);
        window.removeEventListener("hideConsole", this.onHideConsole);
        window.removeEventListener("reportStamina", this.onReportStamina);

		if (this.hoverTimerHandle != null) {
			clearTimeout(this.hoverTimerHandle);
			this.hoverTimerHandle = null;
		}
	}

	onShowGameMenu = (e) => {
		this.setState({ isGameMenuShowing: true });
	}

	onHideGameMenu = (e) => {
		this.setState({ isGameMenuShowing: false });
	}

	onShowOptionsDialog = (e) => {
		this.setState({ isOptionsDialogShowing: true });
	}

	onHideOptionsDialog = (e) => {
		this.setState({ isOptionsDialogShowing: false });
	}

	onShowConsole = (e) => {
		this.setState({ isConsoleShowing: true });
	}

	onHideConsole = (e) => {
		this.setState({ isConsoleShowing: false });
    }

    onReportStamina = (e) => {
        this.setState({ stamina: +e.detail[0] });
    }

	onMenuClick = (e) => {
		// We send the toggleGameMenu event to the backend because multiple things in the engine
		// are affected by wether the game menu is visible or not, so it's simpler to just let the
		// backend take care of calling showGameMenu and hideGameMenu.
		//EventManager.dispatchToBackend("toggleGameMenu", null);

		if (this.state.isGameMenuShowing) {
			this.setState({
				isGameMenuShowing: false
			});
		} else {
			this.setState({
				isGameMenuShowing: true
			});
		}
	}

	onHoverEnter = (e) => {
		if (this.hoverTimerHandle != null) {
			clearTimeout(this.hoverTimerHandle);
			this.hoverTimerHandle = null;
		}

		// Start a timer to make sure the user holds their mouse within the hover area for
		// a sufficient amount of time.
		this.hoverTimerHandle = setTimeout(() => {
			if (!this.state.isGameMenuShowing) {
				this.setState({
					isGameMenuShowing: true
				})
			}
		}, 200);
	}

	onHoverExit = (e) => {
		if (this.hoverTimerHandle != null) {
			clearTimeout(this.hoverTimerHandle);
			this.hoverTimerHandle = null;
		}
	}

	onToggleDrawer = (e) => {
		this.setState({
			isGameMenuShowing: false
		})
	}

	onOptionsClick = (e) => {
		console.log("Options button clicked.");
        window.dispatchEvent(new CustomEvent("showOptions"));
	}

	onExitClick = (e) => {
		console.log("Exit button clicked.");
		window.dispatchEvent(new CustomEvent("quit"));
	}

	render() {
        const { stamina } = this.state;

        const isGameUiVisible = !this.state.isConsoleShowing;

		return (
			<div className="editor-component">
				{/* {!this.state.isGameMenuShowing &&
					<div className="main-menu-hover-trigger" onMouseEnter={this.onHoverEnter} onMouseLeave={this.onHoverExit}>
						&nbsp;
					</div>
				}

				{!this.state.isGameMenuShowing &&
					<div className="main-menu-button-outer">
						<IconButton onClick={this.onMenuClick}>
							<Reorder />
						</IconButton>
					</div>
				} */}

				<div className="top-bar-outer">
                    <AnnouncementBar visible={isGameUiVisible} min={0} max={100} value={stamina} />
                </div>

                {/* <div className="stamina-outer">
                    <StaminaBar visible={isGameUiVisible} min={0} max={100} value={stamina} />
                </div> */}

                <div className="interactable-text-outer">
                    <InteractableTextWrapper visible={true} />
                </div>

                <div className="weapon-info-outer">
                    <EquippedWeaponInfoWrapper visible={isGameUiVisible} />
                </div>

                {/* <div className="inventory-outer">
                    <InventoryWrapper visible />
                </div> */}

				{/* <div className="clouds-outer">
					<div className="red-cloud cloud" style={{ backgroundImage: "url('src/images/redClouds.png')"}}></div>
					<div className="green-cloud cloud" style={{ backgroundImage: "url('src/images/greenClouds.png')"}}></div>
					<div className="blue-cloud cloud" style={{ backgroundImage: "url('src/images/blueClouds.png')"}}></div>
				</div> */}

				{/* <SidePanel /> */}

                {/* <div className="attention-box-outter">
                    <AttentionBox>
                        <Typography className={"interactable-text"} color="inherit" variant="h4">
                            Press E To Use
                        </Typography>
                    </AttentionBox>
                </div> */}

				{/* <Drawer open={this.state.isGameMenuShowing} onClose={this.onToggleDrawer}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.onToggleDrawer}
						onKeyDown={this.onToggleDrawer}>
					    <div className="editor-menu-outer">
                            <List>
                                <List>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <InboxIcon className="list-icon" color="inherit" />
                                        </ListItemIcon>
                                        <ListItemText primary={"Toggle Debug Vars"} />
                                    </ListItem>
                                </List>
                                <Divider />
                                <ListItem button>
                                    <ListItemIcon>
                                        <InboxIcon className="list-icon" color="inherit" />
                                    </ListItemIcon>
                                    <ListItemText primary={"Switch Game State"} />
                                </ListItem>

                                <ListItem button onClick={this.onOptionsClick}>
                                    <ListItemIcon>
                                        <InboxIcon className="list-icon" color="inherit" />
                                    </ListItemIcon>
                                    <ListItemText primary={"Options"} />
                                </ListItem>

                                <ListItem button onClick={this.onExitClick}>
                                    <ListItemIcon>
                                        <InboxIcon className="list-icon" color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={"Quit"} />
                                </ListItem>
                            </List>
						</div>
					</div>
				</Drawer> */}

				{/* <LoadingScreen visible={true} /> */}
				{/* <MainMenuRed visible={this.state.isGameMenuShowing} /> */}
				{/* <Console visible={this.state.isConsoleShowing} />

				<OptionsDialog visible={this.state.isOptionsDialogShowing} /> */}
			</div>
		);
	}
}
