/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Img from 'Img';
import Footer from 'Footer';
import Banner from './banner-metal.jpg';
import A from 'A';

import styles from './styles.css';

function App(props) {
  return (
    <div className={ styles.wrapper }>
      <A
        className={ styles.logoWrapper }
        href="https://twitter.com/mxstbr"
      >
        <Img
          className={ styles.logo }
          src={ Banner }
          alt="react-boilerplate - Logo"
        />
      </A>
      { props.children }
      <Footer />
    </div>
  );
}

export default App;
