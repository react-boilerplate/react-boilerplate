import React from 'react';
import { FormattedMessage } from 'react-intl';

import { routerData } from 'config/router';
import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>
        <A href="https://twitter.com/mxstbr">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
        <NavBar>
          {routerData
            .filter(router => router.showInNav)
            .map(({ path, messageKey }) => (
              <HeaderLink to={path} key={path}>
                <FormattedMessage {...messages[messageKey]} />
              </HeaderLink>
            ))}
        </NavBar>
      </div>
    );
  }
}

export default Header;
