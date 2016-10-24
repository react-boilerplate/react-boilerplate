import { createSelector } from 'reselect';
import {
  GIVEN_NAME,
  PICTURE,
} from './reducer';

const selectViewer = () => (state) => state.get('viewer');

export const selectGivenName = () => createSelector(
  selectViewer(),
  (viewer) => viewer.get(GIVEN_NAME),
);

export const selectPicture = () => createSelector(
  selectViewer(),
  (viewer) => viewer.get(PICTURE),
);
