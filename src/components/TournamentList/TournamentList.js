import React from 'react';

import TournamentAsyncWrapper from '../AsyncWrappers/TournamentsAsyncWrapper/TournamentsAsyncWrapper';
import TournametsTable from './TournamentsTable/TournamentsTable';

export default class TournamentList extends React.Component {
  render() {
    return (
      <TournamentAsyncWrapper>
        <TournametsTable/>
      </TournamentAsyncWrapper>
    );
  }
}
