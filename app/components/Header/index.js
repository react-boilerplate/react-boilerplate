import React from 'react';

import A from './A';
import Img from './Img';
import Banner from './banner.jpg';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <A href="https://twitter.com/mxstbr">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
    );
  }
}

export default Header;
