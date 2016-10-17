import React from 'react';

import A from 'components/A';
import Img from 'components/Img';
import Banner from './banner.jpg';
import styles from './styles.css';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <A className={styles.logoWrapper} href="https://twitter.com/mxstbr">
        <Img className={styles.logo} src={Banner} alt="react-boilerplate - Logo" />
      </A>
    );
  }
}

export default Header;
