import React from "react";

import "./styles.less";
import { Typography } from "@material-ui/core";
import AttentionBox from "../../../AttentionBox";

interface Props {
    interactableText: string;
}

interface State {
	
}

export default class InteractableText extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = { };
	}

	render() {
        const { interactableText } = this.props;

		return (
            <div className={"interactable-text-component" + (interactableText !== "" ? " visible" : "")}>
                <AttentionBox>
                    <Typography className={"interactable-text"} color="inherit" variant="h4">
                        {interactableText}
                    </Typography>
                </AttentionBox>
            </div>
		);
	}
}
