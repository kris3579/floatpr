import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss'

export default class Nav extends React.Component {
  render() {

    return (
      <nav>
        <ul className='navUl'>
          <li className='navLi'><Link to='/' className='navLink'>WA Ranking</Link></li>
          <li className='navLi'><Link to='/tournaments' className='navLink'>Tournaments</Link></li>
          <li className='navLi'><Link to='/requests' className='navLink'>Requests</Link></li>
          <li className='navLi'><Link to='/about' className='navLink'>About</Link></li>
        </ul>
      </nav>
    );
  };
};