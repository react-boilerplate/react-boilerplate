import React from 'react';
import { render } from 'react-testing-library';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import IssueIcon from '../IssueIcon';

describe('<IssueIcon />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<IssueIcon />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const { container } = render(<IssueIcon />);
    expect(container.firstChild.hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<IssueIcon id={id} />);
    expect(container.firstChild.hasAttribute('id')).toBe(true);
    expect(container.firstChild.id).toEqual(id);
  });

  it('should adopt any attribute', () => {
    const { container } = render(<IssueIcon attribute="test" />);
    expect(container.firstChild.hasAttribute('attribute')).toBe(true);
  });
});
