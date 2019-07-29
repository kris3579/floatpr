import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import storeData from '../../actions/dataActions';
import PlayerRow from '../PlayerRow/PlayerRow';

import './RankingTable.scss';

class RankingTable extends React.Component {
  render() {
    let rankingArray = [];
    let tableHeader = 'Active Washington Players';

    if (this.props.playersObject) {
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
          rankingArray = [];
      };
    }
                
    const loadingOrNot = this.props.playersObject ? <>
      {
        rankingArray.map((player, i) => {
          return (
            <PlayerRow
              rank={i + 1}
              player={player}
              key={i}
            />
          )
        })
      }
    </> : <tr><td className='loadingColumn'>Loading...</td></tr>;

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
            {loadingOrNot}
          </tbody>
        </table>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    playersObject: state.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};

RankingTable.propTypes = {
  playersObject: PropTypes.object,
  rankingFilter: PropTypes.string,
  storeData: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingTable);