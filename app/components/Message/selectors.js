import { createSelector } from 'reselect';

const selectBounty = (state) => {
  const result = state.getIn(['global', 'bounty']) || {};
  // console.log('SelectBounty:', result);
  return result;
};

const makeSelectMessageException = () => createSelector(
  selectBounty,
  (bountyState) => {
    console.log('makeSelectMessageException.bountyState', bountyState);
    const result = bountyState.get('exception');
    console.log('makeSelectMessageException:', result);
    return result;
  } // || null
);

const makeSelectMessageId = () => createSelector(
  selectBounty,
  (bountyState) => {
    console.log('makeSelectMessageId.bountyState', bountyState);
    const result = bountyState.get('message_id') || 'bounty.initial_message';
    console.log('makeSelectMessageId:', result);
    return result;
  }
);

const makeSelectMessageStakes = () => createSelector(
  selectBounty,
  (bountyState) => {
    console.log('makeSelectMessageStakes.bountyState', bountyState);
    const result = bountyState.get('stakes');
    console.log('makeSelectMessageStakes:', result);
    return result;
  }
);

export {
  selectBounty,
  makeSelectMessageException,
  makeSelectMessageId,
  makeSelectMessageStakes,
};
