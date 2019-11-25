import React from 'react';
import PropTypes from 'prop-types';

export default class MatchupList extends React.Component {
  render() {
    const matchupList = this.props.deselectedMatchups.length > 0
      ? <div className='matchupList'>
        <h3 className='aboutH3'>Unselected Matchups</h3>
        <ul>
          {
            this.props.deselectedMatchups.map((matchup, i) => {
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
      </div> : null;

    return (
      <>
        {matchupList}
      </>
    );
  }
}

MatchupList.propTypes = {
  deselectedMatchups: PropTypes.array,
  handleSelectMatchup: PropTypes.func,
};
