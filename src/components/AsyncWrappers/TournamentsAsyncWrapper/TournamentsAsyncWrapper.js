import React from 'react'
import Async from 'react-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import storeData from '../../../actions/dataActions';
import DataRetrievalFunctions from '../../../dataRetrievalFunctions/dataRetrievalFunctions';

class TournamentsAsyncWrapper extends React.Component {
  render() {
    const dataRetrievalFunctions = new DataRetrievalFunctions();

    let childrenArray = this.props.children;
    if (Array.isArray(this.props.children) === false) {
      childrenArray = [this.props.children];
    }
    
    return (
      <Async
        promiseFn={dataRetrievalFunctions.tournamentsData}
        storeDataFunction={this.props.storeData}
        tournamentsObject={this.props.tournamentsObject}
      >
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {tournamentsData => (
            <>
              {
                childrenArray.map((child, i) => {
                  return (
                    React.cloneElement(child, { tournamentsObject: tournamentsData, key: i })
                  )
                })
              }
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};
 
TournamentsAsyncWrapper.propTypes = {
  storedata: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsAsyncWrapper);
