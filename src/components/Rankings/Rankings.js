import React from 'react';
import PropTypes from 'prop-types';

import PlayersAsyncWrapper from '../AsyncWrappers/PlayersAsyncWrapper/PlayersAsyncWrapper';
import RankingTable from './RankingTable/RankingTable';

export default class Rankings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.rankingFilter = 'activeWashingtonPlayers';
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <>
        <form>
          <label>Ranking:</label>
          <select name='rankingFilter' value={this.state.rankingFilter} onChange={this.handleChange} required>
            <option value='activeWashingtonPlayers'>Active Washington Players</option>
            <option value='washingtonPlayers'>All Washington Players</option>
            <option value='allPlayers'>All Players</option>
          </select>
        </form>
        <PlayersAsyncWrapper>
          <RankingTable
            playersObject={this.state.playersObject}
            rankingFilter={this.state.rankingFilter}
          />
        </PlayersAsyncWrapper>
      </>
    );
  }
}

Rankings.propTypes = {
  playersObject: PropTypes.object,
};
