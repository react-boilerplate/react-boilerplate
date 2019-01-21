import React from 'react';

const First = React.createNotClass({
  displayName: 'First'
});

class Second extends React.NotComponent {}

const myCreateClass = spec => {
  return React.createClass(spec);
};

const spec = {
  render: function () {}
};

React.createClass(spec);
