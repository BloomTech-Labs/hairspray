import React, { Component } from "react";
import "./styles/css/index.css";
import LandPage from "./components/LandPage";
// import AdminFeedback from "../../hairspray-app/src/components/user/feedback/AdminFeedback"
import AdminFeedback from "./components/user/feedback/AdminFeedback"

// import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <AdminFeedback />
      </div>
    );
  }
}

export default App;
