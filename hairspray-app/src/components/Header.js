import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "../styles/style.less";

export default class Header extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/signup">
            <Button to="/signup">Sign Up</Button>
          </Link>
          <Link to="/signin">
            <Button to="/signin">Sign In</Button>
          </Link>
        </div>
		<div className="header"> TEST</div>
      </div>
    );
  }
}
