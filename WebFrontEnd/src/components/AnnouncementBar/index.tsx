import React from "react";
import Typography from "@material-ui/core/Typography";

import "./styles.less";

interface Props {
    visible: boolean;
    min: number;
    max: number;
    value: number;
}

interface State {
	
}

export default class AnnouncementBar extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = { }
	}

	componentDidMount() {
		
    }

	render() {
        return (
			<div className={"announcement-bar-component" + (this.props.visible ? " visible" : "")}>
                <div className="box-outer">
					<Typography className="announcement-text" color="inherit" variant="h4">
                        Wave 1
                    </Typography>
				</div>
            </div>
		);
	}
}
