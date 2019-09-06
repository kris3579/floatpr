import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SetsRow extends React.Component {
  render() {
    console.log(this.props.set);
    return (
      <tr>
        <td className='roundColumn'>{this.props.set.round}</td>

        <td className='playerColumn'>
          <Link className='link' to={{pathname: `/player/${this.props.set.winner_name}`}}>
            {this.props.set.winner_name}
          </Link>
        </td>

        <td className='scoreColumn'>{this.props.set.winner_score}-{this.props.set.loser_score}</td>
        
        <td className='playerColumn'>
          <Link className='link' to={{pathname: `/player/${this.props.set.loser_name}`}}>
            {this.props.set.loser_name}
          </Link>
        </td>

        <td className='tournamentColumn'>
          <Link className='link' to={{pathname: `/tournaments/${this.props.set.tournament_id}`}}>
            {this.props.set.tournament_name}
          </Link>
        </td>
      </tr>
    );
  };
};

SetsRow.propTypes = {
  set: PropTypes.object,
};