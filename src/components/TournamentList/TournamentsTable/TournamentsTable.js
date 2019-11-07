import React from 'react';
import PropTypes from 'prop-types';

import TournamentRow from './TournamentRow/TournamentRow';
import PaginationUl from '../../PaginationUl/PaginationUl';

export default class TournamentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPagination: 1,
    };
  }

  handleIncreasePagination = (e) => {
    e.preventDefault();
    const oldPagination = this.state.currentPagination;
    this.setState({
      currentPagination: oldPagination + 1,
    });
  };

  handleDecreasePagination = (e) => {
    e.preventDefault();
    const oldPagination = this.state.currentPagination;
    this.setState({
      currentPagination: oldPagination - 1,
    });
  };

  handleSelectPagination = (e, newPagination) => {
    e.preventDefault();
    this.setState({
      currentPagination: newPagination,
    });
  };

  render() {
    const { tournamentsObject } = this.props;
    const { currentPagination } = this.state;
    const numberOfTournaments = tournamentsObject.tournamentsArray.length;
    const maxPaginations = Math.floor(numberOfTournaments / 50) + 1;

    return (
      <>
        <h3 className='tournamentsListHeader'>Tournaments in database: {numberOfTournaments}</h3>
        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='tournamentNameColumn'>Name</th>
              <th className='dateColumn'>Date</th>
              <th className='entrantsColumn'>Entrants</th>
              <th className='tournamentWinnerColumn'>Winner</th>
              <th className='tournamentUrlColumn'>Bracket Link</th>
            </tr>
            {
              tournamentsObject.tournamentsArray.map((tournament, i) => {
                return (
                  <TournamentRow
                  tournament={tournament}
                  key={i}
                  />
                );
              })
              }
          </tbody>
        </table>

        <PaginationUl
          currentPagination={currentPagination}
          handleDecreasePagination={this.handleDecreasePagination}
          handleIncreasePagination={this.handleIncreasePagination}
          handleSelectPagination={this.handleSelectPagination}
          maxPaginations={maxPaginations}
        />
      </>
    );
  }
}

TournamentsTable.propTypes = {
  tournamentsObject: PropTypes.object,
};
