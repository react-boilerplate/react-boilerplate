import React from 'react';
import { render } from 'react-testing-library';
import NotFoundPage from '../index';

describe('<NotFoundPage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <NotFoundPage />
    );
    expect(firstChild).toMatchSnapshot();
  });
});
