import React from 'react';
import HomePage from '../src/components/homepage/HomePage'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
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

function Home() {
    return (
        <HomePage></HomePage>
    );
  }

export default App;
