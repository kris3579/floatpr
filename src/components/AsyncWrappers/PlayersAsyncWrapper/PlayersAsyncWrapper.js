import React from 'react';
import Async from 'react-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import storeData from '../../../actions/dataActions';
import { getPlayersData } from '../../../dataRetrievalFunctions/dataRetrievalFunctions';

class PlayersAsyncWrapper extends React.Component {
  render() {
    let childrenArray = this.props.children;
    if (Array.isArray(this.props.children) === false) {
      childrenArray = [this.props.children];
    }

    return (
      <Async
        promiseFn={getPlayersData}
        storeDataFunction={this.props.storeData}
        playersObject={this.props.playersObject}
      >
        <Async.Loading>Loading...</Async.Loading>
        <Async.Resolved>
          {(playersData) => (
            <>
              {
                childrenArray.map((child, i) => {
                  if (i === 0) {
                    return (
                      React.cloneElement(child, { playersObject: playersData, key: i })
                    );
                  }
                  return (
                    React.cloneElement(child, { key: i })
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
    playersObject: state.data.players,
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
  children: PropTypes.node.isRequired,
  playersObject: PropTypes.object,
  storeData: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersAsyncWrapper);
