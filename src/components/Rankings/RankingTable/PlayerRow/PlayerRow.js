import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PlayerRow extends React.Component {
  render() {
    return (
      <tr>
        <td className='rankColumn'>{this.props.rank}</td>
        <td className='regionColumn'>{this.props.player.state}</td>
      
        <td className='nameColumn'>
          <Link className='link' to={{pathname: `/player/${this.props.player.name}`}}>
            {this.props.player.name}
          </Link>
        </td>

        <td className='mainsColumn'>{
          this.props.player.mains.map((main, i) => {
            return (
              <img src={require(`../../../../assets/stockIcons/${main}.png`)} alt='Fighter Icon' key={i}></img>
            );
          })
        }</td>

        <td className='scoreColumn'>{this.props.player.rating}</td>
        <td className='winRateColumn'>{this.props.player.set_win_rate}</td>
        <td className='winRateColumn'>{this.props.player.game_win_rate}</td>
      </tr>
    );
  };
};

PlayerRow.propTypes = {
  player: PropTypes.object,
  rank: PropTypes.number,
};