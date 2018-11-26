import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import Navcontainer from '../UI/Wrapper';
import Logo from './Logo';

const Navbar = () => (
  <Navcontainer>
    <Link to="/">
      <Logo>Dovenmuehle</Logo>
    </Link>
    <Link to="/">
      <Button menu>Add Item</Button>
    </Link>
    <Link to="/all-items">
      <Button menu>Display Items</Button>
    </Link>
  </Navcontainer>
);

export default Navbar;
