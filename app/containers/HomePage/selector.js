import { createSelector } from 'reselect';

export const homePageSelector = createSelector((state) => {
  return {
    projectName: state.get('projectName'),
    ownerName: state.get('ownerName')
  };
});
