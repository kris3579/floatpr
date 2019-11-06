import React from 'react';

import PlayersAsyncWrapper from '../AsyncWrappers/PlayersAsyncWrapper/PlayersAsyncWrapper';
import RankingTable from './RankingTable/RankingTable';

export default class Rankings extends React.Component {
  render() {
    return (
      <PlayersAsyncWrapper>
        <RankingTable/>
      </PlayersAsyncWrapper>
    );
  }
}
