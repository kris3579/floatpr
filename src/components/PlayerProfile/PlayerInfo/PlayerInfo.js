import React from 'react';
import PropTypes from 'prop-types';

export default class PlayerInfo extends React.Component {
  render() {
    const player = this.props.playersObject[this.props.playerName];
    
    const setWinRate = Number.isInteger(parseFloat(player.set_win_rate, 10))
      ? parseFloat(player.set_win_rate, 10).toFixed(0) : player.set_win_rate;
    const gameWinRate = Number.isInteger(parseFloat(player.game_win_rate, 10))
      ? parseFloat(player.game_win_rate, 10).toFixed(0) : player.game_win_rate;
    
    return (
      <>
        <h2>{player.name}</h2>

        <div>
          <p>Mains:</p>
          {
            player.mains.map((main, i) => {
              return (
                <img src={require(`../../../assets/stockIcons/${main}.png`)} alt='Fighter Icon' key={i}></img> // eslint-disable-line
              );
            })
          }
        </div>

        <p>
          Rating: {player.rating}<br/>
          Set Win Rate: {setWinRate}%<br/>
          Game Win Rate: {gameWinRate}%<br/>
        </p>
        
        <p>
          Tournaments Attended: {player.attendance}<br/>
          Active Attendance: {player.active_attendance}<br/>
        </p>
      </>
    );
  }
}

PlayerInfo.propTypes = {
  playerName: PropTypes.string,
  playersObject: PropTypes.object,
};
