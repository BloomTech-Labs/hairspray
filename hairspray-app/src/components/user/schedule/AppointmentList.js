import React from 'react';

const ApptList = ({ session, stylist, client, time }) => {
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

export default ApptList;





{/* TODO: MAKE SURE TO USE KEY PROP */ }
{/* <div className="appt-time">
                    <ul>
                        {this.props.appointments.appt && this.props.appointments.appt.map(time => <li >{time.session}</li>)}
                    </ul>
                </div>
                <div className="stylist-name">
                    <ul>
                        {this.props.appointments.appt && this.props.appointments.appt.map(styler => <li >{styler.stylist.name}</li>)}
                    </ul>
                </div>
                <div className="client">
                    <ul>
                        {this.props.appointments.appt && this.props.appointments.appt.map(client => <li >{client.user.name}</li>)}
                    </ul>
                </div>
                <div className="services">
                    <ul>
                        {this.props.appointments.appt && this.props.appointments.appt.map(service => <li >{service.service[0].type}</li>)}
                    </ul>
                </div> */}


