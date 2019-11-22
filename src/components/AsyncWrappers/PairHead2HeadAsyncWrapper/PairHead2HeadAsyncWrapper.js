import React from 'react';
import Async from 'react-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import storeHead2HeadData from '../../../actions/head2HeadActions';
import { getPairHead2HeadData } from '../../../dataRetrievalFunctions/dataRetrievalFunctions';

class PairHead2HeadAsyncWrapper extends React.Component {
  render() {
    let childrenArray = this.props.children;
    if (Array.isArray(this.props.children) === false) {
      childrenArray = [this.props.children];
    }

    return (
      <Async 
        promiseFn={getPairHead2HeadData}
        storeDataFunction={this.props.storeHead2HeadData}
        pairHead2HeadObject={this.props.pairHead2Head}
        player1={this.props.player1}
        player2={this.props.player2}
      >
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {(head2HeadData) => (
            <>
              {
                childrenArray.map((child, i) => {
                  return (
                    React.cloneElement(child, { head2HeadObject: head2HeadData, key: i })
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
    pairHead2Head: state.head2HeadData.pairHead2Head,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeHead2HeadData: (data, name, head2HeadType) => {
      dispatch(storeHead2HeadData(data, name, head2HeadType));
    },
  };
};

PairHead2HeadAsyncWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  pairHead2Head: PropTypes.object,
  player1: PropTypes.string,
  player2: PropTypes.string,
  storeHead2HeadData: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PairHead2HeadAsyncWrapper);
