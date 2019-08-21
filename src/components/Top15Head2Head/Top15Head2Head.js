import React from 'react';
import PropTypes from 'prop-types';

import PlayersAndSetsAsyncWrapper from '../AsyncWrappers/SetsAsyncWrapper/SetsAsyncWrapper';
import Top15Table from './Top15Table/Top15Table';

export default class Top15Head2Head extends React.Component {
  getHead2Head = (player1, player2, setsArray) => {
    let player1Wins = 0;
    let player2Wins = 0;

    setsArray.forEach((set) => {
      if (set.winner_name === player1.name && set.loser_name === player2.name) {
        player1Wins += 1;
      }
      if (set.winner_name === player2.name && set.loser_name === player1.name) {
        player2Wins += 1;
      }
    });

    const score = `${player1Wins}-${player2Wins}`;
    return score;
  };

  render() {
    return (
      <PlayersAndSetsAsyncWrapper>
        <Top15Table/>
      </PlayersAndSetsAsyncWrapper>
    );
  };
};

Top15Head2Head.propTypes = {
  playersObject: PropTypes.object,
  setsArray: PropTypes.array,
};