import React from 'react';

import PlayersAsyncWrapper from '../AsyncWrappers/PlayersAsyncWrapper/PlayersAsyncWrapper';
import SetsAsyncWrapper from '../AsyncWrappers/SetsAsyncWrapper/SetsAsyncWrapper';
import PlayerInfo from './PlayerInfo/PlayerInfo';
import PlayerMatchupState from './PlayerMatchupState/PlayerMatchupState';
import SetsTable from '../SetsTable/SetsTable';

export default class PlayerProfile extends React.Component {
  render() {
    const player = this.props.match.params.playerName;

    return (
      <>
        <PlayersAsyncWrapper>
          <PlayerInfo
            playerName={player}
          />
        </PlayersAsyncWrapper>

        <SetsAsyncWrapper>
          <PlayerMatchupState
            playerName={player}
          />

          <SetsTable
            player1={player}
            player2='none'
            setsType='playerSets'
            tournament='none'
          />
        </SetsAsyncWrapper>
      </>
    );
  };
};