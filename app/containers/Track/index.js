import React from 'react';
import Relay from 'react-relay';
import ReactPlayer from 'react-player';
import H2 from 'components/H2';
import styles from './styles.css';

class Track extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    track: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      title,
      url,
    } = this.props.track;

    return (
      <section className={styles.Wrapper}>
        <H2>{title}</H2>
        <ReactPlayer
          className={styles.Player}
          url={url}
          controls
        />
      </section>
    );
  }
}

export default Relay.createContainer(Track, {
  fragments: {
    track: () => Relay.QL`fragment on Track {
      title
      url
    }`,
  },
});
