import React from 'react';
import PropTypes from 'prop-types';

import TournamentAsyncWrapper from '../AsyncWrappers/TournamentsAsyncWrapper/TournamentsAsyncWrapper';
import TournamentInfo from './TournamentInfo/TournamentInfo';

export default class TournamentProfile extends React.Component {
  render() {
    return (
      <TournamentAsyncWrapper>
        <TournamentInfo
          tournamentId={this.props.match.params.tournamentId}
        />
      </TournamentAsyncWrapper>
    );
  }
}

TournamentProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tournamentId: PropTypes.string,
    }),
  }),
};
