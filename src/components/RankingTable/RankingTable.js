import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlayerRow from '../PlayerRow/PlayerRow';

import './RankingTable.scss';

class RankingTable extends React.Component {
  render() {
    let rankingArray;
    let tableHeader;

    switch (this.props.rankingFilter) {
      case 'activeWashingtonPlayers':
        rankingArray = this.props.playersObject.activeWashingtonPlayers;
        tableHeader = 'Active Washington Players';
        break;
      case 'allActivePlayers':
        rankingArray = this.props.playersObject.allActivePlayers;
        tableHeader = 'All Active Players';
        break;
      case 'allPlayers':
        rankingArray = this.props.playersObject.allPlayers;
        tableHeader = 'All Players';
        break;
      case 'outOfStatePlayers':
        rankingArray = this.props.playersObject.outOfStatePlayers;
        tableHeader = 'Out-of-State Players';
        break;
      default:
        rankingArray = null;
    };

    return (
      <div>
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
              rankingArray ? rankingArray.map((player, i) => {
                return (
                  <PlayerRow
                    player={player}
                    key={i}
                  />
                )
              }) : <tr></tr>
            }
          </tbody>
        </table>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    playersObject: state.players,
  };
};

RankingTable.propTypes = {
  playersObject: PropTypes.object,
  rankingFilter: PropTypes.string,
};

export default connect(mapStateToProps, null)(RankingTable);