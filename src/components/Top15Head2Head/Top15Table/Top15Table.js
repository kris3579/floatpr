import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class Top15Table extends React.Component {
  render() {
    return (
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
                              <td><strong>{this.getHead2Head(player1, player2, this.props.setsArray)}</strong><br/>Calculated percetages</td>
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
    );
  };
};

Top15Table.propTypes = {
  playersObject: PropTypes.object,
  setsArray: PropTypes.array,
};