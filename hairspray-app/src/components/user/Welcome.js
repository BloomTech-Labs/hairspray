import React, { Component } from "react";

export default class Welcome extends Component {
	render() {
		return (
			<div className="welcome">
				<div className="title">Welcome to Hairspray!</div>
				<img className="pic" src="https://obscure-island-58835.herokuapp.com/images/logo.png" alt="hairspray logo"/> 
			</div>
		);
	}
}
