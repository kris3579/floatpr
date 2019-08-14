import React from 'react';
import { connect } from 'react-redux';
import { createInstance } from 'react-async';
import PropTypes from 'prop-types';
import superagent from 'superagent';

import storeData from '../../actions/dataActions';
import PlayerMatchupState from './PlayerMatchupState/PlayerMatchupState';
import SetsTable from '../SetsTable/SetsTable';

class PlayerProfile extends React.Component {
  playersData = () => {
    return new Promise((resolve, reject) => {

      if (!this.props.playersObject) {
        return superagent.get('http://localhost:3579/getPlayers')
        .then((response) => {
          this.props.storeData(response.body, 'players');
          resolve(response.body);
        })
        .catch((error) => {
          reject(error);
        });
      }
      
      if (this.props.playersObject) {
        resolve(this.props.playersObject);
      }
      
      reject('Something went wrong');
    });
  };

  setsData = () => {
    return new Promise((resolve, reject) => {
      
      if (!this.props.sets) {
        return superagent.get('http://localhost:3579/getSets')
        .then((response) => {
          this.props.storeData(response.body, 'sets');
          resolve(response.body);
        })
        .catch((error) => {
          reject(error);
        });
      }
      
      if (this.props.sets) {
        resolve(this.props.sets);
      }

      reject('Something went wrong');
    });
  };

  render() {
    const player = this.props.match.params.playerName;

    const AsyncPlayers = createInstance();
    const AsyncSets = createInstance();

    return (
      <AsyncPlayers promiseFn={this.playersData}>
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

              <AsyncSets promiseFn={this.setsData}>
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