import React from 'react';
import PropTypes from 'prop-types';

import SetsTable from '../../SetsTable/SetsTable';

export default class PairHead2HeadProfile extends React.Component {
  render() {
    if (!this.props.head2HeadObject) {
      return (
        <p>
          Data not found, make sure both players names 
          are spelled correctly (capitolization matters!)
        </p>
      );
    }

    return (
      <>
        <p>{this.props.head2HeadObject.matchupName}</p>
        <p>{this.props.head2HeadObject.player1}</p>
        <p>{this.props.head2HeadObject.player2}</p>
        <p>{`Sets Played: ${this.props.head2HeadObject.setsPlayed}`}</p>
        <p>{`Games Played: ${this.props.head2HeadObject.gamesPlayed}`}</p>
        <p>{`Sets Won: ${this.props.head2HeadObject.setScore[0]}-${this.props.head2HeadObject.setScore[1]}`}</p>
        <p>{`Sets Win Rate: ${this.props.head2HeadObject.setAvg[0]}%-${this.props.head2HeadObject.setAvg[1]}%`}</p>
        <p>{`Games Won: ${this.props.head2HeadObject.gameScore[0]}-${this.props.head2HeadObject.gameScore[1]}`}</p>
        <p>{`Games Win Rate: ${this.props.head2HeadObject.gameAvg[0]}%-${this.props.head2HeadObject.gameAvg[1]}%`}</p>

        <SetsTable
          player1={this.props.player1}
          player2={this.props.player2}
          setsType='pairHead2HeadSets'
          tournamentId='none'
        />
      </>
    );
  }
}

PairHead2HeadProfile.propTypes = {
  head2HeadObject: PropTypes.object,
  player1: PropTypes.string,
  player2: PropTypes.string,
};
