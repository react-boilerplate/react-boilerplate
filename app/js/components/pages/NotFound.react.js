import React from 'react';
import { Link } from 'react-router';

function NotFound() {
  return (
    <article>
      <h1>Page not found.</h1>
      <Link to="/" className="btn">Home</Link>
    </article>
  );
}

export default NotFound;
