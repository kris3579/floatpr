import React from 'react';
import PropTypes from 'prop-types';

import './PlayerRanking.scss';

export default class PlayerRanking extends React.Component {
  render() {
    console.log(this.props.player);

    return (
      <tr>
        <td className='rankColumn'>{this.props.player.rank}</td>
        <td className='nameColumn'>{this.props.player.tag}</td>
        <td className='mainsColumn'>{this.props.player.mains}</td>
        <td className='scoreColumn'>{this.props.player.score}</td>
        <td className='winRateColumn'>{this.props.player.winRate}</td>
      </tr>
    );
  };
};

PlayerRanking.propTypes = {
  player: PropTypes.object
};