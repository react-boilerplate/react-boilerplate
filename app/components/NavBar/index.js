import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import Navcontainer from '../UI/Wrapper';
import Logo from './Logo';

const Navbar = () => (
  <Navcontainer>
    <Logo>
      <Link to="/">Dovenmuehle</Link>
    </Logo>
    <Button menu>
      <Link to="/add-item">Add Item</Link>
    </Button>
    <Button menu>
      <Link to="/all-items">All Items</Link>
    </Button>
  </Navcontainer>
);

export default Navbar;
