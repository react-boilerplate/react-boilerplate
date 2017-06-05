import React from 'react';
import { FormattedMessage } from 'react-intl';

import Wrapper from './Wrapper';
import messages from './messages';
import FooterTitle from './footerTitle';
import FooterLink from './footerLink';

function Footer() {
  return (
    <Wrapper>
      <section className="col-md-3 col-sm-3">
        <FooterTitle> <FormattedMessage {...messages.section1Title} /></FooterTitle>
        <FooterLink href="https://couponcactus.com">Coupon Cactus </FooterLink> <br />
        <FooterLink href="https://ebates.com">Ebates</FooterLink><br />
        <FooterLink href="https://MrRebates.com">Mr. Rebates</FooterLink><br />
        <FooterLink href="https://cashbackmonitor.com">Cashback Monitor</FooterLink><br />
      </section>
      <section>
        <FooterTitle><FormattedMessage {...messages.section2Title} /></FooterTitle>
        <FooterLink href="https://couponcactus.com">Coupon Cactus</FooterLink><br />
        <FooterLink href="https://ebates.com">Ebates</FooterLink><br />
        <FooterLink href="https://MrRebates.com">Mr. Rebates</FooterLink><br />
        <FooterLink href="https://cashbackmonitor.com">Cashback Monitor</FooterLink><br />
      </section>
      <section>
        <FooterTitle><FormattedMessage {...messages.section3Title} /></FooterTitle>
        <FooterLink href="https://couponcactus.com">Coupon Cactus</FooterLink><br />
        <FooterLink href="https://ebates.com">Ebates</FooterLink><br />
        <FooterLink href="https://MrRebates.com">Mr. Rebates</FooterLink><br />
        <FooterLink href="https://cashbackmonitor.com">Cashback Monitor</FooterLink><br />
      </section>
      <section>
        <FooterTitle><FormattedMessage {...messages.section4Title} /></FooterTitle>
        <FooterLink href="/mission"> <FormattedMessage {...messages.ourMission} /></FooterLink><br />
        <FooterLink href="/contact"> <FormattedMessage {...messages.contactUs} /></FooterLink><br />
        <FooterLink href="/privacy"> <FormattedMessage {...messages.privacyPolicy} /></FooterLink><br />
      </section>
    </Wrapper>
  );
}

export default Footer;
