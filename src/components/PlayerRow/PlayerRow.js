import React from 'react';

export default class PlayerRanking extends React.Component {
  render() {

    return (
      <div>
        <tr>
          <td>{this.props.player.name}</td>
          <td>{this.props.player.score}</td>
          <td>{this.props.player.setWinPercentage}</td>
        </tr>
      </div>
    );
  };
};