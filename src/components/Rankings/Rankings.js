import React from 'react';

import RankingTable from '../RankingTable/RankingTable';

export default class Rankings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.rankingFilter = 'activeWashingtonPlayers';
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <form>
          <select name='rankingFilter' value={this.state.rankingFilter} onChange={this.handleChange} required>
            <option value='activeWashingtonPlayers'>Active Washington Players</option>
            <option value='allActivePlayers'>All Active Players</option>
            <option value='allPlayers'>All Players</option>
            <option value='outOfStatePlayers'>Out-of-State Players</option>
          </select>
        </form>
        <RankingTable
          rankingFilter={this.state.rankingFilter}
        />
      </div>
    );
  }
};