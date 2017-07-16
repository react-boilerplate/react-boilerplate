/**
 *
 * ProgressBar
 *
*/

import React, { PropTypes } from 'react';
import Wrapper from './Wrapper';
import Percent from './Percent';

class ProgressBar extends React.Component {

  static defaultProps = {
    percent: -1,
    autoIncrement: true,
    intervalTime: 75,
  };

  constructor(props) {
    super(props);
    this.handleProps = this.handleProps.bind(this);
    this.increment = this.increment.bind(this);
    this.state = {
      percent: props.percent,
    };
  }

  componentDidMount() {
    this.handleProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.interval) {
      // stop progress when new props come in.
      clearInterval(this.interval);
      this.interval = undefined;
    }
    if (this.timeout) {
      // clear timeout when new props come in.
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    // start progress with updated props.
    this.handleProps(nextProps);
  }

  componentWillUnmount() {
    // cleaning up interval and timeout.
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  increment() {
    /**
     * Increment the percent randomly.
     * Only used when autoIncrement is set to true.
    */
    let { percent } = this.state;
    percent += ((Math.random() + 1) - Math.random());
    percent = percent < 99 ? percent : 99;
    this.setState({
      percent,
    });
  }

  handleProps(props) {
    /**
     * Increment progress bar if auto increment is set to true
     * and progress percent is less than 99.
    */
    if (props.autoIncrement && props.percent >= 0 && props.percent < 99) {
      this.interval = setInterval(this.increment, props.intervalTime);
    }

    /**
     * Reset the progress bar when percent hits 100
     * For better visual effects, percent is set to 99.9
     * and then cleared in the callback after some time.
    */

    if (props.percent >= 100) {
      this.setState({
        percent: 99.9,
      }, () => {
        this.timeout = setTimeout(() => {
          this.setState({
            percent: -1,
          }, () => props.updateProgress(-1));
        }, 300);
      });
    } else {
      this.setState({
        percent: props.percent,
      });
    }
  }

  render() {
    const { percent } = this.state;

    // Hide progress bar if percent is less than 0.
    const isHidden = percent < 0 || percent >= 100;

    // Set `state.percent` as width.
    const style = { width: `${(percent <= 0 ? 0 : percent)}%` };

    return (
      <Wrapper hidden={isHidden}>
        <Percent style={style} />
      </Wrapper>
    );
  }
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
};

export default ProgressBar;
