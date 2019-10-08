import React from 'react';
import Async from 'react-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import storeData from '../../../actions/dataActions';
import DataRetrievalFunctions from '../../../dataRetrievalFunctions/dataRetrievalFunctions';

class TopPlayerHead2HeadAsyncWrapper extends React.Component {
  render() {
    const dataRetrievalFunctions = new DataRetrievalFunctions();

    let childrenArray = this.props.children;
    if (Array.isArray(this.props.children) === false) {
      childrenArray = [this.props.children];
    }

    return (
      <Async
        promiseFn={dataRetrievalFunctions.topPlayerHead2HeadData}
        storeDataFunction={this.props.storeData}
        topPlayerHead2HeadObject={this.props.topPlayerHead2HeadObject}
      >
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {(head2HeadData) => (
            <>
              {
                childrenArray.map((child, i) => {
                  return (
                    React.cloneElement(child, { topPlayerHead2HeadObject: head2HeadData, key: i })
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
    topPlayerHead2HeadObject: state.topPlayerHead2Head,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};

TopPlayerHead2HeadAsyncWrapper.propTypes = {
  storeData: PropTypes.func,
  topPlayerHead2HeadObject: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopPlayerHead2HeadAsyncWrapper);
