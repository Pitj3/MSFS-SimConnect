import React from "react";

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DebugPanel from "../../../DebugPanel";

import "./styles.less";

interface State {
	isExpanded: boolean;
}

export default class EntityListPanel extends React.Component<{}, State> {
	constructor(props) {
		super(props);

		this.state = {
			isExpanded: false
		};
	}

	componentDidMount() {
		window.addEventListener("showDebugPanel", this.onShowDebugPanel);
		window.addEventListener("hideDebugPanel", this.onHideDebugPanel);
		window.addEventListener("toggleDebugPanel", this.onToggleDebugPanel);
	}

	componentWillUnmount() {
		window.removeEventListener("showDebugPanel", this.onShowDebugPanel);
		window.removeEventListener("hideDebugPanel", this.onHideDebugPanel);
		window.removeEventListener("toggleDebugPanel", this.onToggleDebugPanel);
	}

	fetchLocal(url): Promise<Response> {
		return new Promise<Response>((resolve, reject) => {
			var xhr = new XMLHttpRequest;

			xhr.onload = function() {
				resolve(new Response(xhr.responseText, {status: xhr.status}))
			}

			xhr.onerror = function() {
				reject(new TypeError('Local request failed'))
			}

			xhr.open('GET', url);
			xhr.send(null);
		});
	}

	onShowDebugPanel = (e) => {
		this.setState({
			isExpanded: true
		});
	}

	onHideDebugPanel = (e) => {
		this.setState({
			isExpanded: false
		});
	}

	onToggleDebugPanel = (e) => {
		this.setState({
			isExpanded: !this.state.isExpanded
		});
	}

	render() {
		return (
			<ExpansionPanel expanded={this.state.isExpanded} onChange={this.onToggleDebugPanel}
				classes={{
					root: "entity-list-panel"
				}}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>Debug Variables</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails style={{
						padding: "16px 8px"
					}}>
					<DebugPanel />
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}
