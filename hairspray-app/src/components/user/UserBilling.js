import React, { Component } from "react";
import Checkout from "../StripeCheckout";

export default class UserBilling extends Component {
	render() {
		return (
			<div>
				<div>User Billing</div>
				<Checkout
					name={"Checkout form"}
					description={"To checkout things for stripe"}
					amount={1}
				/>
			</div>
		);
	}
}
