import React from 'react';
import { connect } from 'react-redux';
import Async from 'react-async';
import PropTypes from 'prop-types';

import storeData from '../../../actions/dataActions';
import DataRetrievalFunctions from '../../../dataRetrievalFunctions/dataRetrievalFunctions';
import PlayerRow from './PlayerRow/PlayerRow';

import './RankingTable.scss';

class RankingTable extends React.Component {
  render() {
    const dataRetrievalFunctions = new DataRetrievalFunctions();

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
      <Async promiseFn={dataRetrievalFunctions.playersData} storeDataFunction={this.props.storeData} playersObject={this.props.playersObject}>
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {playersData => (
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
                    playersData[rankingArray].map((player, i) => {
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
          )}
        </Async.Resolved>
        <Async.Rejected>{error => error.message}</Async.Rejected>
      </Async>
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