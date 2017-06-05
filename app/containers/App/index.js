/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import LocaleToggle from 'containers/LocaleToggle';

import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import FooterCopyright from 'components/FooterCopyright';


const AppWrapper = styled.div`
  min-width:100%;
  max-width:100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 0px;
  flex-direction: column;
`;

export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - NeverPayMore.net"
        defaultTitle="NeverPayMore.net Find the price you want."
        meta={[
          { name: 'description', content: 'Tools to find the best price for products ranging from electronics to clothing. Saving money starts here.' },
        ]}
      />
      <Header />
      {React.Children.toArray(props.children)}
      <Footer />
      <FooterCopyright>&copy; 2017 NeverPayMore.Net<LocaleToggle /></FooterCopyright>
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
