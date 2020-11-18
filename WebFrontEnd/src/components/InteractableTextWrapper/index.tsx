import React from "react";

import "./styles.less";
import InteractableText from "./components/InteractableText";

interface Props {
    visible: boolean;
}

interface State {
	interactableText: string;
}

export default class InteractableTextWrapper extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
            interactableText: '',
        };
	}

	componentDidMount() {
		window.addEventListener("reportInteractable", this.onReportInteractable);
    }

    componentWillUnmount() {
        window.removeEventListener("reportInteractable", this.onReportInteractable);
    }

    onReportInteractable = (e) => {
        this.setState({ interactableText: e.detail[0] });
    }

	render() {
        const { interactableText } = this.state;

        return (
			<div className={"interactable-text-wrapper" + (this.props.visible ? " visible" : "")}>
                <InteractableText interactableText={interactableText} />
            </div>
		);
	}
}
