import React from "react";
import PropTypes from "prop-types";


const AppointmentList = ({ session, stylist, client, time }) => {
    return (
        <div>
            <ul>
                <li>{session}</li>
                <li>{stylist}</li>
                <li>{client}</li>
                <li>{time}</li>
            </ul>
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

