import React, { Component } from "react";
import { Images } from "../theme";
import { Nav } from ".";

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      loading: true,
      title: null,
      error: null,
    };
  }

  getCities() {
    const url = `/api/cities`;
    setTimeout(() => {
      fetch(url)
        .then(response => response.json())
        .then(resData =>
          this.setState({
            cities: resData,
            loading: false,
            title: <h2>Fetch API JSON response from /api/cities</h2>,
          })
        )
        .catch(error => this.setState({ error, loading: false }));
    }, 3000);
  }

  componentDidMount() {
    this.getCities();
  }

  render() {
    const { loading, cities, title, error } = this.state;
    return (
      <div className="initialfetch fx fxdc fxjcc fxaic">
        <Nav />
        <div>
          {error ? <p className="title2 tac">{error.message}</p> : null}
          {title ? title : null}
          {!loading ? (
            cities.map(city => {
              const { _id, name, population, country, date } = city;

              return (
                <div key={_id}>
                  <p>
                    <label>City Name: </label>
                    {name}
                  </p>
                  <p>
                    <label>Population: </label> {population}
                  </p>
                  <p>
                    <label>Country: </label> {country}
                  </p>
                  <p>
                    <label>ID: </label> {_id}
                  </p>
                  <p>
                    <label>Date Added: </label> {date}
                  </p>
                  <hr />
                </div>
              );
            })
          ) : (
            <div className="loading tac">
              {/* <img src={Images.loading3} alt="loading" /> */}
              <img src={Images.loading1} alt="loading" />
              <h3>LOADING...</h3>
              <h3>
                Fetch query to /api/cities with a 3 seconds setTimeout delay to simulate the query
                process.
              </h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Cities;
