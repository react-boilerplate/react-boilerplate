import React from 'react';

import { List, Segment } from 'semantic-ui-react';

function Footer() {
  return (
    <Segment
      textAlign="center"
      style={{ margin: '1em 0em 0em', padding: '1em 0em' }}
      vertical
      color="grey"
    >
      <List horizontal divided link size="mini">
        <List.Item as="a" href="#">
          Site Map
        </List.Item>
        <List.Item as="a" href="#">
          Contact Us
        </List.Item>
        <List.Item as="a" href="#">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="#">
          Privacy Policy
        </List.Item>
      </List>
    </Segment>
  );
}

export default Footer;
