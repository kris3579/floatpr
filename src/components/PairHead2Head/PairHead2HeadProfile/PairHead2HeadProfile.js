import React from 'react';
import PropTypes from 'prop-types';

import SetsTable from '../../SetsTable/SetsTable';

export default class PairHead2HeadProfile extends React.Component {
  render() {
    const { head2HeadObject } = this.props;
    console.log(head2HeadObject);

    if (!head2HeadObject) {
      return (
        <p>
          Data not found, make sure both players names 
          are spelled correctly (capitolization matters!)
        </p>
      );
    }

    return (
      <>
        <p>{head2HeadObject.matchupName}</p>
        <p>{head2HeadObject.player1}</p>
        <p>{head2HeadObject.player2}</p>
        <p>{`Sets Played: ${head2HeadObject.setsPlayed}`}</p>
        <p>{`Games Played: ${head2HeadObject.gamesPlayed}`}</p>
        <p>{`Sets Won: ${head2HeadObject.setScore[0]}-${head2HeadObject.setScore[1]}`}</p>
        <p>{`Sets Win Rate: ${head2HeadObject.setAvg[0]}%-${head2HeadObject.setAvg[1]}%`}</p>
        <p>{`Games Won: ${head2HeadObject.gameScore[0]}-${head2HeadObject.gameScore[1]}`}</p>
        <p>{`Games Win Rate: ${head2HeadObject.gameAvg[0]}%-${head2HeadObject.gameAvg[1]}%`}</p>

        <SetsTable
          head2HeadObject={head2HeadObject}
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
