import React from 'react';

import RankingTable from '../RankingTable/RankingTable';

export default class Rankings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.playerFilter = '';
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
      <div>
        <form>
          <select name='playerFilter' value={this.state.playerFilter} onChange={this.handleChange} required>
            <option value='activeWashingtonPlayers'>Active Washington Players</option>
            <option value='allActivePlayers'>All Active Players</option>
            <option value='allPlayers'>All Players</option>
            <option value='outOfStatePlayers'>Out-of-State Players</option>
          </select>
        </form>
        <RankingTable
          rankingFilter={this.state.playerFilter}
        />
      </div>
    );
  }
};