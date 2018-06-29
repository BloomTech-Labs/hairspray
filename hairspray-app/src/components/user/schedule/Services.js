import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";

import { getAllServices } from "../../../actions";

class Services extends Component {
	constructor(props) {
    super();
    this.user = {};
    this.user.service = { _id: "", type: "Please Select a Service", price: "" };
	}

	buttonServiceHandler(event) {
    this.user.service = this.props.services[event.target.value];
		this.props.cbFromParent(this.props.services[event.target.value]);
	}


	componentDidMount() {
		this.props.getAllServices();
	}

	render() {
		if (this.props.gettingService) {
			return <div>Getting Services</div>;
		} else if (this.props.services) {

			return (
				<ButtonGroup vertical>
					{this.props.services.map((service, i) => {
						return (
							<Button
								value={i}
								key={i}
								type="button"
								onClick={this.buttonServiceHandler.bind(this)}
								active={this.user.service._id === service._id}
								className="services__button"
							>
								{service.type + ": " + service.price}
							</Button>
						);
					})}
				</ButtonGroup>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		gettingService: state.services.gettingService,
		services: state.services.services
	};
};

export default connect(
	mapStateToProps,
	{
		getAllServices
	}
)(Services);
