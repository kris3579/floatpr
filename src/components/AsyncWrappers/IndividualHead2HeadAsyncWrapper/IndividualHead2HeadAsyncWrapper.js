import React from 'react';
import Async from 'react-async';
import PropTypes from 'prop-types';

import { getIndividualHead2HeadData } from '../../../dataRetrievalFunctions/dataRetrievalFunctions';

export default class IndividualHead2HeadAsyncWrapper extends React.Component {
  render() {
    let childrenArray = this.props.children;
    if (Array.isArray(this.props.children) === false) {
      childrenArray = [this.props.children];
    }

    return (
      <Async
        promiseFn={getIndividualHead2HeadData}
        player={this.props.player}
      >
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {(head2HeadData) => (
            <>
            {
              childrenArray.map((child, i) => {
                return (
                  React.cloneElement(child, { matchupsObject: head2HeadData, key: i })
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

IndividualHead2HeadAsyncWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  player: PropTypes.string,
};
