import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import 'jest-styled-components';

import HeaderLink from '../HeaderLink';

describe('<HeaderLink />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <MemoryRouter>
          <HeaderLink to="/" />
        </MemoryRouter>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const renderedComponent = mount(
      <MemoryRouter>
        <HeaderLink to="/" />
      </MemoryRouter>,
    );
    expect(renderedComponent.find('a').prop('className')).toBeDefined();
  });

  it('should have an href attribute', () => {
    const to = '/repositories/';
    const renderedComponent = mount(
      <MemoryRouter>
        <HeaderLink to={to} />
      </MemoryRouter>,
    );
    expect(renderedComponent.find('a').prop('href')).toEqual(to);
  });

  it('should adopt any attribute (behavior of Link from react-router-dom)', () => {
    const id = 'test';
    const attribute = 'test2';
    const renderedComponent = mount(
      <MemoryRouter>
        <HeaderLink to="/" attribute={attribute} id={id} />
      </MemoryRouter>,
    );
    expect(renderedComponent.find('a').prop('id')).toEqual(id);
    expect(renderedComponent.find('a').prop('attribute')).toEqual(attribute);
  });
});
