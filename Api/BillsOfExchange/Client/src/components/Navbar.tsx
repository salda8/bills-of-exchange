import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutesConfig, Route } from '../config/routes.config';



const Navbar: React.FC = () => {
  const navRoutes: Route[] = Object.keys(RoutesConfig).reduce((acc, key) => {
    const route = RoutesConfig[key];
    route.showInNav && acc.push(route);
    return acc;
  }, [] as Route[]);

  return (
    <nav role='navigation' className='navbar' aria-label='main navigation'>
      <div className='navbar-wrapper'>
        <div className='navbar-routes'>
          {navRoutes.map(({ path, exact, displayName }) => (
              <NavLink
                to={path}
                key={path}
                exact={exact}
                className='navbar-item'
                activeClassName='is-active'
              >
                {displayName}
              </NavLink>
            ))}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
