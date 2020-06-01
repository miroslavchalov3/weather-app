import React from 'react';
import HomePage from '../src/components/homepage/HomePage'
import Dashboard from '../src/components/dashboard/Dashboard'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

import './App.css';

function App() {
    return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <HomePage></HomePage>
              </Route>
              <PrivateRoute path="/dashboard">
                <Dashboard></Dashboard>
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
    );
}

function PrivateRoute({ children, ...rest }) {
    let auth = sessionStorage.getItem('hash');

    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default App;
