import React from 'react';
import PropTypes from 'prop-types';

import PlayerRow from './PlayerRow/PlayerRow';

export default class RankingTable extends React.Component {
  render() {
    let rankingArray = '';

    switch (this.props.rankingFilter) {
      case 'activeWashingtonPlayers':
        rankingArray = 'activeWashingtonPlayers';
        break;
      case 'washingtonPlayers':
        rankingArray = 'washingtonPlayers';
        break;
      case 'allPlayers':
        rankingArray = 'allPlayers';
        break;
      default:
        rankingArray = '';
    };

    return (
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
            this.props.playersObject[rankingArray].map((player, i) => {
              return (
                <PlayerRow
                  rank={i + 1}
                  player={player}
                  key={i}
                />
              )
            })
          }
        </tbody>
      </table>
    );
  };
};

RankingTable.propTypes = {
  playersObject: PropTypes.object,
  rankingFilter: PropTypes.string,
};