import React, { Component } from "react";
import { Images } from "../theme";
import { Nav } from ".";

class Population extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      loading: true,
      error: null,
      population: "",
      filteredCities: [],
      rbSelect: "equal",
    };
  }

  filterPopulation = () => {
    return new Promise((res, _rej) => {
      const fpopulation = [];
      for (let i = 0, len = this.state.cities.length; i < len; i++) {
        switch (this.state.rbSelect) {
          case "less":
            // eslint-disable-next-line
            let less =
              this.state.cities[i].population < this.state.population
                ? fpopulation.push(this.state.cities[i])
                : null;
            break;
          case "equal": // eslint-disable-next-line
            let equal =
              // eslint-disable-next-line
              this.state.cities[i].population == this.state.population
                ? fpopulation.push(this.state.cities[i])
                : null;
            break;
          case "greater": // eslint-disable-next-line
            let greater =
              this.state.cities[i].population > this.state.population
                ? fpopulation.push(this.state.cities[i])
                : null;
            break;
          default:
            // eslint-disable-next-line
            var oqual =
              // eslint-disable-next-line
              this.state.cities[i].population == this.state.population
                ? fpopulation.push(this.state.cities[i])
                : null;
        }
      }
      this.setState({ filteredCities: fpopulation });
      res();
    });
  };

  populationChange = event => {
    let setPopulation = () => {
      return new Promise((res, _rej) => {
        this.setState({ population: event.target.value });
        res();
      });
    };

    setPopulation().then(() => {
      this.filterPopulation();
    });
  };

  rbChange = async rb => {
    const setrb = () => {
      this.setState({ rbSelect: rb.target.value });
    };
    const rbpop = () => {
      this.filterPopulation();
    };
    await setrb();
    await rbpop();
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
  componentDidUpdate() {
    // this.populationChange();
  }

  render() {
    const { population, loading, cities, error, filteredCities } = this.state;
    return (
      <div className="population fx fxdc fxjcc fxaic">
        <Nav />
        <h2 className="title">Population Filter</h2>
        <div className="popdiv">
          <div className="popformdiv">
            <form>
              <input
                type="number"
                name="cityname"
                autoComplete="off"
                placeholder="Only Numerics Allowed - Type to Filter by Population Count"
                value={population}
                onChange={this.populationChange}
              />
              <div className="rbdiv tac">
                <h2>Select Option To Change Order</h2>
                <div className="fx fxdr fxjcc fxaic">
                  <label>
                    <input
                      type="radio"
                      name="poprb"
                      value="less"
                      checked={this.state.rbSelect === "less"}
                      onChange={this.rbChange}
                    />
                    Is Less Than
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="poprb"
                      value="equal"
                      checked={this.state.rbSelect === "equal"}
                      onChange={this.rbChange}
                    />
                    Is Equal To
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="poprb"
                      value="greater"
                      checked={this.state.rbSelect === "greater"}
                      onChange={this.rbChange}
                    />
                    Is Greater Than
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div>
            {error ? <h2 className="title2 tac">{error.message}</h2> : null}
            {filteredCities.length > 0 ? (
              <>
                <h2 className="title2">
                  Population Match Count For:
                  <label>
                    {" "}
                    {population} => ({filteredCities.length})
                  </label>
                </h2>
                <hr />
              </>
            ) : null}
            {!loading ? (
              population === "" ? (
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
                    No Population Match Found For :<label> {population}</label>
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

export default Population;
