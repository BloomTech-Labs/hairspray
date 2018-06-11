import React, { Component } from 'react';

export default class SettingsButton extends Component {
    handleClick() {
        console.log(this);
        //this.props.callback(this.props.value);
    }

    render() {
        return(
            <button onClick={this.handleClick}>
            Edit
            </button>
        );
    }
}