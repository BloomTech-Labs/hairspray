import React, { Component } from 'react';

export default class UserSettingsForm extends Component {
    
    
    handleName = event => {
        this.updateName = event.target.value;
    }

    render() {
        return (
            <div>
                <form>
                    <input 
                    value={this.props.user.name} 
                    name="name"
                    type="text"
                    onChange={this.handleName}
                    placeholder={this.props.user.name.updatedName} />
                </form>
            </div>
        );
    }
}