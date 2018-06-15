import React, { Component } from 'react';
import UserSettings from './components/UserSettings.js';
import './App.css';

class App extends Component {
  
  user = {
    id:"5b216c18fa2b7528d03db8b5",
    name: "test",
    email: "testEmail@test.com",
    number: "1234567890",
    password:"testPassword",
  }

  render() {
    //return <div className="App">WIP</div>;
    return <UserSettings user={this.user} />;
  }
}

export default App;
