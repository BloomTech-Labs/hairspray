import React, { Component } from "react";
import UserSettings from "./components/UserSettings.js";
import "./App.css";
import LandPage from "./components/LandPage";
import { StripeProvider } from "react-stripe-elements";

// import Header from './components/Header';

class App extends Component {
  user = {
    id: "5b216c18fa2b7528d03db8b5",
    name: "test",
    email: "testEmail@test.com",
    number: "1234567890",
    password: "testPassword"
  };

  render() {
    //return <div className="App">WIP</div>;
    return (
      <div>
        {/* <SignUp /> */}
        {/* <Header /> */}
        <LandPage />
        <UserSettings user={this.user} />;
      </div>
    );
  }
}

export default App;
