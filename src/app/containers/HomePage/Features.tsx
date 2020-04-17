import React from 'react';
import styled from 'styled-components/macro';
import { Title } from 'app/containers/HomePage/components/Title';
import { Lead } from './components/Lead';
import { ReactComponent as StateIcon } from './assets/state.svg';
import { ReactComponent as CSSIcon } from './assets/css.svg';
import { ReactComponent as INTLIcon } from './assets/intl.svg';
import { SubTitle } from 'app/containers/HomePage/components/SubTitle';
import { P } from './components/P';
import { A } from 'app/components/A';
import { GithubRepoForm } from 'app/containers/GithubRepoForm';
import { ThemeSwitch } from 'app/containers/ThemeSwitch';
import { LanguageSwitch } from '../LanguageSwitch';

export function Features() {
  return (
    <>
      <Title as="h2">Features</Title>
      <Lead>
        Crafted for <strong>highly scalable</strong>,{' '}
        <strong>easily maintainable</strong> and
        <strong>highly performant</strong> React.js applications with a focus on{' '}
        <strong>best DX</strong> and <strong>best practices</strong>.
      </Lead>
      <List>
        <Feature>
          <StateIcon className="feature-icon" />
          <Content>
            <SubTitle>Predictable State</SubTitle>
            <P>
              Build easy to test and debug, flexible and extensible applications
              using{' '}
              <A
                href="https://redux.js.org/basics/usage-with-react"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux
              </A>
              . Unidirectional data flow allows for change logging and time
              travel debugging.{' '}
              <A
                href="https://github.com/zalmoxisus/redux-devtools-extension"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install Chrome Redux Dev Tools
              </A>
              to see how your application changes to state, travel in time to
              debug. Type any github username below and see it in action with
              Redux Dev Tools.
            </P>
            <GithubRepoForm />
          </Content>
        </Feature>
        <Feature>
          <CSSIcon className="feature-icon" />
          <Content>
            <SubTitle>Next Generation CSS</SubTitle>
            <P>
              Write composable CSS that’s co-located with your components for
              complete modularity. Ship only the styles that are on the page for
              the best performance. Generate application-wide styles and themes
              for your components. Change the theme below to see how easy and
              intuitive theming can ever be!
            </P>
            <ThemeSwitch />
          </Content>
        </Feature>
        <Feature>
          <INTLIcon className="feature-icon" />
          <Content>
            <SubTitle>i18n Internationalization </SubTitle>
            <P>
              Scalable apps need to support multiple languages, easily add and
              support multiple languages. Change the language below to see how
              instantly it updates the page without refreshing.
            </P>
            <LanguageSwitch />
          </Content>
        </Feature>
      </List>
    </>
  );
}

const Feature = styled.li`
  display: flex;
  margin: 6.25rem 0 6.25rem 2.25rem;

  .feature-icon {
    width: 6.25rem;
    height: 6.25rem;
    margin-right: 2.25rem;
    flex-shrink: 0;
  }
`;
const Content = styled.div`
  flex: 1;
`;

const List = styled.ul`
  padding: 0;
  margin: 6.25rem 0 0 0;
`;
