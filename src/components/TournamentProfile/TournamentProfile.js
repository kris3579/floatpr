import React from 'react';
import { connect } from 'react-redux';
import Async from 'react-async';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import storeData from '../../actions/dataActions';
import DataRetrievalFunctions from '../../dataRetrievalFunctions/dataRetrievalFunctions';
import SetsTable from '../SetsTable/SetsTable';

class TournamentProfile extends React.Component {
  render() {
    const dataRetrievalFunctions = new DataRetrievalFunctions();

    return (
      <Async promiseFn={dataRetrievalFunctions.tournamentsData} storeDataFunction={this.props.storeData} tournamentObject={this.props.tournamentObject}>
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {tournamentsData => (
            <>
              <h2>{tournamentsData[this.props.match.params.tournamentId].name}</h2>
              <p>{tournamentsData[this.props.match.params.tournamentId].url}</p>
              <p>{tournamentsData[this.props.match.params.tournamentId].date}</p>
      
              <h4>Results</h4>
              <ul>
                {
                  Object.keys(JSON.parse(tournamentsData[this.props.match.params.tournamentId].placements)).map((placement, i) => {
                    return (
                      <li key={i}><strong>{`${placement}:`}</strong>
                        {
                          tournamentsData[this.props.params.tournamentId].placements[placement].map((player, i) => {
                            return (
                              <Link to={{pathname: `/player/${player}`}} key={i}>{player}, </Link>
                            )
                          })
                        }
                      </li>
                    )
                  })
                }
              </ul>
      
              <h4>Sets</h4>
              <SetsTable
                playerA='none'
                playerB='none'
                setsType='tournamentSets'
                tournament={tournamentsData[this.props.match.params.tournamentId].name}
              />
            </>
          )}
        </Async.Resolved>
        <Async.Rejected>{error => error.message}</Async.Rejected>
      </Async>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    tournamentsObject: state.tournaments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};

TournamentProfile.propTypes = {
  tournamentsObject: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentProfile);