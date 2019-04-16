import React, { Component } from "react";
import { connect } from "react-redux";
import { DropdownItem } from "reactstrap";

import { getAllStylists } from "../../../actions";

class Stylists extends Component {
	constructor(props) {
		super();
		this.user = {};
		this.user.stylist = { name: "Please Select a stylist", image: "" };
	}

	handleStylistChange = event => {
		const option = event.target.value;
		if (option !== "Please Select a Stylist")
			this.props.cbFromParent(this.props.stylists[option]);
	};

	componentDidMount() {
		this.props.getAllStylists();
	}

	render() {
		if (this.props.gettingStylists) {
			return <DropdownItem>Getting Stylists</DropdownItem>;
		} else {
			return this.props.stylists.map((stylist, i) => {
				return (
					<DropdownItem onClick={this.handleStylistChange} value={i} key={i}>
						{stylist.name}
					</DropdownItem>
				);
			});
		}
	}
}

const mapStateToProps = state => {
	return {
		gettingStylists: state.stylist.gettingStylists,
		stylists: state.stylist.stylists
	};
};

export default connect(
	mapStateToProps,
	{
		getAllStylists
	}
)(Stylists);
