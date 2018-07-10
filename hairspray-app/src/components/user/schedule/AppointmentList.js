import React from 'react';

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

export default AppointmentList;

