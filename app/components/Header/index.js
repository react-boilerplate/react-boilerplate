import React from 'react';

import NavBar from './NavBar';
import NavBar2 from './NavBar2';
import HeaderLink from './HeaderLink';

function Header() {
  return (
    <div>
      <NavBar2 />
      <NavBar>
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/addstring">Add New String</HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
