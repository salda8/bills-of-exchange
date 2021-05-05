import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { Routes } from "../../routes";

export const Header: React.FunctionComponent = () => {
  const Nav = (): JSX.Element => (
    <nav className="c-nav">
      <ul>
        <li>
          <NavLink to={Routes.BASE}>'HOME'</NavLink>
        </li>
      </ul>
    </nav>
  );

  return (
    <header className="c-header">
      <div className="o-shell o-shell--flex">
        <Link to={Routes.BASE} className="c-logo"></Link>

        <Nav />
      </div>
    </header>
  );
};

export default Header;
