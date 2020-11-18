import React from "react";

import "./styles.less";
import { Typography } from "@material-ui/core";

interface Props {
    weaponName: string;
    currentAmmo: number;
    magazineCapacity: number;
}

interface State {
	
}

export default class EquippedWeaponInfo extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = { };
	}

	render() {
        const { weaponName, currentAmmo, magazineCapacity } = this.props;

		return (
			<div className={"weapon-info-component" + (weaponName !== "" ? " visible" : "")}>
                <div className="weapon-name">
                    <Typography className="weapon-text" color="inherit" variant="h2">
                        {weaponName}
                    </Typography>
                </div>
                <div className="ammo-outer">
                    <Typography className="weapon-text available-ammo" color="inherit" variant="h2">
                        {currentAmmo}
                    </Typography>

                    <Typography className="weapon-text magazine-total" color="inherit" variant="h2">
                        {magazineCapacity}
                    </Typography>
                </div>
            </div>
		);
	}
}
