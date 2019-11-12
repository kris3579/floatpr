import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SetsRow extends React.Component {
  render() {
    const { set, setsType, player } = this.props;

    const winnerName = set.winner_sponser === '' ? set.winner_name : `${set.winner_sponser} | ${set.winner_name}`;
    const loserName = set.loser_sponser === '' ? set.loser_name : `${set.loser_sponser} | ${set.loser_name}`;
    console.log(winnerName, loserName);
    let rowToRender = <tr>
      <td className='roundColumn'>{set.round}</td>

      <td className='playerColumn'>
        <Link to={{ pathname: `/player/${set.winner_name}` }}>
          {winnerName}
        </Link>
      </td>

      <td className='scoreColumn'>{set.winner_score}-{set.loser_score}</td>
      
      <td className='playerColumn'>
        <Link to={{ pathname: `/player/${set.loser_name}` }}>
          {loserName}
        </Link>
      </td>

      <td className='tournamentColumn'>
        <Link to={{ pathname: `/tournament/${set.tournament_id}` }}>
          {set.tournament_name}
        </Link>
      </td>
    </tr>;

    if (setsType === 'tournamentSets') {
      rowToRender = <tr>
      <td className='tsRoundColumn'>{set.round}</td>

      <td className='tsPlayerColumn'>
        <Link to={{ pathname: `/player/${set.winner_name}` }}>
          {winnerName}
        </Link>
      </td>

      <td className='tsScoreColumn'>{set.winner_score}-{set.loser_score}</td>
      
      <td className='tsPlayerColumn'>
        <Link to={{ pathname: `/player/${set.loser_name}` }}>
          {loserName}
        </Link>
      </td>
    </tr>;
    }
    
    if (setsType === 'playerSets' && player === set.winner_name) {
      rowToRender = <tr>
        <td className='roundColumn'><span className='greenText'>{set.round}</span></td>

        <td className='playerColumn'>
          <Link to={{ pathname: `/player/${set.winner_name}` }}>
            {winnerName}
          </Link>
        </td>

        <td className='scoreColumn'>{set.winner_score}-{set.loser_score}</td>
        
        <td className='playerColumn'>
          <Link to={{ pathname: `/player/${set.loser_name}` }}>
            {loserName}
          </Link>
        </td>

        <td className='tournamentColumn'>
          <Link to={{ pathname: `/tournament/${set.tournament_id}` }}>
            {set.tournament_name}
          </Link>
        </td>
      </tr>;
    }

    if (setsType === 'playerSets' && player === set.loser_name) {
      rowToRender = <tr>
        <td className='roundColumn'><span className='redText'>{set.round}</span></td>

        <td className='playerColumn'>
          <Link to={{ pathname: `/player/${set.loser_name}` }}>
            {loserName}
          </Link>
        </td>

        <td className='scoreColumn'>{set.loser_score}-{set.winner_score}</td>
        
        <td className='playerColumn'>
          <Link to={{ pathname: `/player/${set.winner_name}` }}>
            {winnerName}
          </Link>
        </td>

        <td className='tournamentColumn'>
          <Link to={{ pathname: `/tournament/${set.tournament_id}` }}>
            {set.tournament_name}
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
