import React, { Component } from 'react';
import './App.css';
import LandPage from './components/LandPage';

class App extends Component {
  user = {
<<<<<<< HEAD
    name: 'test',
    email: 'testEmail',
    number: 'number',
  };
=======
    id:"5b216c18fa2b7528d03db8b5",
    name: "test",
    email: "testEmail@test.com",
    number: "1234567890",
    password:"testPassword",
  }
>>>>>>> master

  render() {
    return (
      <div className="App">
        <LandPage />
      </div>
    );
  }
}

export default App;
