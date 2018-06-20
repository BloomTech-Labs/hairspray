import React, { Component } from "react";
import { Button, Grid, Row, Col, Image } from "react-bootstrap";
import Header from "./Header";

class LandPage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<Header />
				<Grid>
					<Row>
						<Col>
							<Image
								src="https://www.reviewtrackers.com/wp-content/uploads/Hair-Salon-Review-Monitoring.jpg"
								height="400"
								width="600"
								rounded
							/>
						</Col>
					</Row>
				</Grid>;
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis
					diam nec risus ullamcorper dignissim. Mauris ornare tellus eros,
					euismod vehicula urna tristique pretium. In consectetur bibendum
					congue. Morbi dolor eros, vulputate non sapien eu, egestas vulputate
					leo. Morbi sit amet ipsum massa. Suspendisse sapien odio, lobortis
					varius justo non, ultricies elementum sem. Vestibulum eleifend, justo
					nec aliquam dictum, diam dui tincidunt nunc, vel ullamcorper justo
					libero eget lectus. Interdum et malesuada fames ac ante ipsum primis
				</p>
				<Button bsSize="large">Schedule Now</Button>
			</div>
		);
	}
}

export default LandPage;
