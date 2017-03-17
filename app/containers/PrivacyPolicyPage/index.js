/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';


export default class FeaturePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet
          title="Privacy Policy"
          meta={[
            { name: 'description', content: 'Never Pay More' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>


        <H1>Privacy policy</H1>
        We value our privacy and assume you value yours. Our Privacy Policy makes this point in painstaking detail, but the gist of it is that we take the safeguarding of your personal information very seriously.

        Our website is secure. We obfuscate the links in your showcases to protect you against affiliate ID hijacking.
        (Remember that you can always do a cookie test to verify that your affiliate ID is linked to your shops products.)

        NeverPayMore.Net respects your privacy
        NeverPayMore.Net respects your privacy and are committed to protecting it. We do not sell your personal information to any third parties. NeverPayMore.Net provides this Privacy Statement to inform you of our Privacy Policy and practices and of the choices you can make about the way your information is collected online and how that information is used. We haveve structured our websites so that, in general, you can visit NeverPayMore.Net on the Web without identifying yourself or revealing any personal information. However, certain users may choose to provide personally identifiable information in registering for our services.

        We make this notice readily available at the bottom of every NeverPayMore.Net Web page.

        <H1>Section 1. Cookies</H1>
        A Cookie is a small data file transferred by a website to your computers hard drive. NeverPayMore.Net sends cookies when you surf our site, make purchases, request or personalize information, or register yourself for certain services. Accepting the cookies used on our site does not give us access to your personally identifiable information, but we may use the cookies to identify your computer. However, once you choose to furnish the site with personally identifiable information, this information may be linked to the data stored in the cookie. We use cookies to understand site usage and to improve the content and offerings on NeverPayMore.nets sites.

        Cookies are typically classified as either session cookies or permanent cookies.

        Session cookies do not stay on your computer after you leave our website or close your browser. The aggregate information collected permits us to analyze traffic patterns on our site. This can enable us over time to provide a better experience on our site by improving content or personalization and making our site easier to use.
        Permanent cookies are those that remain on your computer. They are used to facilitate shopping, personalization and registration services. For example, cookies can keep track of what you have selected to purchase as you continue to shop and allow you to enter your password only once on Web pages where a login is required. Permanent cookies can be manually removed by the user.
        Most browsers automatically accept cookies by default, but you can usually refuse cookies or selectively accept certain cookies by adjusting the preferences in your browser. If you turn off cookies, there may be some features of our site that will not be available to you and some Web pages may not display properly. You can find information on popular browsers and how to adjust your cookie preferences at the following websites:

        Microsoft Internet Explorer: http://www.microsoft.com/info/cookies.htm
        Mozilla FireFox: http://www.mozilla.org/projects/security/pki/psm/help_21/using_priv_help.html
        Netscape Navigator: http://browser.netscape.com/ns8/security/basics_cookies.jsp
        Section 2. Sites covered by this Privacy Statement
        This Privacy Statement applies to all NeverPayMore.Net-owned websites and domains, and our wholly owned subsidiaries (NeverPayMore.Net websites).

        <H1>Section 3. Links to non-NeverPayMore.Net websites</H1>
        The NeverPayMore.Net websites may provide links to third-party websites for your convenience and information. If you access those links, you will leave the NeverPayMore.Net website. NeverPayMore.Net does not control those sites or their privacy practices, which may differ from those of NeverPyayMore.Net PopShopss. We do not endorse or make any representations about third-party websites. The personal data you choose to give to unrelated third parties is not covered by the PopShops Privacy Statement. We encourage you to review the privacy pole your information with

        <H1>Section 4. Information sharing</H1>
        NeverPayMore.Net respects your privacy and are committed to protecting it. We do not sell your personally identifiable information to any third parties. However, because NeverPayMore.Net is supported by third party vendors, NeverPayMore.net does share personally identifiable information with companies and contractors working on our behalf, but only to the extent necessary to support our services. Contractors and service providers are required to keep confidential the information received on behalf of PopShops and may not use it for any purpose other than to carry out the services they are performing for PopShops. These service providers may change or we may contract with additional service providers to better accommodate our customers. PopShops or its related entities could merge with or be acquired by another business entity or some or all of their respective assets could be acquired, including some or all of your personally identifiable information, subject to the privacy terms of this policy.

        NeverPayMore.Net will not share your personally identifiable information with any other third parties who are not described in this privacy policy without your permission, unless required by law enforcement action, subpoena, or local law.

        <H1>Section 5. Your choices</H1>
        NeverPayMore.Net will deliver a variety of information that complements our products and services. NeverPayMore.Net-wide communications may include new service information, and additional service provided on behalf of Popshops or by Merchant request.. Out of respect for the privacy of our users we present the option to not receive these types of communications. To be removed from our list, email us at privacy@popshops.com.

        <H1>Section 6. Access to and accuracy of your information</H1>
        v strives to keep your personally identifiable information accurate. We will provide you with access to your information, including making reasonable effort to provide you with online access and the opportunity to change your information. To protect your privacy and security, we will also take reasonable steps to verify your identity, such as a password and user ID, before granting access to your data. Certain areas of NeverPayMore.net websites may limit access to specific individuals through the use of passwords and other personal identifiers.

        The most effective way to view and change your personally identifiable information is to visit your Your Account page. To access, login to your account and click on the Your Account link on the upper right-hand corner.

              <H1>Section 7. Keeping your information secure</H1>
        NeverPayMore.Net is committed to protecting the information you provide us. To prevent unauthorized access or disclosure, to maintain data accuracy, and to ensure the appropriate use of the information, PopShops has in place appropriate physical and managerial procedures to safeguard the information we collect.

        We use Secure Sockets Layer (SSL) encryption when collecting or transferring sensitive data such as credit card information. SSL encryption is designed to make the information unreadable by anyone but us. This security measure is working when you see either the symbol of an unbroken key or closed lock (depending on your browser) on the bottom of your browser window.

        <H1>Section 8. Changes to this Statement</H1>
        If there are updates to the terms of Online Privacy Statement for NeverPayMore.Net , we will post those changes and update the revision date in this document, so you will always know what information we collect online, how we use it, and what choices you have.

        <H1>Section 9. Contacting us</H1>
        We value your opinions. If you have comments or questions about our privacy policy, please send them to privacy@popshops.com or write to us at the following address:
      </div>
    );
  }
}
