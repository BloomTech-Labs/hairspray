import React, { Component } from 'react';
import UserSettings from './components/UserSettings.js';
import TestRedux from './components/test.js';
import './App.css';

class App extends Component {
  
  user = {
    name: "test",
    email: "testEmail",
    number: "number",
  }

  render() {
    //return <div className="App">WIP</div>;
    //return <UserSettings user={this.user} />;
    return <TestRedux/>
  }
}

export default App;
