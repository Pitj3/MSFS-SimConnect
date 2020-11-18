import React from "react";

import "./styles.less";
import Inventory from "./components/Inventory";

interface Props {
    visible: boolean;
}

interface State {
	weaponName: string;
    currentAmmo: number;
    magazineCapacity: number;
}

export default class InventoryWrapper extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
            weaponName: '',
            currentAmmo: 0,
            magazineCapacity: 0,
        };
	}

	componentDidMount() {
		
    }

    componentWillUnmount() {
        
    }

	render() {
		return (
			<div className={"inventory-wrapper-component" + (this.props.visible ? " visible" : "")}>
                <Inventory />
            </div>
		);
	}
}
