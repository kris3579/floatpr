import React from 'react';
import superagent from 'superagent';
// import cors from 'cors';

import MainRanking from '../MainRanking/MainRanking';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.tournament = '';
    this.state.activePlayers = [
      {
        score: 9999,
        tag: 'Digital',
        setWinRate: '99%',
        gameWinRate: '99%',
        mains: ['GreenPeach', 'BlackCaptainFalcon', 'GreenFox', 'GreenPikachu'],
        rank: 1
      },
      {
        score: 0,
        tag: 'Popa Squat',
        setWinRate: '0%',
        gameWinRate: '99%',
        mains: ['BlackCaptainFalcon'],
        rank: 2
      },
      {
        score: 1234,
        tag: 'wild flower',
        setWinRate: '40%',
        gameWinRate: '99%',
        mains: ['NeutralFox', 'NeutralSheik'],
        rank: 3
      },
      {
        score: 4000,
        tag: 'Greenman',
        setWinRate: '77%',
        gameWinRate: '99%',
        mains: ['GreenFox', 'GreenGameAndWatch'],
        rank: 4
      },
      {
        score: 3030,
        tag: 'Honey',
        setWinRate: '10%',
        gameWinRate: '99%',
        mains: ['GreenFalco', 'WhitePeach'],
        rank: 5
      }
    ]
  };

  getChallongeTournament = (tournament) => {
    superagent.get(`http://localhost:3579/hitChallonge/${tournament}`)
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
    this.getChallongeTournament(this.state.tournament);
    this.setState({
      tournament: '',
    });
  };

  render() {
    return (
      <div className="Main">
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='tournament'
            placeholder='tournament'
            value={this.state.tournament}
            onChange={this.handleChange}
          />
          <button type='submit'>Submit</button>
        </form>
        <MainRanking
          activePlayers={this.state.activePlayers}
        />
      </div>
    );
  }
};