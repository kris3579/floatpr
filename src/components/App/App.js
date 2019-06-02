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
        <MainRanking/>
        <Footer/>
      </div>
    );
  }
};