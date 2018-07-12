import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

export default class Header extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Hairspray</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="/signup">Sign Up</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/signin">Sign In</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
