import React from 'react';
import HomePage from '../src/components/homepage/HomePage'
import Dashboard from '../src/components/dashboard/Dashboard'
import Listusers from '../src/components/user-page/UserPage'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
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
              <PrivateRoute path="/users">
                <Listusers></Listusers>
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
    );
}
// Guard for dashobad
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
