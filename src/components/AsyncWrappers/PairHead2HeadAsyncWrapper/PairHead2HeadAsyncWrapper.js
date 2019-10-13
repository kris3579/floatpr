import React from 'react';
import Async from 'react-async';
import PropTypes from 'prop-types';

import { getPairHead2HeadData } from '../../../dataRetrievalFunctions/dataRetrievalFunctions';

export default class PairHead2HeadAsyncWrapper extends React.Component {
  render() {
    let childrenArray = this.props.children;
    if (Array.isArray(this.props.children) === false) {
      childrenArray = [this.props.children];
    }

    return (
      <Async 
        promiseFn={getPairHead2HeadData}
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
        <Async.Rejected>{(error) => error.message}</Async.Rejected>
      </Async>
    );
  }
}

PairHead2HeadAsyncWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  player1: PropTypes.string,
  player2: PropTypes.string,
};
