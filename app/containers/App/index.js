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

import Header from 'components/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import withProgressBar from 'components/ProgressBar';

const AppWrapper = styled.div`
  margin: 0 auto;
  width:100%;
  display: block;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;
const RightSide = styled.div` 
`;
export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
        meta={[
          { name: 'description', content: 'A React.js Boilerplate application' },
        ]}
      />
      <Sidebar></Sidebar>
      <RightSide>
      <Header />
      {React.Children.toArray(props.children)}
      <Footer />
      </RightSide>
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
