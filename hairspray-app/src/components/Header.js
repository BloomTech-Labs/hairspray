import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class Header extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Hairspray</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/signup">
                <NavLink>Sign Up</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/signin">
                <NavLink>Sign In</NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
