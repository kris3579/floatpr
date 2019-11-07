import React from 'react';
import Async from 'react-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import storeData from '../../../actions/dataActions';
import { getTournamentsData } from '../../../dataRetrievalFunctions/dataRetrievalFunctions';

class TournamentsAsyncWrapper extends React.Component {
  render() {
    let childrenArray = this.props.children;
    if (Array.isArray(this.props.children) === false) {
      childrenArray = [this.props.children];
    }
    
    return (
      <Async
        promiseFn={getTournamentsData}
        storeDataFunction={this.props.storeData}
        tournamentsObject={this.props.tournamentsObject}
      >
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {(tournamentsData) => (
            <>
              {
                childrenArray.map((child, i) => {
                  return (
                    React.cloneElement(child, { tournamentsObject: tournamentsData, key: i })
                  );
                })
              }
            </>
          )}
        </Async.Resolved>
        <Async.Rejected>{() => 'Something went wrong'}</Async.Rejected>
      </Async>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tournamentsObject: state.data.tournaments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};
 
TournamentsAsyncWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  storeData: PropTypes.func,
  tournamentsObject: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsAsyncWrapper);
