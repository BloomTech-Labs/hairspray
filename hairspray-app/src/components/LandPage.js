import React, { Component } from "react";
// import { Button, Grid, Row, Col, Image } from "react-bootstrap";
import Header from "./Header";
import { Link } from "react-router-dom";
import { getAllStylists } from "../actions";
import { connect } from "react-redux";

import { UncontrolledCarousel, Button } from "reactstrap";

class LandPage extends Component {
  constructor(props) {
    super(props);
    super(props);
    this.stylists = [];
  }

  componentDidMount() {
    this.props.getAllStylists();
  }

  render() {
    if (this.props.gettingStylists) {
    } else {
      this.props.stylists.forEach((stylist, i) => {
        this.stylists.push({
          src: stylist.image
        });
      });
    }
    return (
      <div className="landing">
        <div className="landing__nav">
          <Header />
        </div>
        {this.props.gettingStylists ? null : (
          <UncontrolledCarousel
            className="landing__carousel"
            items={this.stylists}
          />
        )}
        Book an appointment now, with one of these amazing stylists!
        <Link to="/signin">
          <Button className="landing__button">Schedule Now!</Button>
        </Link>
      </div>
    );
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
)(LandPage);
