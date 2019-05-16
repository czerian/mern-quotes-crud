import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <ul className="nav">
        <li>
          <NavLink exact to="/">
            CitiesCrud
          </NavLink>
        </li>
        <li>
          <NavLink to="/cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="/quotes_crud">QuotesCrud</NavLink>
        </li>
        <li>
          <NavLink to="/population">Filter By Population</NavLink>
        </li>
        <li>
          <NavLink to="/city_name">Filter By City Name</NavLink>
        </li>
        <li>
          <NavLink to="/jonkri">jonkri.se</NavLink>
        </li>
        <li>
          <NavLink to="/dummy">Link to 404 Page</NavLink>
        </li>
      </ul>
    </>
  );
};

export default Nav;
