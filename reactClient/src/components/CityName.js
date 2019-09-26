import React, { Component } from "react";
import { Images } from "../theme";
import { Nav } from "./";

class CityName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      loading: true,
      error: null,
      cname: "",
      filteredCities: [],
    };
  }

  cityNameChange = event => {
    let setCname = () => {
      return new Promise((res, rej) => {
        this.setState({ cname: event.target.value });
        res();
      });
    };

    let filterCities = () => {
      return new Promise((res, rej) => {
        const fcities = [];
        for (let i = 0, len = this.state.cities.length; i < len; i++) {
          if (
            this.state.cities[i].name.toLowerCase().includes(`${this.state.cname.toLowerCase()}`)
          ) {
            fcities.push(this.state.cities[i]);
          }
        }
        this.setState({ filteredCities: fcities });
        res();
      });
    };

    setCname().then(function() {
      filterCities();
    });
  };

  cityNameSubmit = event => {
    event.preventDefault();
    const fcities = [];
    for (let i = 0, len = this.state.cities.length; i < len; i++) {
      if (this.state.cities[i].name.toLowerCase().includes(`${this.state.cname.toLowerCase()}`)) {
        fcities.push(this.state.cities[i]);
      }
    }
    this.setState({ filteredCities: fcities });
    console.log(this.state.filteredCities);
  };

  getCities() {
    const url = `/api/cities`;
    setTimeout(() => {
      fetch(url)
        .then(response => response.json())
        .then(resData =>
          this.setState({
            cities: resData,
            loading: false,
          })
        )
        .catch(error => this.setState({ error, loading: false }));
    }, 1000);
  }

  componentDidMount() {
    this.getCities();
  }

  render() {
    const { cname, loading, cities, error, filteredCities } = this.state;
    return (
      <div className="cityname fx fxdc fxjcc fxaic">
        <Nav />
        <h2 className="title">City Name Filter</h2>
        <div className="cndiv">
          <div className="cityformdiv">
            <form onSubmit={this.cityNameSubmit}>
              <input
                type="text"
                name="cityname"
                autoComplete="off"
                placeholder="Type City Name"
                value={cname}
                onChange={this.cityNameChange}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div>
            {error ? <h2 className="title2 tac">{error.message}</h2> : null}
            {filteredCities.length > 0 ? (
              <>
                <h2 className="title2">
                  Match Count For:
                  <label>
                    {" "}
                    {cname} => ({filteredCities.length})
                  </label>
                </h2>
                <hr />
              </>
            ) : null}
            {!loading ? (
              cname === "" ? (
                cities.map(city => {
                  const { _id, name, population, country } = city;
                  return (
                    <div key={_id}>
                      <p>
                        <label>City Name: </label> {name}
                      </p>
                      <p>
                        <label>Population: </label> {population}
                      </p>
                      <p>
                        <label>Country:</label> {country}
                      </p>
                      <hr />
                    </div>
                  );
                })
              ) : filteredCities.length > 0 ? (
                filteredCities.map(city => {
                  const { _id, name, population, country } = city;
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
                        <label>Country:</label> {country}
                      </p>
                      <hr />
                    </div>
                  );
                })
              ) : (
                <div className="tac">
                  <h2 className="title2">
                    No City Name Match Found For :<label> {cname}</label>
                  </h2>
                  <hr />
                </div>
              )
            ) : (
              <div className="loading tac">
                <img src={Images.loading1} alt="loading" />
                <h3>LOADING...</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CityName;
