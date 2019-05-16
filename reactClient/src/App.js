import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  CityName,
  Population,
  NotFound,
  CitiesCrud,
  Cities,
  QuotesCrud,
  Jonkri,
} from "./components";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" component={CitiesCrud} />
          <Route exact path="/cities" component={Cities} />
          <Route exact path="/quotes_crud" component={QuotesCrud} />
          <Route exact path="/jonkri" component={Jonkri} />
          <Route exact path="/city_name" component={CityName} />
          <Route exact path="/population" component={Population} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
