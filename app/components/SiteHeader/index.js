/**
 *
 * SiteHeader
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import Img from 'components/Img';
import LocaleToggle from 'containers/LocaleToggle';

/* eslint-disable react/prefer-stateless-function */
export default class SiteHeader extends React.Component {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  constructor(props) {
    super(props);
    this.state = { activeItem: '' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  trigger = (
    <span>
      <Icon name="user" /> Hello, Bob
    </span>
  );

  options = [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>Bob Smith</strong>
        </span>
      ),
      disabled: true,
    },
    { key: 'profile', text: 'Your Profile' },
    { key: 'stars', text: 'Your Stars' },
    { key: 'explore', text: 'Explore' },
    { key: 'integrations', text: 'Integrations' },
    { key: 'help', text: 'Help' },
    { key: 'settings', text: 'Settings' },
    { key: 'sign-out', text: 'Sign Out' },
  ];

  render() {
    return (
      <Menu fixed="top" stackable>
        <Link to="/">
          <Menu.Item>
            <Img
              src="/favicon.ico"
              style={{ marginRight: '1em' }}
              alt="manin"
            />
            Manin
          </Menu.Item>
        </Link>

        <Dropdown text="Manufacturer" className="link item">
          <Dropdown.Menu>
            <Link to="/manufacturer/create">
              <Dropdown.Item
                name="mfCreate"
                active={this.state.activeItem === 'mfCreate'}
                onClick={this.handleItemClick}
              >
                Create
              </Dropdown.Item>
            </Link>
            <Link to="/manufacturer/view">
              <Dropdown.Item
                name="mfView"
                active={this.state.activeItem === 'mfView'}
                onClick={this.handleItemClick}
              >
                View All
              </Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item
          name="features"
          active={this.state.activeItem === 'features'}
          onClick={this.handleItemClick}
        >
          Features
        </Menu.Item>

        <Menu.Item
          name="testimonials"
          active={this.state.activeItem === 'testimonials'}
          onClick={this.handleItemClick}
        >
          Testimonials
        </Menu.Item>

        <Menu.Item
          name="sign-in"
          active={this.state.activeItem === 'sign-in'}
          onClick={this.handleItemClick}
        >
          Sign-in
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <LocaleToggle />
          </Menu.Item>
          <Menu.Item>
            <Dropdown trigger={this.trigger} options={this.options} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
