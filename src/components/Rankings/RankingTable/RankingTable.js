import React from 'react';
import PropTypes from 'prop-types';

import PlayerRow from './PlayerRow/PlayerRow';

export default class RankingTable extends React.Component {
  render() {
    let rankingArray = '';
    let tableHeader = 'Active Washington Players';

    switch (this.props.rankingFilter) {
      case 'activeWashingtonPlayers':
        rankingArray = 'activeWashingtonPlayers';
        tableHeader = 'Active Washington Players';
        break;
      case 'allActivePlayers':
        rankingArray = 'allActivePlayers';
        tableHeader = 'All Active Players';
        break;
      case 'allPlayers':
        rankingArray = 'allPlayers';
        tableHeader = 'All Players';
        break;
      case 'outOfStatePlayers':
        rankingArray = 'outOfStatePlayers';
        tableHeader = 'Out-of-State Players';
        break;
      default:
        rankingArray = '';
    };

    return (
      <>
        <h2>{tableHeader}</h2>
        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='rankColumn'>Rank</th>
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
      </>
    );
  };
};

RankingTable.propTypes = {
  playersObject: PropTypes.object,
  rankingFilter: PropTypes.string,
};