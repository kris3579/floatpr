import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import TournamentList from '../TournamentList/TournamentList';
import PlayerProfile from '../PlayerProfile/PlayerProfile';
import RequestPage from '../RequestPage/RequestPage';
import About from '../About/About';
import Footer from '../Footer/Footer';

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Header/>
          <Route exact path={'/'} component={Main}/>
          <Route exact path={'/tournaments'} component={TournamentList}/>
          <Route exact path={'/requests'} component={RequestPage}/>
          <Route exact path={'/about'} component={About}/>
          <Route exact path={'/player/:playerName'} component={PlayerProfile}/>
          <Footer/>
        </BrowserRouter>
      </div>
    );
  };
};