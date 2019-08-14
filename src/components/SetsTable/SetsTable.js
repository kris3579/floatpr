import React from 'react';
import PropTypes from 'prop-types';

import SetsRow from './SetsRow/SetsRow';

export default class SetsTable extends React.Component {
  render() {
    let sets;

    if (this.props.sets) {
      switch(this.props.setsType) {
        case 'tournamentSets':
          sets = this.props.sets.filter((set) => {
            return set.tournament_name === this.props.tournament;
          });
          break;
        case 'playerSets':
          sets = this.props.sets.filter((set) => {
            return set.winner_name === this.props.playerA || set.loser_name === this.props.playerA;
          });
          break;
        case 'head2HeadSets':
          sets = this.props.sets.filter((set) => {
            return (set.winner_name === this.props.playerA && set.loser_name === this.props.playerB) || (set.winner_name === this.props.playerB && set.loser_name === this.props.playerA);
          });
          break;
        default:
          sets = [];
      };
    }

    return (
      <div>
        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='roundColumn'>Round</th>
              <th className='winnerColumn'>Winner</th>
              <th className='loserColumn'>Loser</th>
              <th className='scoreColumn'>Score</th>
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
  playerA: PropTypes.string,
  playerB: PropTypes.string,
  sets: PropTypes.array,
  setsType: PropTypes.string,
  tournament: PropTypes.string,
};