import React from 'react';

import PairHead2HeadAsyncWrapper from '../AsyncWrappers/PairHead2HeadAsyncWrapper/PairHead2HeadAsyncWrapper'
import PairHead2HeadProfile from './PairHead2HeadProfile/PairHead2HeadProfile';
import SetsTable from '../SetsTable/SetsTable';


export default class PairHead2Head extends React.Component {
  render() {
    const player1 = this.props.match.params.player1;
    const player2 = this.props.match.params.player2;

    return (
      <PairHead2HeadAsyncWrapper
        player1={player1}
        player2={player2}
      >
        <PairHead2HeadProfile/>

        <SetsTable
          player1={player1}
          player2={player2}
          setsType='pairHead2HeadSets'
          tournamentId='none'
        />
      </PairHead2HeadAsyncWrapper>
    );
  };
};