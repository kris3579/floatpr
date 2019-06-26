import React from 'react';
import PropTypes from 'prop-types';

import './PlayerRow.scss';

export default class PlayerRow extends React.Component {
  render() {
    return (
      <tr>
        <td className='rankColumn'>{this.props.player.rank}</td>
        <td className='nameColumn'>{this.props.player.tag}</td>
        <td className='mainsColumn'>{this.props.player.mains}</td>
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