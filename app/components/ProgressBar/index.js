/**
*
* ProgressBar
*
*/

import React, { PropTypes } from 'react';

import styles from './styles.css';

class ProgressBar extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static defaultProps = {
    percent: -1,
    autoIncrement: true,
    intervalTime: 200,
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
      clearInterval(this.interval);
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.handleProps(nextProps);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  increment() {
    let { percent } = this.state;
    percent += ((Math.random() + 1) - Math.random());
    percent = percent < 99 ? percent : 99;
    this.setState({
      percent,
    });
  }

  handleProps(props) {
    if (props.autoIncrement && props.percent >= 0 && props.percent < 99) {
      this.interval = setInterval(this.increment, props.intervalTime);
    }

    if (props.percent >= 100) {
      this.setState({
        percent: 99.9,
      }, () => {
        this.timeout = setTimeout(() => {
          this.setState({
            percent: -1,
          });
        }, 400);
      });
    } else {
      this.setState({
        percent: props.percent,
      });
    }
  }

  render() {
    const { percent } = this.state;
    const className = `${styles.reactProgressBar} ${percent < 0 || percent >= 100 ? `${styles.reactProgressBarHide}` : ''}`;
    const style = { width: `${(percent <= 0 ? 100 : percent)}%` };
    return (
      <div className={className}>
        <div className={styles.reactProgressBarPercent} style={style}></div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
};

export default ProgressBar;
