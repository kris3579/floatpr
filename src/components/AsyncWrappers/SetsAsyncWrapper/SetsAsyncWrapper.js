import React from 'react';
import Async from 'react-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import storeData from '../../../actions/dataActions';
import DataRetrievalFunctions from '../../../dataRetrievalFunctions/dataRetrievalFunctions';


class SetsAsyncWrapper extends React.Component {
  render() {
    const dataRetrievalFunctions = new DataRetrievalFunctions();

    let childrenArray = this.props.children;
    if (Array.isArray(this.props.children) === false) {
      childrenArray = [this.props.children];
    }

    return (
      <Async
        promiseFn={dataRetrievalFunctions.setsData}
        storeDataFunction={this.props.storeData}
        setsArray={this.props.setsArray}
      >
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {(setsData) => (
            <>
              {
                childrenArray.map((child, i) => {
                  return (
                    React.cloneElement(child, { setsArray: setsData, key: i })
                  );
                })
              }
            </>
          )}
        </Async.Resolved>
        <Async.Rejected>{(error) => error.message}</Async.Rejected>
      </Async>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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
 
SetsAsyncWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  setsArray: PropTypes.array,
  storeData: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetsAsyncWrapper);
