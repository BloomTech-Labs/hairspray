import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header />
        <Nav>
          <NavItem eventKey={1} href="#">
            <Link to="/signup">Sign Up</Link>
          </NavItem>
          <NavItem eventKey={2} href="#">
            <Link to="/signin">Sign In</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
