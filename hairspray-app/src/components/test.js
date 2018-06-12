import React, { Component } from "react";
import { testRedux } from "../actions";
import { connect } from "react-redux";

class TestRedux extends Component {
  constructor() {
    super();
    this.testMethod = false;
  }
  
  componentDidMount() {
    this.testMethod = true;
   this.props.testRedux();
  }
  
	handleChange() {
		console.log("button Pressed");
	}

	render() {
		return (
			<div>
				"TEST SUCCESS"
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		test: state.test.testRedux
	};
};

export default connect(
	mapStateToProps,
	{ testRedux }
)(TestRedux);
