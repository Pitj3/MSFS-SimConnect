import React from "react";

import "./styles.less";
import EquippedWeaponInfo from "./components/EquippedWeaponInfo";

interface Props {
    visible: boolean;
}

interface State {
	weaponName: string;
    currentAmmo: number;
    magazineCapacity: number;
}

export default class EquippedWeaponInfoWrapper extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
            weaponName: '',
            currentAmmo: 0,
            magazineCapacity: 0,
        };
	}

	componentDidMount() {
		window.addEventListener("reportCurrentWeapon", this.onReportCurrentWeapon);
        window.addEventListener("reportCurrentAmmo", this.onReportCurrentAmmo);
        window.addEventListener("reportCurrentWeaponMagCap", this.onReportCurrentWeaponMagCap);
    }

    componentWillUnmount() {
        window.removeEventListener("reportCurrentWeapon", this.onReportCurrentWeapon);
        window.removeEventListener("reportCurrentAmmo", this.onReportCurrentAmmo);
        window.removeEventListener("reportCurrentWeaponMagCap", this.onReportCurrentWeaponMagCap);
    }

    onReportCurrentWeapon = (e) => {

        this.setState({ weaponName: e.detail[0] });
    }

    onReportCurrentAmmo = (e) => {
        this.setState({ currentAmmo: e.detail[0] });
    }

    onReportCurrentWeaponMagCap = (e) => {
        this.setState({ magazineCapacity: e.detail[0] });
    }

	render() {
        const { weaponName, currentAmmo, magazineCapacity } = this.state;

		return (
			<div className={"equipped-weapon-info-wrapper" + (this.props.visible ? " visible" : "")}>
                <EquippedWeaponInfo weaponName={weaponName} currentAmmo={currentAmmo} magazineCapacity={magazineCapacity} />
            </div>
		);
	}
}
