import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SetsRow extends React.Component {
  render() {
    let rowToRender = <tr>
      <td className='roundColumn'>{this.props.set.round}</td>

      <td className='playerColumn'>
        <Link to={{ pathname: `/player/${this.props.set.winner_name}` }}>
          {this.props.set.winner_name}
        </Link>
      </td>

      <td className='scoreColumn'>{this.props.set.winner_score}-{this.props.set.loser_score}</td>
      
      <td className='playerColumn'>
        <Link to={{ pathname: `/player/${this.props.set.loser_name}` }}>
          {this.props.set.loser_name}
        </Link>
      </td>

      <td className='tournamentColumn'>
        <Link to={{ pathname: `/tournament/${this.props.set.tournament_id}` }}>
          {this.props.set.tournament_name}
        </Link>
      </td>
    </tr>;

    if (this.props.setsType === 'tournamentSets') {
      rowToRender = <tr>
      <td className='tsRoundColumn'>{this.props.set.round}</td>

      <td className='tsPlayerColumn'>
        <Link to={{ pathname: `/player/${this.props.set.winner_name}` }}>
          {this.props.set.winner_name}
        </Link>
      </td>

      <td className='tsScoreColumn'>{this.props.set.winner_score}-{this.props.set.loser_score}</td>
      
      <td className='tsPlayerColumn'>
        <Link to={{ pathname: `/player/${this.props.set.loser_name}` }}>
          {this.props.set.loser_name}
        </Link>
      </td>
    </tr>;
    }
    
    if (this.props.setsType === 'playerSets' && this.props.player === this.props.set.winner_name) {
      rowToRender = <tr>
        <td className='roundColumn'><span className='greenText'>{this.props.set.round}</span></td>

        <td className='playerColumn'>
          <Link to={{ pathname: `/player/${this.props.set.winner_name}` }}>
            {this.props.set.winner_name}
          </Link>
        </td>

        <td className='scoreColumn'>{this.props.set.winner_score}-{this.props.set.loser_score}</td>
        
        <td className='playerColumn'>
          <Link to={{ pathname: `/player/${this.props.set.loser_name}` }}>
            {this.props.set.loser_name}
          </Link>
        </td>

        <td className='tournamentColumn'>
          <Link to={{ pathname: `/tournament/${this.props.set.tournament_id}` }}>
            {this.props.set.tournament_name}
          </Link>
        </td>
      </tr>;
    }

    if (this.props.setsType === 'playerSets' && this.props.player === this.props.set.loser_name) {
      rowToRender = <tr>
        <td className='roundColumn'><span className='redText'>{this.props.set.round}</span></td>

        <td className='playerColumn'>
          <Link to={{ pathname: `/player/${this.props.set.loser_name}` }}>
            {this.props.set.loser_name}
          </Link>
        </td>

        <td className='scoreColumn'>{this.props.set.loser_score}-{this.props.set.winner_score}</td>
        
        <td className='playerColumn'>
          <Link to={{ pathname: `/player/${this.props.set.winner_name}` }}>
            {this.props.set.winner_name}
          </Link>
        </td>

        <td className='tournamentColumn'>
          <Link to={{ pathname: `/tournament/${this.props.set.tournament_id}` }}>
            {this.props.set.tournament_name}
          </Link>
        </td>
      </tr>;
    }
    
    return (
      <>
        {rowToRender}
      </>
    );
  }
}

SetsRow.propTypes = {
  player: PropTypes.string,
  set: PropTypes.object,
  setsType: PropTypes.string,
};
