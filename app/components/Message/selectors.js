import { createSelector } from 'reselect';

const selectBounty = (state) => state.getIn(['global', 'bounty']);

const makeSelectMessageException = () => createSelector(
  selectBounty,
  (bountyState) => bountyState.get('exception') || null
);

const makeSelectMessageId = () => createSelector(
  selectBounty,
  (bountyState) => bountyState.get('message_id') || 'bounty.HomePage.initial_message'
);

const makeSelectMessageStakes = () => createSelector(
  selectBounty,
  (bountyState) => bountyState.get('stakes') || null
);

export {
  makeSelectMessageException,
  makeSelectMessageId,
  makeSelectMessageStakes,
};
