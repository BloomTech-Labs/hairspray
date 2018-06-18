import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions";
import { userReducer } from "../../reducers/userReducer";
class DevUsers extends Component {
	componentDidMount() {
		this.props.getAllUsers();
	}

	render() {
		return (
			<div>
				{this.props.users.map(user => {
					return (
						<div>
							<div>{user._id}</div>
							<div>{user.name}</div>
							<div>{user.email}</div>
							<div>{user.number}</div>
						</div>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		users: state.userReducer.users
	};
};

export default connect(
	mapStateToProps,
	{ getAllUsers }
)(DevUsers);
