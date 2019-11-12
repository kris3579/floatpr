import React from 'react';
import PropTypes from 'prop-types';

export default class MatchupList extends React.Component {
  render() {
    return (
      <>
        <ul className='matchupList'>
          <h3>Unselected Matchups</h3>
          {
            this.props.deselectedMatchups.map((matchup, i) => {
              console.log(matchup);
              return (
                <li className='matchupButton' key={i}>
                  <button onClick={(event) => this.props.handleSelectMatchup(event, matchup)}>
                    {matchup.opponent}
                  </button>
                </li>
              );
            })
          }
        </ul>
      </>
    );
  }
}

MatchupList.propTypes = {
  deselectedMatchups: PropTypes.array,
  handleSelectMatchup: PropTypes.func,
};
