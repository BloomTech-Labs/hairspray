import React, { Component } from 'react';
import './App.css';
import LandPage from './components/LandPage';
// import Header from './components/Header';
import Calendar from "react-material-calender";

class App extends Component {
  render() {
    return (
      <div>
        <LandPage />
      </div>
    );
  }
}

export default App;
