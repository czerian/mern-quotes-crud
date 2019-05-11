import React from 'react';
import { Link } from "react-router-dom";
import { Nav } from './'

const NotFound = () => {
    return (
        <div className="notfound fx fxdc fxjcc fxaic">
              <h1>404</h1>
              <h2>Looks like you're lost.</h2>
              <h3>All 404 Errors => i.e Not Found, Redirect Here</h3>           
              <h4>Go <Link to='/react-spa/'>Home</Link></h4>
              <Nav/>
        </div>
    );
}

export default NotFound;
