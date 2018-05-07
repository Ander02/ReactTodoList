import * as React from "react";

export class App extends React.Component<IProps, IState>{



	render() {
		return <h1>Wellcome {this.props.name}!</h1>
	}
}

interface IProps {
	name: string;
}

interface IState {

}
