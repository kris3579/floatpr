import React from 'react';
import PropTypes from 'prop-types';

import PlayerRow from './PlayerRow/PlayerRow';
import PaginationUl from '../../PaginationUl/PaginationUl';

export default class RankingTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPagination: 1,
    };
  }

  handleIncreasePagination = (e) => {
    e.preventDefault();
    const oldPagination = this.state.currentPagination;
    this.setState({
      currentPagination: oldPagination + 1,
    });
  };

  handleDecreasePagination = (e) => {
    e.preventDefault();
    const oldPagination = this.state.currentPagination;
    this.setState({
      currentPagination: oldPagination - 1,
    });
  };

  handleSelectPagination = (e, newPagination) => {
    e.preventDefault();
    this.setState({
      currentPagination: newPagination,
    });
  };

  render() {
    const { playersObject, rankingFilter } = this.props;
    const { currentPagination } = this.state;

    const firstPlayerIndex = ((currentPagination * 50) - 50);
    const lastPlayerIndex = currentPagination * 50;

    const rankingArray = playersObject[rankingFilter].slice(firstPlayerIndex, lastPlayerIndex);
    const maxPaginations = Math.floor(playersObject[rankingFilter].length / 50) + 1;

    return (
      <>
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
