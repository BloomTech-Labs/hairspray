import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import App from './App';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import './index.css';

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
        {/* <Route path="/client" component={} /> */}
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        {/* <Route path="/feedback" component={} />
			<Route path="/admin" component={} /> */}
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
