import React from 'react';
import superagent from 'superagent';
// import cors from 'cors';

import Header from '../Header/Header';
import MainRanking from '../MainRanking/MainRanking';
import Footer from '../Footer/Footer';

import './App.css';

console.log(process.env.REACT_APP_CHALLONGE_API_KEY);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.tournament = '';
    this.state.activePlayers = [
      {
        score: 9999,
        tag: 'Digital',
        winRate: '99%',
        mains: 'Peach, Fox',
        rank: 1
      },
      {
        score: 0,
        tag: 'Popa Squat',
        winRate: '0%',
        mains: 'Captain Falcon',
        rank: 2
      },
      {
        score: 1234,
        tag: 'wild flower',
        winRate: '40%',
        mains: 'Fox, Sheik',
        rank: 3
      },
      {
        score: 4000,
        tag: 'Greenman',
        winRate: '77%',
        mains: 'Fox',
        rank: 4
      },
      {
        score: 3030,
        tag: 'Honey',
        winRate: '10%',
        mains: 'Falco, Peach',
        rank: 5
      }
    ]
  };

  getChallongeTournament = () => {
    superagent.get('http://localhost:3579/hitChallonge')
    .withCredentials()
    .then((response) => {
      console.log(response);
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getChallongeTournament();
    this.setState({
      tournament: '',
    });
  };

  render() {
    return (
      <div className="App">
        <Header/>
        <form onSubmit={this.handleSubmit}>
          {/* <input
            type='text'
            name='tournament'
            placeholder='tournament'
            value={this.state.tournament}
            onChange={this.handleChange}
          /> */}
          <button type='submit'>Submit</button>
        </form>
        <MainRanking
          activePlayers={this.state.activePlayers}
        />
        <Footer/>
      </div>
    );
  }
};