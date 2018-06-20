import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class UserHome extends Component {
	render() {
		return (
			<div>
				<Link to="/user/">Home</Link>
				<div>
					<Link to="/user/scheduling">scheduling</Link>
				</div>

				<div>
					<Link to="/user/billing">billing</Link>
				</div>

				<div>
					<Link to="/user/feedback">feedback</Link>
				</div>

				<div>
					<Link to="/user/settings">settings</Link>
				</div>
			</div>
		);
	}
}
