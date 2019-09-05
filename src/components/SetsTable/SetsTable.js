import React from 'react';
import PropTypes from 'prop-types';

import SetsRow from './SetsRow/SetsRow';

export default class SetsTable extends React.Component {
  render() {
    let sets;

    switch(this.props.setsType) {
      case 'tournamentSets':
        sets = this.props.setsArray.filter((set) => {
          return `${set.tournament_id}` === this.props.tournamentId;
        });
        break;
      case 'playerSets':
        sets = this.props.setsArray.filter((set) => {
          return set.winner_name === this.props.player1 || set.loser_name === this.props.player1;
        });
        break;
      case 'head2HeadSets':
        sets = this.props.setsArray.filter((set) => {
          return (set.winner_name === this.props.player1 && set.loser_name === this.props.player2) || (set.winner_name === this.props.player2 && set.loser_name === this.props.player1);
        });
        break;
      default:
        sets = [];
    };

    return (
      <div>
        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='roundColumn'>Round</th>
              <th className='playerColumn'>Winner</th>
              <th className='scoreColumn'>Score</th>
              <th className='playerColumn'>Loser</th>
              <th className='tournamentColumn'>tournament</th>
            </tr>
            {
              sets.map((set, i) => {
                return (
                  <SetsRow
                    set={set}
                    key={i}
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  };
};

SetsTable.propTypes = {
  player1: PropTypes.string,
  player2: PropTypes.string,
  setsArray: PropTypes.array,
  setsType: PropTypes.string,
  tournamentId: PropTypes.string,
};