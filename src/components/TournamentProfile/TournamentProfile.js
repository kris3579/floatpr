import React from 'react';

import SetsAsyncWrapper from '../AsyncWrappers/SetsAsyncWrapper/SetsAsyncWrapper';
import TournamentAsyncWrapper from '../AsyncWrappers/TournamentsAsyncWrapper/TournamentsAsyncWrapper';
import TournamentInfo from './TournamentInfo/TournamentInfo';
import SetsTable from '../SetsTable/SetsTable';

export default class TournamentProfile extends React.Component {
  render() {
    return (
      <TournamentAsyncWrapper>
        <TournamentInfo
          tournamentId={this.props.match.params.tournamentId}
        />

        <SetsAsyncWrapper>
          <SetsTable
            playerA='none'
            playerB='none'
            setsType='tournamentSets'
            tournamentId={this.props.match.params.tournamentId}
          />
        </SetsAsyncWrapper>
      </TournamentAsyncWrapper>
    );
  };
};