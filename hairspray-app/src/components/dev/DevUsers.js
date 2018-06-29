import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions";

class DevUsers extends Component {
	componentDidMount() {
		this.props.getAllUsers();
	}

	mapUsers() {
		return this.props.users.map(user => {
			return (
				<div>
					<div>{user._id}</div>
					<div>{user.name}</div>
					<div>{user.email}</div>
					<div>{user.number}</div>
				</div>
			);
		});
	}

	userMapper = () => {
		if (this.props.gettingUsers) return <div>Getting Users...</div>;
		else return this.mapUsers();
	};

	render() {
		return <div>{this.userMapper()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		users: state.user.users,
		gettingUsers: state.user.gettingUsers
	};
};

export default connect(
	mapStateToProps,
	{ getAllUsers }
)(DevUsers);
