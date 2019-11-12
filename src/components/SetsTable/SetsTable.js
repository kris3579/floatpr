import React from 'react';
import PropTypes from 'prop-types';

import SetsRow from './SetsRow/SetsRow';

export default class SetsTable extends React.Component {
  render() {
    const { 
      setsType,
      setsArray,
      tournamentId,
      player1,
      player2,
      head2HeadObject,
    } = this.props;

    let sets;
    let headerRow;
    let player = '';

    const player1Name = player1 ? player1.match(/\b[^|]+$/) : null;
    const player2Name = player2 ? player2.match(/\b[^|]+$/) : null;

    switch (setsType) {
      case 'tournamentSets':
        headerRow = <tr className='headerRow'>
          <th className='tsRoundColumn'>Round</th>
          <th className='tsPlayerColumn'>Winner</th>
          <th className='tsScoreColumn'>Score</th>
          <th className='tsPlayerColumn'>Loser</th>
        </tr>;

        sets = setsArray.filter((set) => {
          return `${set.tournament_id}` === tournamentId;
        });
        break;
      case 'playerSets':
        headerRow = <tr className='headerRow'>
          <th className='roundColumn'>Round</th>
          <th className='playerColumn'>Player</th>
          <th className='scoreColumn'>Score</th>
          <th className='playerColumn'>Opponent</th>
          <th className='tournamentColumn'>tournament</th>
        </tr>;

        player = player1;

        sets = setsArray.filter((set) => {
          return set.winner_name === player1 || set.loser_name === player1;
        });
        break;
      case 'pairHead2HeadSets':
        headerRow = <tr className='headerRow'>
          <th className='roundColumn'>Round</th>
          <th className='playerColumn'>Winner</th>
          <th className='scoreColumn'>Score</th>
          <th className='playerColumn'>Loser</th>
          <th className='tournamentColumn'>tournament</th>
        </tr>;

        sets = head2HeadObject.setsArray.filter((set) => {
          return (set.winner_name === player1Name[0] && set.loser_name === player2Name[0]) 
          || (set.winner_name === player2Name[0] && set.loser_name === player1Name[0]);
        });
        break;
      default:
        sets = [];
    }

    return (
      <div>
        <table>
          <tbody>
            {headerRow}
            {
              sets.map((set, i) => {
                return (
                  <SetsRow
                    key={i}
                    set={set}
                    setsType={setsType}
                    player={player}
                  />
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

SetsTable.propTypes = {
  head2HeadObject: PropTypes.object,
  player1: PropTypes.string,
  player2: PropTypes.string,
  setsArray: PropTypes.array,
  setsType: PropTypes.string,
  tournamentId: PropTypes.string,
};
