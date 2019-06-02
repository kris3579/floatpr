import React from 'react';
import PlayerRanking from '../PlayerRanking/PlayerRanking';

import './MainRanking.scss';

export default class MainRanking extends React.Component {
  render() {
    
    return (
      <div>
        <p>Main Ranking</p>
        <table>
          <tbody>
            {
              this.props.activePlayers.map((player, i) => {
                return (
                  <PlayerRanking
                  player={player}
                  key={i}
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  };
};