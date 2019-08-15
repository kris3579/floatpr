import React from 'react';
import { connect } from 'react-redux';
import Async from 'react-async';
import PropTypes from 'prop-types';

import DataRetrievalFunctions from '../../dataRetrievalFunctions/dataRetrievalFunctions';
import storeData from '../../actions/dataActions';
import TournamentRow from './TournamentRow/TournamentRow';

import './TournamentList.scss';

class TournamentList extends React.Component {
  render() {
    const dataRetrievalFunctions = new DataRetrievalFunctions();

    return (
      <Async promiseFn={dataRetrievalFunctions.tournamentsData} storeDataFunction={this.props.storeData} playersObject={this.props.tournaments}>
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {tournamentsData => (
            <table>
              <tbody>
                <tr className='headerRow'>
                  <th className='tournamentNameColumn'>Name</th>
                  <th className='winnerColumn'>Winner</th>
                  <th className='dateColumn'>Date</th>
                  <th className='urlColumn'>Bracket URL</th>
                </tr>
                {
                  tournamentsData.map((tournament, i) => {
                    return (
                      <TournamentRow
                        tournament={tournament}
                        key={i}
                      />
                    )
                  })
                }
              </tbody>
            </table>
          )}
        </Async.Resolved>
        <Async.Rejected>{error => error.message}</Async.Rejected>
      </Async>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    tournaments: state.tournaments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};

TournamentList.propTypes = {
  tournaments: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentList);