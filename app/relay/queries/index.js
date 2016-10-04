import Relay from 'react-relay';

export const ViewerQueries = { viewer: () => Relay.QL`query { viewer }` };
