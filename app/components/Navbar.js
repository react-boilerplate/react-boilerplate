import React from 'react';
import Button from './Button';
import Navcontainer from './Navcontainer';
import Logo from './Logo';

const Navbar = () => (
  <Navcontainer>
    <Logo>Dovenmuehle</Logo>
    <Button menu>Add item</Button>
    <Button menu>Explore</Button>
  </Navcontainer>
);

export default Navbar;
