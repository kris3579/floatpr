import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header/Header';
import Rankings from '../Rankings/Rankings';
import TournamentList from '../TournamentList/TournamentList';
import RequestPage from '../RequestPage/RequestPage';
import About from '../About/About';
import PlayerProfile from '../PlayerProfile/PlayerProfile';
import TournamentProfile from '../TournamentProfile/TournamentProfile';
import Head2Head from '../Head2Head/Head2Head';
import PairHead2Head from '../PairHead2Head/PairHead2Head';

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
          <Route exact path={'/player/:player'} component={PlayerProfile}/>
          <Route exact path={'/tournament/:tournamentId'} component={TournamentProfile}/>
          <Route exact path={'/headToHead'} component={Head2Head}/>
          <Route exact path={'/headToHead/:player1/:player2'} component={PairHead2Head}/>
        </BrowserRouter>
      </div>
    );
  }
}
