import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import SideBarStyle from './SideBarStyle';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

import { slide as Menu } from 'react-burger-menu'

class Sidebar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  showSettings (event) {
    event.preventDefault(); 
  }
  render () {
    var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}


console.log('nameOfAnimation',Menu)
    return (
      <Menu  styles={ styles }>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
      </Menu>
    );
}
}

export default Sidebar;