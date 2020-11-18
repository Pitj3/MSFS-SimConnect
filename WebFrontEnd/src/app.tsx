import React from "react";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Editor from "./components/Editor";

import "./app.less";
import LoadingMode from "./modes/LoadingMode";
import SurvivalInGameMode from "./modes/SurvivalInGame";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#2e313a',
			light: '#575a64',
			dark: '040814',
			//contrastText: '#fff',
		},
		secondary: {
			main: '#376fd8',
			light: '#749dff',
			dark: '#0045a6',
			//contrastText: '#232323',
		},
		text: {
			primary: "#fff",
			secondary: "#c1c1c1"
		},
		background: {
			default: "transparent"
		},
		// Used by `getContrastText()` to maximize the contrast between the background and
		// the text.
		contrastThreshold: 3,
		// Used to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
	overrides: {
		MuiDialog: {
			paper: {
				backgroundColor: "#2e313a"
			}
		},
		MuiExpansionPanel: {
			root: {
				backgroundColor: "#232323"
			}
		},
	// 	MuiButton: {
	// 		root: {
	// 			fontSize: "1.6rem",
	// 		},
	// 		label: {
	// 			textTransform: "none",
	// 		},
	// 		flatPrimary: {},
	// 		flatSecondary: {},
	// 		raised: {},
	// 		raisedPrimary: {},
	// 		raisedSecondary: {},
	// 		sizeSmall: {
	// 			fontSize: "1.0rem",
	// 		},
	// 		sizeLarge: {
	// 			fontSize: "1.9rem",
	// 		},
	// 	},
		MuiInput: {
			input: {
				height: "2.1em",
				padding: "7px 7px",
				backgroundColor: "rgba(125, 125, 125, 0.31)",
				borderRadius: "2px",
				boxSizing: "border-box",
				transition: "background-color ease-out 260ms",
				color: "rgb(222, 222, 222)",
				"&:focus": {
					backgroundColor: "rgb(60, 60, 60)",
					// color: "rgb(32, 32, 32)"
				}
			},
			// inputType: {
			// 	height: "2.1em",
			// 	padding: "7px 7px",
			// 	backgroundColor: "rgba(255, 255, 255, 0.164)",
			// 	borderRadius: "2px",
			// 	boxSizing: "border-box",
			// 	transition: "background-color ease-out 260ms",
			// 	color: "rgb(245, 245, 245)",

			// 	"&:focus": {
			// 		backgroundColor: "rgb(238, 238, 238)",
			// 		color: "rgb(32, 32, 32)"
			// 	}
			// },
		},
	// 	MuiInputLabel: {
	// 		root: {
	// 			padding: "1px 7px 0 7px",
	// 			color: "rgb(245, 245, 245)"
	// 		},
	// 	},
	// 	MuiFormControlLabel: {
	// 		label: {
	// 			fontSize: 18
	// 		},
	// 	},
	// 	MuiCheckbox: {
	// 		root: {
	// 			color: "#ffa129"
	// 		}
	// 	},
		MuiPaper: {
			root: {
				backgroundColor: "#2e313a"
			}
		},
		MuiTab: {
			root: {
				color: "#fff",

				"&$selected": {
					color: "#fff",
				},
			},
			textColorPrimary: {
				color: "#e8e8e8",
			},
			textColorSecondary: {
				color: "#e8e8e8"
			},
		}
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontSize: 12,
		h3: {
			fontWeight: 500
		},
		h4: {
			fontWeight: 500
		},
	},
});

interface State {

}

export default class App extends React.Component<{}, State> {
	constructor(props) {
		super(props);

		this.state = { }
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />

				
			</MuiThemeProvider>
		);
	}
}
