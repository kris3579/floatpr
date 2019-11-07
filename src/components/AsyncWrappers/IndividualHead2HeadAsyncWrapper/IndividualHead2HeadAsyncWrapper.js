import React from 'react';
import Async from 'react-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import storeHead2HeadData from '../../../actions/head2HeadActions';
import { getIndividualHead2HeadData } from '../../../dataRetrievalFunctions/dataRetrievalFunctions';

class IndividualHead2HeadAsyncWrapper extends React.Component {
  render() {
    let childrenArray = this.props.children;
    if (Array.isArray(this.props.children) === false) {
      childrenArray = [this.props.children];
    }

    return (
      <Async
        promiseFn={getIndividualHead2HeadData}
        storeDataFunction={this.props.storeHead2HeadData}
        individualHead2HeadObject={this.props.individualHead2Head}
        player={this.props.playerName}
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
        <Async.Rejected>{() => 'Something went wrong'}</Async.Rejected>
      </Async>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    individualHead2Head: state.head2HeadData.individualHead2Head,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeHead2HeadData: (data, name, head2HeadType) => {
      dispatch(storeHead2HeadData(data, name, head2HeadType));
    },
  };
};

IndividualHead2HeadAsyncWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  individualHead2Head: PropTypes.object,
  playerName: PropTypes.string,
  storeHead2HeadData: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualHead2HeadAsyncWrapper);
