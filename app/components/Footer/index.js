import React from 'react';

import A from 'components/A';
import styles from './styles.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <p>This project is licensed under the MIT license.</p>
      </section>
      <section>
        <p>Made with love by <A href="https://twitter.com/mxstbr">Max Stoiber</A>.</p>
      </section>
    </footer>
  );
}

export default Footer;
