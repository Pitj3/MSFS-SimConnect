import React from "react";

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EntityList from "./components/EntityListPanel";

import "./styles.less";

interface State {

}

export default class SidePanel extends React.Component<{}, State> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="editor-panel">
				<EntityList />
				{/* <ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>Expansion Panel 2</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
						sit amet blandit leo lobortis eget.
					</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel disabled>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>Disabled Expansion Panel</Typography>
					</ExpansionPanelSummary>
				</ExpansionPanel> */}
			</div>
		);
	}
}
