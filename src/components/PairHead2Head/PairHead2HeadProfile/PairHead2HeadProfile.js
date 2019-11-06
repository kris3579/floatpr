import React from 'react';
import PropTypes from 'prop-types';

export default class PairHead2HeadProfile extends React.Component {
  render() {
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
      </>
    );
  }
}

PairHead2HeadProfile.propTypes = {
  head2HeadObject: PropTypes.object,
};
