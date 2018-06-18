import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header />
        <Nav>
          <NavItem eventKey={1} href="#">
            <Link to="/user/signup">Sign Up</Link>
          </NavItem>
          <NavItem eventKey={2} href="#">
            <Link to="/user/signin">Sign In</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(Header);
