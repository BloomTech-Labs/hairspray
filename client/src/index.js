import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { BrowserRouter as Router, Route } from "react-router-dom";
import rootReducer from "./reducers";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserHome from "./components/user/UserHome";
import UserScheduling from "./components/user/schedule/UserScheduling";
import UserBilling from "./components/user/UserBilling";
import UserFeedback from "./components/user/feedback/UserFeedback";
import UserSettings from "./components/user/settings/UserSettings";
import DevUsers from "./components/dev/DevUsers";
import Welcome from "./components/user/Welcome";

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				{/* Landing Page, Sign in, and Sign Out */}
				<Route exact path="/" component={App} />
				<Route path="/signin" component={SignIn} />
				<Route path="/signup" component={SignUp} />
				<Route path="/user" component={UserHome} />
				<Route path="/user/home" component={Welcome} />
				<Route path="/user/scheduling" component={UserScheduling} />
				<Route path="/user/billing" component={UserBilling} />
				<Route path="/user/feedback" component={UserFeedback} />
				<Route path="/user/settings" component={UserSettings} />
				<Route path="/dev/users" component={DevUsers} />
				{/* <Route path="/admin" component={} /> */}
			</div>
		</Router>
	</Provider>,
	document.getElementById("root")
);