import React from 'react';

import './Nav.scss'

export default class Nav extends React.Component {
  render() {

    return (
      <nav>
        <ul>
          <li><a>WA Ranking</a></li>
          <li><a>Event Rankings</a></li>
          <li><a>About</a></li>
        </ul>
      </nav>
    );
  };
};