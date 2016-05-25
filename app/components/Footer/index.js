import React from 'react';

import A from 'components/A';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <p>
          <FormattedMessage
            id="boilerplate.components.Footer.license.message"
            defaultMessage={`
              This project is licensed under the MIT license.
            `}
          />
        </p>
      </section>
      <section>
        <p>
          <FormattedMessage
            id="boilerplate.components.Footer.author.message"
            defaultMessage={`
              Made with love by {author}.
            `}
            values={{
              author: <A href="https://twitter.com/mxstbr">Max Stoiber</A>,
            }}
          />
        </p>
      </section>
    </footer>
  );
}

export default Footer;
