import React from "react";

import "./styles.less";
import { Typography } from "@material-ui/core";

interface Props {

}

interface State {
	
}

export default class Inventory extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = { };
	}

	render() {
        const slotElements: any[] = [];

        for (let i = 0; i < 20; ++i) {
            slotElements.push(
                <div key={"inventory-slot-" + i} className="inventory-item">

                </div>
            );
        }

		return (
			<div className={"inventory-component"}>
                {slotElements}
            </div>
		);
	}
}
