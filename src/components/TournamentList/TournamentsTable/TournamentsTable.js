import React from 'react';
import PropTypes from 'prop-types';

import TournamentRow from './TournamentRow/TournamentRow';

export default class TournamentsTable extends React.Component {
  render() {
    return (
      <>
        <h3>List of Tournaments</h3>
        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='tournamentNameColumn'>Name</th>
              <th className='tournamentWinnerColumn'>Winner</th>
              <th className='dateColumn'>Date</th>
              <th className='tournamentUrlColumn'>Bracket URL</th>
            </tr>
            {
              this.props.tournamentsObject.tournamentsArray.map((tournament, i) => {
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
      </>
    );
  };
};

TournamentsTable.propTypes = {
  tournamentsObject: PropTypes.object,
};