import React from 'react';

import Nav from './Nav/Nav';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>FloatPR</h1>
        <Nav/>
      </header>
    );
  };
};
