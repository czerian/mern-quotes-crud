import React, { Component } from 'react';
import { Images } from '../theme'
import { Nav } from './'

class InitialFetch extends Component {
  constructor(props) {
      super(props);
        this.state = {
          cities: [],
          loading: true,
          title: null,
          error: null
        }
  }

  getCities() {
    const url = `http://cities.jonkri.se/`
    setTimeout(() => {    
        fetch(url)
          .then(response => response.json())
          .then(resData =>
            this.setState({
              cities: resData,
              loading: false,
              title: <h2>Fetch API JSON response from http://cities.jonkri.se/</h2>,
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
            <div> 
                {error ? <p className="title2 tac">{error.message}</p> : null}
                {title ? title : null}
                {!loading ? (                                
                  cities.map(city => {
                    const { id, name, population } = city;

                    return (
                      <div key={id}>
                        <p><label>City Name:</label>{name}</p>
                        <p><label>Population:</label> {population}</p>
                        <p><label>ID:</label> {id}</p>
                        <hr />
                      </div>
                    );
                  })
                ) : (
                  <div className="loading tac">
                        {/* <img src={Images.loading3} alt="loading" /> */}
                        <img src={Images.loading1} alt="loading" />
                        <h3>LOADING...</h3>
                        <h3>Fetch query to http://cities.jonkri.se/ with a 3 seconds setTimeout delay to simulate the query process.</h3>
                    </div>
                )}
            </div>
            <Nav/>
        </div> 
    );
  }
}

export default InitialFetch;
