import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <ul className="nav">
        <li>
          <NavLink exact to="/">
          QuotesCrud
          </NavLink>
        </li>
        <li>
          <NavLink to="/dummy">404 Page</NavLink>
        </li>
      </ul>
    </>
  );
};

export default Nav;
