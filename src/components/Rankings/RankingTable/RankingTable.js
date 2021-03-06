import React from 'react';
import PropTypes from 'prop-types';

import PlayerRow from './PlayerRow/PlayerRow';
import PaginationUl from '../../PaginationUl/PaginationUl';

export default class RankingTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPagination: 1,
      rankingFilter: 'activeWashingtonPlayers',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      currentPagination: 1,
    });
  };

  handleIncreasePagination = (e) => {
    e.preventDefault();
    const oldPagination = this.state.currentPagination;
    this.setState({
      currentPagination: oldPagination + 1,
    });
    window.scrollTo(0, 0);
  };

  handleDecreasePagination = (e) => {
    e.preventDefault();
    const oldPagination = this.state.currentPagination;
    this.setState({
      currentPagination: oldPagination - 1,
    });
    window.scrollTo(0, 0);
  };

  handleSelectPagination = (e, newPagination) => {
    e.preventDefault();
    this.setState({
      currentPagination: newPagination,
    });
    window.scrollTo(0, 0);
  };

  render() {
    const { playersObject } = this.props;
    const { currentPagination, rankingFilter } = this.state;

    const firstPlayerIndex = ((currentPagination * 50) - 50);
    const lastPlayerIndex = currentPagination * 50;

    const rankingArray = playersObject[rankingFilter].slice(firstPlayerIndex, lastPlayerIndex);
    const maxPaginations = Math.floor(playersObject[rankingFilter].length / 50) + 1;

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

        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='rankColumn'>Rank</th>
              <th className='regionColumn'>State/Region</th>
              <th className='tagColumn'>Tag</th>
              <th className='fightersColumn'>Fighters</th>
              <th className='ratingColumn'>Rating</th>
              <th className='winRateColumn'>Set Win Rate</th>
              <th className='winRateColumn'>Game Win Rate</th>
            </tr>
            {
              rankingArray.map((player, i) => {
                return (
                  <PlayerRow
                    rank={(((currentPagination * 50) - 50) + i) + 1}
                    player={player}
                    key={i}
                  />
                );
              })
            }
          </tbody>
        </table>

        <div>
          <PaginationUl
            currentPagination={currentPagination}
            handleDecreasePagination={this.handleDecreasePagination}
            handleIncreasePagination={this.handleIncreasePagination}
            handleSelectPagination={this.handleSelectPagination}
            maxPaginations={maxPaginations}
          />
        </div>
      </>
    );
  }
}

RankingTable.propTypes = {
  playersObject: PropTypes.object,
  rankingFilter: PropTypes.string,
};
