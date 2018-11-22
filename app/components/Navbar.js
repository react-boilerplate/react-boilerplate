import React from 'react';
import Button from './Button';

const Navbar = () => (
  <div>
    <ul>
      <li>
        <Button menu>Add item</Button>
      </li>
      <li>
        <Button menu>Explore</Button>
      </li>
    </ul>
  </div>
);

export default Navbar;
