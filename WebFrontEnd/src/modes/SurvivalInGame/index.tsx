import React from "react";

import "./styles.less";
import LoadingMessage from "../../components/LoadingMessage";
import ColorProgressBar from "../../components/ColorProgressBar";
import Typography from "@material-ui/core/Typography";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SurvivalInventory from "../../components/SurvivalInventory";

interface State {
	isInventoryShowing: boolean
}

export default class SurvivalInGameMode extends React.Component<{}, State> {
	constructor(props) {
		super(props);

		this.state = {
			isInventoryShowing: false,
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				isInventoryShowing: true
			});
		}, 10);
	}

	renderStatusArea() {
		return (
			<div className="status-area">
				<div className="status-item">
					<div className="item-bar-outer">
						<ColorProgressBar visible min={0} max={100} value={20} foregroundColor="#e64747" />
					</div>
					<div className="item-label">
						<LocalHospitalIcon className="item-icon" />
					</div>
				</div>

				<div className="status-item">
					<div className="item-bar-outer">
						<ColorProgressBar visible min={0} max={100} value={50} foregroundColor="#46a740" />
					</div>
					<div className="item-label">
						<LocalHospitalIcon className="item-icon" />
					</div>
				</div>

				<div className="status-item">
					<div className="item-bar-outer">
						<ColorProgressBar visible min={0} max={100} value={100} foregroundColor="#1e67a5" />
					</div>
					<div className="item-label">
						<LocalHospitalIcon className="item-icon" />
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { isInventoryShowing } = this.state;

		return (
			<div className="survival-in-game-mode">
				{isInventoryShowing &&
					<div className="inventory-outer">
						<SurvivalInventory />
					</div>
				}

				{!isInventoryShowing &&
					this.renderStatusArea()
				}
			</div>
		);
	}
}
