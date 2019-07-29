import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Top15Head2Head extends React.Component {
  getHead2Head = (player1, player2) => {
    let player1Wins = 0;
    let player2Wins = 0;

    this.props.setsArray.forEach((set) => {
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
    return (
      <div>
        <h2>Top 15 Head to Head Table</h2>
        <table>
          <tbody>
            <tr className=''>
              <td></td>
              {
                this.props.playersObject.activeWashingtonPlayers.map((player2, i) => {
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
              this.props.playersObject.activeWashingtonPlayers.map((player1, i) => {
                if (i < 14) {
                  return (
                    <tr key={i}>
                      <td><Link to={{pathname: `/players/${player1.name}`}}>{player1.name}</Link></td>
                      {
                        this.props.playersObject.activeWashingtonPlayers.map((player2, i) => {
                          if (i < 14) {
                            return (
                              <td><strong>{this.getHead2Head(player1, player2)}</strong><br/>Calculated percetages</td>
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
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    playersObject: state.players,
    setsArray: state.sets,
  };
};

Top15Head2Head.propTypes = {
  playersObject: PropTypes.object,
  setsArray: PropTypes.array,
};

export default connect(mapStateToProps, null)(Top15Head2Head);