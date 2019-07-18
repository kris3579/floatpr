import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SetsRow extends React.Component {
  render() {
    return (
      <tr>
        <td className='winnerColumn'>
          <Link to={{pathname: `/player/${this.props.set.winner_name}`}}>
            {this.props.set.winner_name}
          </Link>
        </td>

        <td className='loserColumn'>
          <Link to={{pathname: `/player/${this.props.set.loser_name}`}}>
            {this.props.set.loser_name}
          </Link>
        </td>

        <td className='scoreColumn'>{this.props.set.score}</td>
      </tr>
    );
  };
};

SetsRow.propTypes = {
  set: PropTypes.object,
};