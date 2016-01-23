import React from 'react';

import Anchor from 'Anchor';
import styles from './styles.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className={ styles.footer }>
        <section>
          <p>This project is licensed under the MIT license.</p>
        </section>
        <section>
          <p>Made with love by <Anchor href="https://twitter.com/mxstbr">Max Stoiber</Anchor>.</p>
        </section>
      </footer>
    );
  }
}

export default Footer;
