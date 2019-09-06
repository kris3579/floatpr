import React from 'react';

import SetsAsyncWrapper from '../AsyncWrappers/SetsAsyncWrapper/SetsAsyncWrapper'
import SetsTable from '../SetsTable/SetsTable';


export default class Head2Head extends React.Component {
  render() {
    const player1 = this.props.match.params.player1;
    const player2 = this.props.match.params.player2;

    return (
      <SetsAsyncWrapper>
        <SetsTable
          player1={player1}
          player2={player2}
          setsType='head2HeadSets'
          tournament='none'
        />
      </SetsAsyncWrapper>
    );
  };
};