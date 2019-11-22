import React from 'react';
import PropTypes from 'prop-types';

import PlayersAsyncWrapper from '../AsyncWrappers/PlayersAsyncWrapper/PlayersAsyncWrapper';
import PlayerInfo from './PlayerInfo/PlayerInfo';

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
