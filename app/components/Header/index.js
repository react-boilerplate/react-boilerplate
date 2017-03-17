import React from 'react';
import LogoLink from '../LogoLink';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <LogoLink href="/#">
          NEVERPAYMORE.NET
        </LogoLink>
      </div>
    );
  }
}

export default Header;
