import React from 'react';
import PropTypes from 'prop-types';

import PlayersAsyncWrapper from '../AsyncWrappers/PlayersAsyncWrapper/PlayersAsyncWrapper';
import PlayerInfo from './PlayerInfo/PlayerInfo';
import PlayerGraph from './PlayerGraph/PlayerGraph';
import IndividualHead2HeadAsyncWrapper from '../AsyncWrappers/IndividualHead2HeadAsyncWrapper/IndividualHead2HeadAsyncWrapper';
import PersonalHead2Head from './PersonalHead2Head/PersonalHead2Head';
import SetsAsyncWrapper from '../AsyncWrappers/SetsAsyncWrapper/SetsAsyncWrapper';
import SetsTable from '../SetsTable/SetsTable';

export default class PlayerProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataType: 'setsTable',
    };
  }
  
  handleChange = (event) => {
    this.setState({
      dataType: event.target.value,
    });
  };

  render() {
    const { player } = this.props.match.params;

    const setsTable = <SetsAsyncWrapper>
      <SetsTable
        player1={player}
        player2='none'
        setsType='playerSets'
        tournament='none'
      />
    </SetsAsyncWrapper>;

    const personalHead2Head = <IndividualHead2HeadAsyncWrapper
      player={player}
    >
      <PersonalHead2Head/>
    </IndividualHead2HeadAsyncWrapper>;

    const playerGraph = <PlayersAsyncWrapper>
      <PlayerGraph
        playerName={player}
      />
    </PlayersAsyncWrapper>;

    let whichData;

    switch (this.state.dataType) {
      case 'matchupsTable':
        whichData = personalHead2Head;
        break;
      case 'historyGraph':
        whichData = playerGraph;
        break;
      default:
        whichData = setsTable;
    }

    return (
      <>
        <PlayersAsyncWrapper>
          <PlayerInfo
            playerName={player}
          />
        </PlayersAsyncWrapper>

        <form>
          <select value={this.state.dataType} onChange={this.handleChange} required>
            <option value='setsTable'>Sets Table</option>
            <option value='matchupsTable'>Personal Head 2 Head</option>
            <option value='historyGraph'>History Graph</option>
          </select>
        </form>

        {whichData}
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
