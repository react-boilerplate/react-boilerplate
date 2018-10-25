import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <A
          href="https://www.newcastle.edu.au/about-uon/governance-and-leadership/faculties-and-schools/faculty-of-education-and-arts/school-of-creative-industries/about-us"
          target="blank"
        >
          <FormattedMessage
            {...messages.sociMessage}
            values={{
              year: 2018,
            }}
          />
        </A>
      </section>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <A href="https://www.newcastle.edu.au/" target="blank">
          <FormattedMessage {...messages.uonMessage} />
        </A>
      </section>
    </Wrapper>
  );
}

export default Footer;
