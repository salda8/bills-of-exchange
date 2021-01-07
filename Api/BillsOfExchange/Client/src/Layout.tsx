import React, { Fragment } from 'react';
import { Footer, Navbar } from './components';

const Layout: React.FC = ({ children }) => (
  <Fragment>
    <Navbar />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;