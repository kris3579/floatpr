import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PlayerRow extends React.Component {
  render() {
    const { player } = this.props;
    const playerName = player.sponser === '' ? player.name : `${player.sponser} | ${player.name}`;

    return (
      <tr>
        <td className='rankColumn'>{this.props.rank}</td>
        <td className='regionColumn'>{player.state}</td>
      
        <td className='nameColumn'>
          <Link to={{ pathname: `/player/${player.name}` }}>
            {playerName}
          </Link>
        </td>

        <td className='mainsColumn'>{
          player.mains.map((main, i) => {
            return (
              <img src={require(`../../../../assets/stockIcons/${main}.png`)} alt='Fighter Icon' key={i}></img> // eslint-disable-line
            );
          })
        }</td>

        <td className='scoreColumn'>{player.rating}</td>
        <td className='winRateColumn'>{`${player.set_win_rate}%`}</td>
        <td className='winRateColumn'>{`${player.game_win_rate}%`}</td>
      </tr>
    );
  }
}

PlayerRow.propTypes = {
  player: PropTypes.object,
  rank: PropTypes.number,
};
