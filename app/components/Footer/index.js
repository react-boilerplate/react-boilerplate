import React from 'react';

import messages from './messages';
import A from 'components/A';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <p>
          <FormattedMessage {...messages.licenseMessage} />
        </p>
      </section>
      <section>
        <p>
          <FormattedMessage
            {...messages.authorMessage}
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
