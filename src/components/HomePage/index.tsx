/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '../NavBar';
import Masthead from './Masthead';
import Container from '../Container';
import Features from './Features';

export default function HomePage() {
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <Container>
        <Masthead />
        <Features />
      </Container>
    </article>
  );
}
