import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    CardText
} from "reactstrap";


const AppointmentList = ({ session, stylist, client, time }) => {
    return (
        <div>
            <CardText>
                <ul>
                    <li>{session}</li>
                    <li>{stylist}</li>
                    <li>{client}</li>
                    <li>{time}</li>
                </ul>
            </CardText>
        </div>
    )
}

AppointmentList.propTypes = {
    session: PropTypes.string.isRequired,
    stylist: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};

export default AppointmentList;

