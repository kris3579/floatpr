import React from 'react'
import Async from 'react-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import storeData from '../../../actions/dataActions';
import DataRetrievalFunctions from '../../../dataRetrievalFunctions/dataRetrievalFunctions';

class PlayersAsyncWrapper extends React.Component {
  render() {
    const dataRetrievalFunctions = new DataRetrievalFunctions();

    let childrenArray = this.props.children;
    if (Array.isArray(this.props.children) === false) {
      childrenArray = [this.props.children];
    }

    return (
      <Async
        promiseFn={dataRetrievalFunctions.playersData}
        storeDataFunction={this.props.storeData}
        playersObject={this.props.playersObject}
      >
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {playersData => (
            <>
              {
                childrenArray.map((child, i) => {
                  return (
                    React.cloneElement(child, { playersObject: playersData, key: i })
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
    playersObject: state.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};
 
PlayersAsyncWrapper.propTypes = {
  playersObject: PropTypes.object,
  storedata: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersAsyncWrapper);