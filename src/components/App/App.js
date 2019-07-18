import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Rankings from '../Rankings/Rankings';
import TournamentList from '../TournamentList/TournamentList';
import RequestPage from '../RequestPage/RequestPage';
import About from '../About/About';
import PlayerProfile from '../PlayerProfile/PlayerProfile';
import TournamentProfile from '../TournamentProfile/TournamentProfile';

import './App.scss';

export default class App extends React.Component {
  render() {    
    return (
      <div className='App'>
        <BrowserRouter>
          <Header/>
          <Route exact path={'/'} component={Rankings}/>
          <Route exact path={'/tournaments'} component={TournamentList}/>
          <Route exact path={'/requests'} component={RequestPage}/>
          <Route exact path={'/about'} component={About}/>
          <Route exact path={'/player/:playerName'} component={PlayerProfile}/>
          <Route exact path={'/tournament/:tournamentName'} component={TournamentProfile}/>
        </BrowserRouter>
      </div>
    );
  };
};