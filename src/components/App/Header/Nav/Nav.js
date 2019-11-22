import React from 'react';
import MediaQuery from 'react-responsive';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleStateChange = (state) => {
    this.setState({
      isOpen: state.isOpen,
    }, () => console.log(this.state));
  }
  
  render() {
    const desktopNav = <nav>
      <ul className='navUl'>
        <li className='navLi'><Link to='/' className='navLink'>WA Ranking</Link></li>
        <li className='navLi'><Link to='/headToHead' className='navLink'>Head To Head</Link></li>
        <li className='navLi'><Link to='/tournaments' className='navLink'>Tournaments</Link></li>
        <li className='navLi'><Link to='/requests' className='navLink'>Requests</Link></li>
        <li className='navLi'><Link to='/about' className='navLink'>About</Link></li>
      </ul>
    </nav>;

    const mobileNav = <Menu isOpen={this.state.isOpen} onStateChange={this.handleStateChange} right>
      <Link to='/' className='bm-item' onClick={() => this.handleStateChange({ isOpen: false })}>WA Ranking</Link>
      <Link to='/headToHead' className='bm-item' onClick={() => this.handleStateChange({ isOpen: false })}>Head To Head</Link>
      <Link to='/tournaments' className='bm-item' onClick={() => this.handleStateChange({ isOpen: false })}>Tournaments</Link>
      <Link to='/requests' className='bm-item' onClick={() => this.handleStateChange({ isOpen: false })}>Requests</Link>
      <Link to='/about' className='bm-item' onClick={() => this.handleStateChange({ isOpen: false })}>About</Link>
    </Menu>;

    return (
      <MediaQuery maxDeviceWidth={480}>
        {(matches) => {
          return matches ? mobileNav : desktopNav;
        }}
      </MediaQuery>
    );
  }
}
