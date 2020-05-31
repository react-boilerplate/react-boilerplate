import React from 'react';
import styled from 'styled-components/macro';
import { Title } from 'app/containers/HomePage/components/Title';
import { Lead } from './components/Lead';
import { SubTitle } from 'app/containers/HomePage/components/SubTitle';
import { P } from './components/P';
import { A } from 'app/components/A';
import { GithubRepoForm } from 'app/containers/GithubRepoForm';
import { ThemeSwitch } from 'app/containers/ThemeSwitch';
import { LanguageSwitch } from '../LanguageSwitch';
import { ReactComponent as StateIcon } from './assets/state.svg';
import { ReactComponent as CSSIcon } from './assets/css.svg';
import { ReactComponent as INTLIcon } from './assets/intl.svg';
import { ReactComponent as TSLogo } from './assets/ts.svg';
import { ReactComponent as RouteIcon } from './assets/route.svg';
import { ReactComponent as SEOIcon } from './assets/seo.svg';
import { ReactComponent as InstantFeedbackIcon } from './assets/instant-feedback.svg';
import { ReactComponent as ScaffoldingIcon } from './assets/scaffolding.svg';
import { ReactComponent as OfflineFirstIcon } from './assets/offline-first.svg';
import { ReactComponent as CodeAnalysisIcon } from './assets/code-analysis.svg';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Link } from 'app/components/Link';

export function Features() {
  const { t } = useTranslation();

  return (
    <>
      <Title as="h2">Features</Title>
      <Lead>
        Crafted for <strong>highly scalable</strong>,{' '}
        <strong>easily maintainable</strong> and{' '}
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
              </A>{' '}
              to see how your application's state changes and travel in time to
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
            <SubTitle>{t(translations.i18nFeature.title)} </SubTitle>
            <P>
              {t(translations.i18nFeature.description)}
              <br />
              <small>
                (Only some of the features below are translated to demonstrate
                an example)
              </small>
            </P>
            <LanguageSwitch />
          </Content>
        </Feature>
        <Feature>
          <RouteIcon className="feature-icon" />
          <Content>
            <SubTitle>{t(translations.routingFeature.title)}</SubTitle>
            <P>
              {t(translations.routingFeature.description)}
              <br />
              <small>
                Go to our{' '}
                <Link to={process.env.PUBLIC_URL + '/notfound'}>/NotFound</Link>{' '}
                page to see how routing works
              </small>
            </P>
          </Content>
        </Feature>
        <Feature>
          <InstantFeedbackIcon className="feature-icon" />
          <Content>
            <SubTitle>{t(translations.feedbackFeature.title)}</SubTitle>
            <P>{t(translations.feedbackFeature.description)}</P>
          </Content>
        </Feature>
        <Feature>
          <ScaffoldingIcon className="feature-icon" />
          <Content>
            <SubTitle>{t(translations.scaffoldingFeature.title)}</SubTitle>
            <P>{t(translations.scaffoldingFeature.description)}</P>
          </Content>
        </Feature>
        <Feature>
          <SEOIcon className="feature-icon" />
          <Content>
            <SubTitle>SEO</SubTitle>
            <P>
              Supports SEO (document head tags management) for search engines
              that support indexing of JavaScript content.
            </P>
          </Content>
        </Feature>
        <Feature>
          <TSLogo className="feature-icon" />
          <Content>
            <SubTitle>TypeScript</SubTitle>
            <P>
              Typescript is the key to scalability. Build self-documented code,
              easy-to-debug code and create maintainable large applications and
              codebases with a highly productive development experience.
            </P>
          </Content>
        </Feature>
        <Feature>
          <OfflineFirstIcon className="feature-icon" />
          <Content>
            <SubTitle>Offline-First</SubTitle>
            <P>
              The next frontier in performant web apps: availability without a
              network connection from the instant your users load the app.
            </P>
          </Content>
        </Feature>
        <Feature>
          <CodeAnalysisIcon className="feature-icon" />
          <Content>
            <SubTitle>Static Code Analysis</SubTitle>
            <P>
              Focus on writing new features without worrying about formatting or
              code quality. With the right editor setup, your code will
              automatically be formatted and linted as you work.
            </P>
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
