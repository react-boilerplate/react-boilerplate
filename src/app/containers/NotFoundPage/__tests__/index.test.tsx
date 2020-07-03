import React from 'react';
import { NotFoundPage } from '..';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { themes } from 'styles/theme/themes';
import { HelmetProvider } from 'react-helmet-async';
import renderer from 'react-test-renderer';
import { Link } from 'app/components/Link';

const renderPage = () =>
  renderer.create(
    <MemoryRouter>
      <ThemeProvider theme={themes.light}>
        <HelmetProvider>
          <NotFoundPage />
        </HelmetProvider>
      </ThemeProvider>
    </MemoryRouter>,
  );

describe('<NotFoundPage />', () => {
  it('should match snapshot', () => {
    const notFoundPage = renderPage();
    expect(notFoundPage.toJSON()).toMatchSnapshot();
  });

  it('should should contain Link', () => {
    const notFoundPage = renderPage();
    expect(notFoundPage.root.findByType(Link)).toBeDefined();
  });
});
