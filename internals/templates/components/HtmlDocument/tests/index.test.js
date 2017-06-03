import { shallow } from 'enzyme';
import React from 'react';

import HtmlDocument from '../index';

describe('<HtmlDocument />', () => {
  it('should render a valid html document', () => {
    const head = {
      htmlAttributes: { toComponent: () => null },
      title: { toComponent: () => null },
      meta: { toComponent: () => null },
      link: { toComponent: () => null },
    };
    const css = [
      <style type="text/css">
        {
          'body { color: red }'
        }
      </style>,
    ];
    const renderedComponent = shallow(
      <HtmlDocument
        lang="en"
        head={head}
        css={css}
        appMarkup="<h1>Hello</h1>"
        state={{}}
        assets={{ main: { js: 'xxx', css: 'yyy' } }}
        webpackDllNames={['zzz']}
      />
    );
    expect(renderedComponent.find('head').length).toEqual(1);
    expect(renderedComponent.find('body').length).toEqual(1);
  });
});
