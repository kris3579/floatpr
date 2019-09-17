import React from 'react';
import Async from 'react-async';
import PropTypes from 'prop-types';

import DataRetrievalFunctions from '../../../dataRetrievalFunctions/dataRetrievalFunctions';

export default class IndividualHead2HeadAsyncWrapper extends React.Component {
  render() {
    const dataRetrievalFunctions = new DataRetrievalFunctions();

    let childrenArray = this.props.children;
    if(Array.isArray(this.props.children) === false) {
      childrenArray = [this.props.children];
    }

    return (
      <Async
        promiseFn={dataRetrievalFunctions.individualHead2HeadData}
        player={this.props.player}
      >
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {head2HeadData => (
            <>
            {
              childrenArray.map((child, i) => {
                return (
                  React.cloneElement(child, { matchupsObject: head2HeadData, key: i })
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

IndividualHead2HeadAsyncWrapper.propTypes = {
  player: PropTypes.string,
}