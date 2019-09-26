import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  QuotesCrud,
  NotFound,
} from "./components";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={QuotesCrud} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
