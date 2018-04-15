/*
 * About
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
// import { FormattedMessage } from 'react-intl';

// import messages from './messages';
import {
  AboutContainer,
  AboutText,
  HeadshotContainer,
  Headshot,
} from './styled';
import Richard from '../../images/richard.jpg';

export default class About extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <AboutContainer>
        <HeadshotContainer>
          <Headshot src={Richard} />
        </HeadshotContainer>
        <AboutText>
          I’m a book writer and free-lance journalist now living in Brooklyn, New York, after a career spanning more than three decades as a foreign correspondent, culture reporter, and book critic, first for Time Magazine and then for the New York Times.
        </AboutText>
        <AboutText>
          I was born in New York, NY, but grew up on a poultry farm in East Haddam, Connecticut, a small town on the Connecticut River.  I went to the University of Connecticut as an undergrad and then spent five years at Harvard working toward a Ph.D. in History and East Asian Languages.  I assumed I’d become a college professor someplace, but I always kept journalism as a more exciting alternative in the back of my mind, and when I went to Taiwan in 1971 to study Chinese, I got my first very part-time job, as the stringer there for the Washington Post.
        </AboutText>
        <AboutText>
          That led to my first real job, as a staff writer for Time Magazine, where I was a rewrite man specializing in Asia.  I spent the mid-1980s as a China-watcher in Hong Kong for Time, and then in 1980, after China and the United States established diplomatic relations, I became the first ever Time correspondent in Beijing.  My first book, From the Center of the Earth: the Search for the Truth About China, resulted from my three years in a China just embarking on the reforms that have now made it a world power.
        </AboutText>
        <AboutText>
          I’ve maintained my interest in China, visiting regularly over the years, but for a long time my main focus was elsewhere.  I got a job at the New York Times, and was, successively, United Nations correspondent, Paris bureau chief, national cultural correspondent, book critic, and Berlin bureau chief.  Along the way I reported for the newspaper from a good two dozen countries, from South Africa to Libya, New Caledonia to Poland.  Along the way I wrote a few more books, and contributed to such magazines as the New York Times Magazine, The New Republic, Foreign Affairs, and the New York Review of Books.
        </AboutText>
        <AboutText>
          I left the Times in 2006 when my tour in Berlin came to an end, and I’ve been working on books ever since, most recently one for young readers, A Girl Named Faithful Plum, which was published by Knopf Books for Young  Readers in September 2011.  I’ve been writing the occasional essay or review for the New York Review of Books, which happens to be my favorite publication on the planet, and I’m at work on a new book for grown-ups, provisionally entitled China, 1945: America, Mao’s Revolution, and the Turning Point in Asia.
        </AboutText>
      </AboutContainer>
    );
  }
}
