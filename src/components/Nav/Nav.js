import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss'

export default class Nav extends React.Component {
  render() {

    return (
      <nav>
        <ul>
          <li><Link to='/'>WA Ranking</Link></li>
          <li><Link to='/tournaments'>Tournaments</Link></li>
          <li><Link to='/requests'>Requests</Link></li>
          <li><Link to='/about'>About</Link></li>
        </ul>
      </nav>
    );
  };
};