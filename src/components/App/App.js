import React from 'react';
import challonge from 'challonge';

import Header from '../Header/Header';
import MainRanking from '../MainRanking/MainRanking';
import Footer from '../Footer/Footer';

import './App.css';

console.log(process.env.REACT_APP_CHALLONGE_API_KEY);

const client = challonge.createClient({
  apiKey: process.env.REACT_APP_CHALLONGE_API_KEY,
  
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.tournament = '';
  };

  getChallongeTournament = () => {
  // getChallongeTournament = (tournament) => {
    
    client.tournaments.index({
      callback: (err, data) => {
        console.log(err, data);
      },
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
    // this.getChallongeTournament(this.state.tournament);
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
        <MainRanking/>
        <Footer/>
      </div>
    );
  }
};