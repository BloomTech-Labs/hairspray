import React, { Component } from 'react';
import './App.css';
import LandPage from './components/LandPage';

class App extends Component {
  user = {
    name: 'test',
    email: 'testEmail',
    number: 'number',
  };

  render() {
    return (
      <div className="App">
        <LandPage />
      </div>
    );
  }
}

export default App;
