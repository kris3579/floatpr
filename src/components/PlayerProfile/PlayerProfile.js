import React from 'react';
import PropTypes from 'prop-types';

import IndividualHead2HeadAsyncWrapper from '../AsyncWrappers/IndividualHead2HeadAsyncWrapper/IndividualHead2HeadAsyncWrapper';
import PlayersAsyncWrapper from '../AsyncWrappers/PlayersAsyncWrapper/PlayersAsyncWrapper';
import SetsAsyncWrapper from '../AsyncWrappers/SetsAsyncWrapper/SetsAsyncWrapper';
import PlayerInfo from './PlayerInfo/PlayerInfo';
import PersonalHead2Head from './PersonalHead2Head/PersonalHead2Head';
import SetsTable from '../SetsTable/SetsTable';

export default class PlayerProfile extends React.Component {
  render() {
    const { player } = this.props.match.params;

    return (
      <>
        <PlayersAsyncWrapper>
          <PlayerInfo
            playerName={player}
          />
        </PlayersAsyncWrapper>

        <IndividualHead2HeadAsyncWrapper
          player={player}
        >
          <PersonalHead2Head/>
        </IndividualHead2HeadAsyncWrapper>

        <SetsAsyncWrapper>
          <SetsTable
            player1={player}
            player2='none'
            setsType='playerSets'
            tournament='none'
          />
        </SetsAsyncWrapper>
      </>
    );
  }
}

PlayerProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      player: PropTypes.string,
    }),
  }),
};
