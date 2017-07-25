import { createSelector } from 'reselect';

const selectBounty = (state) => state.getIn(['global', 'bounty']) || {};

const makeSelectMessageException = () => createSelector(
  selectBounty,
  (bountyState) => bountyState.get('exception')
);

const makeSelectMessageId = () => createSelector(
  selectBounty,
  (bountyState) => bountyState.get('message_id') || 'bounty.initial_message'
);

const makeSelectMessageStakes = () => createSelector(
  selectBounty,
  (bountyState) => bountyState.get('stakes')
);

export {
  selectBounty,
  makeSelectMessageException,
  makeSelectMessageId,
  makeSelectMessageStakes,
};
