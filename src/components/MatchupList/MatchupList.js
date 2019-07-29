import React from 'react';
import PropTypes from 'prop-types';

export default class MatchupList extends React.Component {
  render() {
    return (
      <>
        <ul>
          {
            this.props.deselectedMatchups.map((matchup, i) => {
              return (
                <li key={i} onClick={this.props.handleSelectMatchup(matchup)}>{matchup.opponent}</li>
              )
            })
          }
        </ul>
      </>
    );
  };
};

MatchupList.propTypes = {
  deselectedMatchups: PropTypes.array,
  handleSelectMatchup: PropTypes.func,
};