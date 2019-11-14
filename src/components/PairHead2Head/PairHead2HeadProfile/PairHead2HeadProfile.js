import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

import SetsTable from '../../SetsTable/SetsTable';

export default class PairHead2HeadProfile extends React.Component {
  render() {
    const { head2HeadObject } = this.props;

    if (!head2HeadObject) {
      return (
        <p>
          Data not found, make sure both players names 
          are spelled correctly (capitolization matters!)
        </p>
      );
    }

    const desktopStatistics = <div>
      <div className='pairH2HDiv'>
          <h3><Link to={{ pathname: `/player/${this.props.player1}` }}>{head2HeadObject.player1}</Link></h3>

          <p>
            <strong>Sets Won:</strong> {head2HeadObject.setScore[0]}<br/>
            <strong>Sets Win Rate:</strong> {head2HeadObject.setAvg[0]}%<br/>
            <strong>Games Won:</strong> {head2HeadObject.gameScore[0]}<br/>
            <strong>Games Win Rate:</strong> {head2HeadObject.gameAvg[0]}%
          </p>
        </div>

        <div className='pairH2HDiv'>
          <p>
            <strong>Sets Played:</strong> {head2HeadObject.setsPlayed}<br/>
            <strong>Games Played:</strong> {head2HeadObject.gamesPlayed}
          </p>
        </div>

        <div className='pairH2HDiv'>
          <h3><Link to={{ pathname: `/player/${this.props.player2}` }}>{head2HeadObject.player2}</Link></h3>

          <p>
            <strong>Sets Won:</strong> {head2HeadObject.setScore[1]}<br/>
            <strong>Sets Win Rate:</strong> {head2HeadObject.setAvg[1]}%<br/>
            <strong>Games Won:</strong> {head2HeadObject.gameScore[1]}<br/>
            <strong>Games Win Rate:</strong> {head2HeadObject.gameAvg[1]}%
          </p>
        </div>
    </div>;

    const mobileStatistics = <p className='mobilePairStatistics'>
      <h3><Link to={{ pathname: `/player/${this.props.player1}` }}>{head2HeadObject.player1}</Link></h3>
      <strong>Sets Won:</strong> {head2HeadObject.setScore[0]}<br/>
      <strong>Sets Win Rate:</strong> {head2HeadObject.setAvg[0]}%<br/>
      <strong>Games Won:</strong> {head2HeadObject.gameScore[0]}<br/>
      <strong>Games Win Rate:</strong> {head2HeadObject.gameAvg[0]}%<br/>
      <br/>
      <h3><Link to={{ pathname: `/player/${this.props.player2}` }}>{head2HeadObject.player2}</Link></h3>
      <strong>Sets Won:</strong> {head2HeadObject.setScore[1]}<br/>
      <strong>Sets Win Rate:</strong> {head2HeadObject.setAvg[1]}%<br/>
      <strong>Games Won:</strong> {head2HeadObject.gameScore[1]}<br/>
      <strong>Games Win Rate:</strong> {head2HeadObject.gameAvg[1]}%<br/>
      <br/>
      <strong>Sets Played:</strong> {head2HeadObject.setsPlayed}<br/>
      <strong>Games Played:</strong> {head2HeadObject.gamesPlayed}<br/>
    </p>;

    return (
      <>
        <MediaQuery maxDeviceWidth={480}>
          {(matches) => {
            return matches ? mobileStatistics : desktopStatistics;
          }}
        </MediaQuery>
        
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
