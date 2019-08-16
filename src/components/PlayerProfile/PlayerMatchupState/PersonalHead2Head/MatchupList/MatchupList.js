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
                <li key={i}><button onClick={(event) => this.props.handleSelectMatchup(event, matchup)}>{matchup.opponent}</button></li>
              );
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