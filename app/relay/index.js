import Relay from 'react-relay';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(process.env.GRAPHQL_ENDPOINT)
);

export default Relay;
