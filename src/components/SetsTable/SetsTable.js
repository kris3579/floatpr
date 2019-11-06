import React from 'react';
import PropTypes from 'prop-types';

import SetsRow from './SetsRow/SetsRow';

export default class SetsTable extends React.Component {
  render() {
    let sets;
    let headerRow;
    let player = '';

    switch (this.props.setsType) {
      case 'tournamentSets':
        headerRow = <tr className='headerRow'>
          <th className='roundColumn'>Round</th>
          <th className='playerColumn'>Winner</th>
          <th className='scoreColumn'>Score</th>
          <th className='playerColumn'>Loser</th>
        </tr>;

        sets = this.props.setsArray.filter((set) => {
          return `${set.tournament_id}` === this.props.tournamentId;
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

        player = this.props.player1;

        sets = this.props.setsArray.filter((set) => {
          return set.winner_name === this.props.player1 || set.loser_name === this.props.player1;
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

        sets = this.props.head2HeadObject.setsArray.filter((set) => {
          return (set.winner_name === this.props.player1 && set.loser_name === this.props.player2) 
          || (set.winner_name === this.props.player2 && set.loser_name === this.props.player1);
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
                    setsType={this.props.setsType}
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
