import React from 'react';
import Relay from 'react-relay';
import Track from 'containers/Track';

class MediaPlayer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    viewer: React.PropTypes.object,
  };

  render() {
    return (
      <div>
        {this.props.viewer.allTracks.edges.reverse().map(({ node }) =>
          <Track key={node.id} track={node} viewer={this.props.viewer} />
        )}
      </div>
    );
  }
}

export default Relay.createContainer(MediaPlayer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allTracks(first: 1000000) {
          edges {
            node {
              id
              ${Track.getFragment('track')}
            }
          }
        }
      }
    `,
  },
});
