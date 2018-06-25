import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
	render() {
		return (
			<div>
				<div>
					<Link to="/signup">Sign Up</Link>
				</div>
				<div>
					<Link to="/signin">Sign In</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authenticated: state.auth.authenticated
	};
};

export default connect(mapStateToProps)(Header);
