import React from 'react';
import PropTypes from 'prop-types';

import PairHead2HeadAsyncWrapper from '../AsyncWrappers/PairHead2HeadAsyncWrapper/PairHead2HeadAsyncWrapper';
import PairHead2HeadProfile from './PairHead2HeadProfile/PairHead2HeadProfile';


export default class PairHead2Head extends React.Component {
  render() {
    const { player1, player2 } = this.props.match.params;

    return (
      <PairHead2HeadAsyncWrapper
        player1={player1}
        player2={player2}
      >
        <PairHead2HeadProfile
          player1={player1}
          player2={player2}
        />
      </PairHead2HeadAsyncWrapper>
    );
  }
}

PairHead2Head.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      player1: PropTypes.string,
      player2: PropTypes.string,
    }),
  }),
};
