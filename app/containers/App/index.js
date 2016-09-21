/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import ProgressBar from 'components/ProgressBar';
import Img from 'components/Img';
import Footer from 'components/Footer';
import Banner from './banner-metal.jpg';
import A from 'components/A';

import styles from './styles.css';

export class App extends React.Component {

  state = {
    progress: -1,
  };

  componentDidMount() {
    this.props.router.listen(() => this.setState({ progress: 0 }));
  }

  componentDidUpdate() {
    if (this.state.progress !== 100) {
      this.setState({ // eslint-disable-line
        progress: 100,
      });
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application' },
          ]}
        />
        <ProgressBar percent={this.state.progress} />
        <A className={styles.logoWrapper} href="https://twitter.com/mxstbr">
          <Img className={styles.logo} src={Banner} alt="react-boilerplate - Logo" />
        </A>
        {React.Children.toArray(this.props.children)}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  router: React.PropTypes.object.isRequired,
};

export default withRouter(App);
