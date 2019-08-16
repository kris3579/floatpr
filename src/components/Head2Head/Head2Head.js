import React from 'react';
import { connect } from 'react-redux';
import { createInstance } from 'react-async';
import PropTypes from 'prop-types';

import storeData from '../../actions/dataActions';
import getHead2HeadData from '../../dataRetrievalFunctions/getHead2HeadData';
import DataRetrievalFunctions from '../../dataRetrievalFunctions/dataRetrievalFunctions';
import SetsTable from '../SetsTable/SetsTable';


class Head2Head extends React.Component {
  render() {
    const AsyncPlayers = createInstance();
    const AsyncSets = createInstance();

    const dataRetrievalFunctions = new DataRetrievalFunctions();

    const player1 = this.props.match.params.player1;
    const player2 = this.props.match.params.player2;

    let head2HeadData;

    return (
      <AsyncPlayers promiseFn={dataRetrievalFunctions.playersData} storeDataFunction={this.props.storeData} playersObject={this.props.playersObject}>
        <AsyncPlayers.Loading>Loading...</AsyncPlayers.Loading>
        <AsyncPlayers.Resolved>
          {playersData => (
            <>
              <h2>{`${player1} vs ${player2}`}</h2>
              <AsyncSets promiseFn={dataRetrievalFunctions.setsData} storeDataFunction={this.props.storeData} sets={this.props.sets}>
                <AsyncSets.Loading>Loading...</AsyncSets.Loading>
                <AsyncSets.Resolved>
                  {setsData => (
                    <>
                      <SetsTable
                        player1={player1}
                        player2={player2}
                        sets={setsData}
                        setsType='head2HeadSets'
                        tournament='none'
                      />
                    </>
                  )}
                </AsyncSets.Resolved>
                <AsyncSets.Rejected>{error => error.message}</AsyncSets.Rejected>
              </AsyncSets>
            </>
          )}
        </AsyncPlayers.Resolved>
        <AsyncPlayers.Rejected>{error => error.message}</AsyncPlayers.Rejected>
      </AsyncPlayers>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    playersObject: state.players,
    setsArray: state.sets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};

Head2Head.propTypes = {
  playersObject: PropTypes.object,
  setsArray: PropTypes.array,
  storeData: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Head2Head);