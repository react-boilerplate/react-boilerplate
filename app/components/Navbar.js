import React from 'react';
import Button from './Button';
import Navcontainer from './Navcontainer';

const Navbar = () => (
  <Navcontainer>
    <Button menu>Add item</Button>
    <Button menu>Explore</Button>
  </Navcontainer>
);

export default Navbar;
