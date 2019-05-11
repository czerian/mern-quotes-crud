import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, CityName, Population, NotFound, Summer, JskingFetch } from "./components";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={JskingFetch} />
          <Route exact path="/fetch" component={Summer} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/city_name" component={CityName} />
          <Route exact path="/population" component={Population} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
