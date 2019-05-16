import React, { Component } from "react";
import { Nav } from ".";
import { Images } from "../theme";
import axios from "axios";

class CitiesCrud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      loading: true,
      title: null,
      error: null,
      id: "",
      name: "",
      population: "",
      country: "",
    };
  }

  getCities() {
    const url = `/api/cities`;
    // setTimeout(() => {
    fetch(url)
      .then(response => response.json())
      .then(resData =>
        this.setState({
          cities: resData,
          loading: false,
          title: <h2 className="tac">Fetch API JSON response from /api/cities</h2>,
        })
      )
      .catch(error => this.setState({ error, loading: false }));
    // }, 1000);
  }

  componentDidMount() {
    this.getCities();
  }

  ifChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // const iftn = e.target.name;
    // console.log(iftn, this.state.iftn);
  };

  addSubmit = e => {
    e.preventDefault();
    axios
      .post("/api/cities", {
        name: this.state.name,
        population: this.state.population,
        country: this.state.country,
      })
      .then(res => {
        console.log(res);
        this.setState({ loading: true, name: "", population: "", country: "" });
      })
      .catch(err => {
        console.log(err);
      })
      .then(res => {
        this.getCities();
      });
  };

  deleteSubmit = e => {
    e.preventDefault();
    axios
      .delete(`/api/cities/id/${this.state.id}`, {
        data: {
          id: this.state.id,
        },
      })
      .then(res => {
        console.log(res);
        this.setState({ loading: true, id: "" });
      })
      .catch(err => {
        console.log(err);
      })
      .then(res => {
        this.getCities();
      });
  };

  updateSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/cities/update`, {
        id: this.state.id,
        update: {
          name: this.state.name,
          population: this.state.population,
          country: this.state.country,
        },
      })
      .then(res => {
        console.log(res);
        this.setState({ loading: true, name: "", population: "", country: "" });
      })
      .catch(err => {
        console.log(err);
      })
      .then(res => {
        this.getCities();
      });
  };

  render() {
    const { loading, cities, title, error, id, name, population, country } = this.state;
    return (
      <div className="home fx fxdr fxjcc fxaic">
        <div className="w50">
          <div className="landing fx fxdc fxjcc fxaic">
            <Nav />
            <h1>Cities CRUD</h1>

            <div className="crud">
              <h2>Create/Add New City</h2>
              <form onSubmit={this.addSubmit}>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  placeholder="City Name"
                  value={name}
                  onChange={this.ifChange}
                />
                <input
                  type="number"
                  name="population"
                  autoComplete="off"
                  placeholder="Population Count"
                  value={population}
                  onChange={this.ifChange}
                />
                <input
                  type="text"
                  name="country"
                  autoComplete="off"
                  placeholder="Country Name"
                  value={country}
                  onChange={this.ifChange}
                />
                <input type="submit" value="Create" />
              </form>
            </div>

            <div className="crud">
              <h2>Delete/Remove City from MongoDB</h2>
              <form onSubmit={this.deleteSubmit}>
                <input
                  type="text"
                  name="id"
                  autoComplete="off"
                  placeholder="City ID to Delete"
                  value={id}
                  onChange={this.ifChange}
                />
                <input type="submit" value="Delete" />
              </form>
            </div>

            <div className="crud">
              <h2>Update Existing City Record</h2>
              <form onSubmit={this.updateSubmit}>
                <div>
                  <input
                    type="text"
                    name="id"
                    autoComplete="off"
                    placeholder="City ID to Update"
                    value={id}
                    onChange={this.ifChange}
                  />
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder="Updated City Name"
                    value={name}
                    onChange={this.ifChange}
                  />
                </div>
                <div className="pdtb10">
                  <input
                    type="number"
                    name="population"
                    autoComplete="off"
                    placeholder="Updated Population Count"
                    value={population}
                    onChange={this.ifChange}
                  />
                  <input
                    type="text"
                    name="country"
                    autoComplete="off"
                    placeholder="Updated Country Name"
                    value={country}
                    onChange={this.ifChange}
                  />
                </div>
                <input type="submit" value="Update" />
              </form>
            </div>
          </div>
        </div>
        <div className="w50">
          <div className="initialfetch fx fxdc fxjcc fxaic">
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
                        <label>Population: </label>
                        {population}
                      </p>
                      <p>
                        <label>Country: </label>
                        {country}
                      </p>
                      <p>
                        <label>ID: </label>
                        {_id}
                      </p>
                      <p>
                        <label>Date Added: </label>
                        {date}
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
                    Fetch query to /api/cities with a 1 seconds setTimeout delay to simulate the
                    query process.
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CitiesCrud;
