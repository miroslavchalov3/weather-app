import React from 'react';
import HomePage from '../src/components/homepage/HomePage.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
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
            </Switch>
          </div>
        </Router>
    );
}

export default App;
