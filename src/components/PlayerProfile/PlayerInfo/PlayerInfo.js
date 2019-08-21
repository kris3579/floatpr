import React from 'react';
import PropTypes from 'prop-types';

export default class PlayerInfo extends React.Component {
  render() {
    const player = this.props.playersObject[this.props.playerName];
    
    return (
      <>
        <h2>{player.name}</h2>
        <div>
          {
            player.mains.map((main, i) => {
              return (
                <img src={require(`../../../assets/stockIcons/${main}.png`)} alt='Fighter Icon' key={i}></img>
              )
            })
          }
        </div>
        <p>
          {player.rating}<br/>
          {player.set_win_rate}<br/>
          {player.game_win_rate}<br/>
        </p>
        <p>
          {player.attendance}<br/>
          {player.active_attendance}<br/>
        </p>
      </>
    );
  };
};

PlayerInfo.propTypes = {
  player: PropTypes.string,
  playersObject: PropTypes.object,
};