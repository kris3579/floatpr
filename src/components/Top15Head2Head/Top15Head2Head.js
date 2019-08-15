import React from 'react';
import { connect } from 'react-redux';
import { createInstance } from 'react-async';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DataRetrievalFunctions from '../../dataRetrievalFunctions/dataRetrievalFunctions';
import storeData from '../../actions/dataActions';

class Top15Head2Head extends React.Component {
  
  getHead2Head = (player1, player2, setsData) => {
    let player1Wins = 0;
    let player2Wins = 0;

    setsData.forEach((set) => {
      if (set.winner_name === player1.name && set.loser_name === player2.name) {
        player1Wins += 1;
      }
      if (set.winner_name === player2.name && set.loser_name === player1.name) {
        player2Wins += 1;
      }
    });

    const score = `${player1Wins}-${player2Wins}`;
    return score;
  };

  render() {
    const AsyncPlayers = createInstance();
    const AsyncSets = createInstance();

    const dataRetrievalFunctions = new DataRetrievalFunctions();

    return (
      <AsyncPlayers promiseFn={dataRetrievalFunctions.playersData} storeDataFunction={this.props.storeData} playersObject={this.props.playersObject}>
        <AsyncPlayers.Loading>Loading...</AsyncPlayers.Loading>
        <AsyncPlayers.Resolved>
          {playersData => (
            <>
              <h2>Top 15 Head to Head Table</h2>
              <AsyncSets promiseFn={dataRetrievalFunctions.setsData} storeDataFunction={this.props.storeData} sets={this.props.sets}>
                <AsyncSets.Loading>Loading...</AsyncSets.Loading>
                <AsyncSets.Resolved>
                  {setsData => (
                    <table>
                      <tbody>
                        <tr className=''>
                          <td></td>
                          {
                            playersData.activeWashingtonPlayers.map((player2, i) => {
                              if (i < 14) {
                                return (
                                  <td key={i}><Link to={{pathname: `/players/${player2.name}`}}>{player2.name}</Link></td>
                                  )
                                }
                                return null;
                              })
                            }
                        </tr>
                        {
                          playersData.activeWashingtonPlayers.map((player1, i) => {
                            if (i < 14) {
                              return (
                                <tr key={i}>
                                  <td><Link to={{pathname: `/players/${player1.name}`}}>{player1.name}</Link></td>
                                  {
                                    playersData.activeWashingtonPlayers.map((player2, i) => {
                                      if (i < 14) {
                                        return (
                                          <td><strong>{this.getHead2Head(player1, player2, setsData)}</strong><br/>Calculated percetages</td>
                                          )
                                        }
                                        return null;
                                      })
                                    }
                                </tr>
                              )
                            }
                            return null;
                          })
                        }
                      </tbody>
                    </table>
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
    setsArray: state.sets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};

Top15Head2Head.propTypes = {
  playersObject: PropTypes.object,
  setsArray: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Top15Head2Head);