import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './PlayerRow.scss';

export default class PlayerRow extends React.Component {
  render() {
    return (
      <tr>
        <td className='rankColumn'>{this.props.player.rank}</td>
      
        <td className='nameColumn'>
          <Link className='playerLink' to={{pathname: `/player/${this.props.player.tag}`}}>
            {this.props.player.tag}
          </Link>
        </td>

        <td className='mainsColumn'>{
          this.props.player.mains.map((main, i) => {
            console.log(main, i);
            return (
              <img src={require(`../../assets/stockIcons/${main}.png`)} alt='Fighter Icon' key={i}></img>
            )
          })
        }</td>

        <td className='scoreColumn'>{this.props.player.score}</td>
        <td className='winRateColumn'>{this.props.player.setWinRate}</td>
        <td className='winRateColumn'>{this.props.player.gameWinRate}</td>
      </tr>
    );
  };
};

PlayerRow.propTypes = {
  player: PropTypes.object
};