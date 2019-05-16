import React, { Component } from "react";
import { CitiesCrud, Cities } from "./";

class Home extends Component {
  render() {
    return (
      <div className="home fx fxdr fxjcc fxaic">
        <div className="w50">
          <CitiesCrud />
        </div>
        <div className="w50">
          <Cities />
        </div>
      </div>
    );
  }
}

export default Home;
