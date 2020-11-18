import React from "react";
import GridLayout from 'react-grid-layout';
import "./react-grid-layout-styles.less";
import "./react-resizable-styles.less";

import "./styles.less";
import GuiWindow from "../GuiWindow";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import { AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {

}

interface State {
	isStorageOpen: boolean;
}

export default class SurvivalInventory extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			isStorageOpen: false,
		}
	}

	handleAccordion = (event, isExpanded) => {
		this.setState({
			isStorageOpen: isExpanded,
		})
	}

	renderItems() {
		const NUM_COLUMNS = 5;
		const layout: any[] = [];

		let elements: any[] = [];

		for (let i = 0; i <= 16; ++i) {
			const col = (i % NUM_COLUMNS);
			const row = Math.trunc(i / NUM_COLUMNS);

			layout.push({
				i: i + "",
				x: col,
				y: row,
				w: 1,
				h: 1,
				maxW: 1,
				maxH: 1
			});

			elements.push(
				<div key={i + ""} className="item">

				</div>
			);
		}

		return (
			<GridLayout className="layout"
						layout={layout}
						cols={NUM_COLUMNS}
						rowHeight={50}
						width={312}
						isResizable={false}
						verticalCompact={false}
						preventCollision={true}>
				{/* <div key="a">a</div>
				<div key="b">b</div>
				<div key="c">c</div> */}
				{elements}
			</GridLayout>
		)
	}

	render() {
		return (
			<GuiWindow className="survival-inventory-component">
				<div className="window-columns">
					<Column title="Near Me" className="around-me">
						<div className="item-list">
							{this.renderItems()}
						</div>
						<div className="container-list">
							<Accordion className="expandable-item-list" expanded={this.state.isStorageOpen} onChange={this.handleAccordion} TransitionProps={{ unmountOnExit: true }}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel2bh-content"
									id="panel2bh-header"
								>
									<Typography>
										Item with Storage
									</Typography>
								</AccordionSummary>
								<AccordionDetails classes={{ root: "accordion-list-outer" }}>
									<div className="item-list">
										{this.renderItems()}
									</div>
								</AccordionDetails>
							</Accordion>
							<Accordion className="expandable-item-list" expanded={false} TransitionProps={{ unmountOnExit: true }}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel2bh-content"
									id="panel2bh-header"
								>
									<Typography>
										Other Item with storage
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
										diam eros in elit. Pellentesque convallis laoreet laoreet.
									</Typography>
								</AccordionDetails>
							</Accordion>
						</div>
					</Column>

					<Column title="Player Information" centerTitle className="player-info">
						<div className="player-details">
							<div className="player-details-half">
								<div className="player-picture">

								</div>
								<div className="player-name-outer">
									<Typography variant="h5" className="player-name">
										Player Name
									</Typography>
								</div>
							</div>
							<div className="player-details-half">
								<div className="detailed-player-status">

								</div>
							</div>
						</div>
						<div className="item-details">

						</div>
					</Column>

					<Column className="around-me">

					</Column>
				</div>
            </GuiWindow>
		);
	}
}

function Column(props: any) {
	return (
		<div className={"window-column " + props.className}>
			{props.title &&
				<ColumnTitle centerTitle={props.centerTitle}>
					{props.title}
				</ColumnTitle>
			}
			<div className="column-content">
				{props.children}
			</div>
		</div>
	)
}

function ColumnTitle(props: any) {
	return (
		<div className={"column-title" + (props.centerTitle ? " center" : "")}>
			<Typography>
				{props.children}
			</Typography>
		</div>
	)
}
