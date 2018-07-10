import React from "react";
// import PropTypes from "prop-types";
import {
    Card,
    CardBody,
    CardText
} from "reactstrap";


const AppointmentList = ({ session, stylist, client, time }) => {
    return (
        <div>
            <Card>
                <CardBody inverse style={{ backgroundColor: '#f68a5f', borderColor: 'black' }}>
                    <CardText>{session}</CardText>
                    <CardText>{stylist}</CardText>
                    <CardText>{client}</CardText>
                    <CardText>{time}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

// AppointmentList.propTypes = {
//     session: PropTypes.string.isRequired,
//     stylist: PropTypes.string.isRequired,
//     client: PropTypes.string.isRequired,
//     time: PropTypes.string.isRequired,
// };

export default AppointmentList;

