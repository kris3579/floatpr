import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TournamentRow from '../TournamentRow/TournamentRow';

import './TournamentList.scss';

export default class TournamentList extends React.Component {
  render() {
    return (
      <div>
        <h2>Tournament List</h2>
        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='tournamentNameColumn'>Name</th>
              <th className='winnerColumn'>Winner</th>
              <th className='dateColumn'>Date</th>
              <th className='urlColumn'>Bracket URL</th>
            </tr>
            {
              this.props.tournaments.map((tournament, i) => {
                return (
                  <TournamentRow
                    tournament={tournament}
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

const mapStateToProps = (state) => {
  return {
    tournaments: state.tournaments,
  };
};

TournamentList.propTypes = {
  tournaments: PropTypes.array,
};

connect(mapStateToProps, null);