import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

import SOCILogo from 'images/SOCI_Logo.svg';
import Img from 'components/Img';

import { Menubar } from 'primereact/menubar';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      items: [
        {
          label: <FormattedMessage {...messages.home} />,
          icon: 'pi pi-fw pi-home',
          command: () => {
            this.props.history.push('/');
          },
        },
        {
          label: <FormattedMessage {...messages.features} />,
          command: () => {
            this.props.history.push('features');
          },
        },
      ],
    };

    this.state.menu = {
      fontFamily: 'Heavitas',
      fontStyle: 'normal',
    };
  }

  render() {
    return (
      <section>
        <Menubar
          style={this.state.menu}
          className=".ui-menubar-custom"
          model={this.state.items}
        >
          <Img
            style={{ height: '43px', width: '43px' }}
            src={SOCILogo}
            alt="SOCI Logo"
          />
        </Menubar>
      </section>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Header);
