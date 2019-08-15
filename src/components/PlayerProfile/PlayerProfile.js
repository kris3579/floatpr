import React from 'react';
import { connect } from 'react-redux';
import { createInstance } from 'react-async';
import PropTypes from 'prop-types';

import storeData from '../../actions/dataActions';
import DataRetrievalFunctions from '../../dataRetrievalFunctions/dataRetrievalFunctions';
import PlayerMatchupState from './PlayerMatchupState/PlayerMatchupState';
import SetsTable from '../SetsTable/SetsTable';

class PlayerProfile extends React.Component {
  render() {
    const player = this.props.match.params.playerName;

    const AsyncPlayers = createInstance();
    const AsyncSets = createInstance();
    
    const dataRetrievalFunctions = new DataRetrievalFunctions();

    return (
      <AsyncPlayers promiseFn={dataRetrievalFunctions.playersData} storeDataFunction={this.props.storeData} playersObject={this.props.playersObject}>
        <AsyncPlayers.Loading>Loading...</AsyncPlayers.Loading>
        <AsyncPlayers.Resolved>
          {playersData => (
            <>
              <h2>{playersData[player].name}</h2>
              <div>
                {
                  playersData[player].mains.map((main, i) => {
                    return (
                      <img src={require(`../../assets/stockIcons/${main}.png`)} alt='Fighter Icon' key={i}></img>
                    )
                  })
                }
              </div>
              <p>
                {playersData[player].rating}<br/>
                {playersData[player].set_win_rate}<br/>
                {playersData[player].game_win_rate}<br/>
              </p>
              <p>
                {playersData[player].attendance}<br/>
                {playersData[player].active_attendance}<br/>
              </p>

              <AsyncSets promiseFn={dataRetrievalFunctions.setsData} storeDataFunction={this.props.storeData} sets={this.props.sets}>
                <AsyncSets.Loading>Loading...</AsyncSets.Loading>
                <AsyncSets.Resolved>
                  {setsData => (
                    <>
                      <h4>Personal Head2Head Table</h4>
                      <PlayerMatchupState
                        player={playersData[player]}
                        sets={setsData}
                      />

                      <h4>Sets Table</h4>
                      <SetsTable
                        playerA={playersData[player].name}
                        playerB='none'
                        sets={setsData}
                        setsType='playerSets'
                        tournament='none'
                      />
                    </>
                  )}
                </AsyncSets.Resolved>
                <AsyncSets.Rejected>{error => error.message}</AsyncSets.Rejected>
              </AsyncSets>
            </>
          )}
        </AsyncPlayers.Resolved>
        <AsyncPlayers.Rejected>{error => error.message}</AsyncPlayers.Rejected>
      </AsyncPlayers>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    playersObject: state.players,
    sets: state.sets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};

PlayerProfile.propTypes = {
  playersObject: PropTypes.object,
  sets: PropTypes.array,
  storeData: PropTypes.func,
}; 

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfile);