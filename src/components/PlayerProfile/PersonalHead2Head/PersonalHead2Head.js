import React from 'react';
import PropTypes from 'prop-types';

import MatchupList from './MatchupList/MatchupList';
import Head2HeadTable from './Head2HeadTable/Head2HeadTable';

export default class PersonalHead2Head extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.allMatchups = this.props.matchupsObject.allMatchups;
    this.state.selectedMatchups = this.props.matchupsObject.mostPlayed;
    this.state.deselectedMatchups = this.props.matchupsObject.lessPlayed;
  }

  sortBySetsPlayed = (matchups) => {
    const orderedMatchups = [];
  
    matchups.sort((a, b) => {
      if (a.setsPlayed === b.setsPlayed && a.setAvg[0] === b.setAvg[0]) {
        return b.gamesPlayed - a.gamesPlayed;
      }
  
      if (a.setsPlayed === b.setsPlayed) {
        return b.setAvg[0] - a.setAvg[0];
      }
  

      return b.setsPlayed - a.setsPlayed;
    })
      .forEach((matchup) => {
        orderedMatchups.push(matchup);
      });

    return orderedMatchups;
  };

  handleSelectMatchup = (event, matchupToSelect) => {
    event.preventDefault();

    const removeFromDeselctedMatchups = this.state.deselectedMatchups.filter((matchup) => {
      return matchup.name !== matchupToSelect.name;
    });

    const addMatchupToSelectedMatchups = [...this.state.selectedMatchups, matchupToSelect];

    const sortBySetsPlayed = this.sortBySetsPlayed(addMatchupToSelectedMatchups);
    
    this.setState({
      deselectedMatchups: removeFromDeselctedMatchups,
      selectedMatchups: sortBySetsPlayed,
    });
  };

  handleDeselectMatchup = (event, matchupToDeselect) => {
    event.preventDefault();

    const removeFromSelectedMatchups = this.state.selectedMatchups.filter((matchup) => {
      return matchup.name !== matchupToDeselect.name;
    });

    const addMatchupToDeselectedMatchups = [...this.state.deselectedMatchups, matchupToDeselect];

    const sortBySetsPlayed = this.sortBySetsPlayed(addMatchupToDeselectedMatchups);

    this.setState({
      deselectedMatchups: sortBySetsPlayed,
      selectedMatchups: removeFromSelectedMatchups,
    });
  };

  render() {
    return (
      <>
        <MatchupList
          deselectedMatchups={this.state.deselectedMatchups}
          handleSelectMatchup={this.handleSelectMatchup}
        />
        <Head2HeadTable
          handleDeselectMatchup={this.handleDeselectMatchup}
          selectedMatchups={this.state.selectedMatchups}
        />
      </>
    );
  }
}

PersonalHead2Head.propTypes = {
  matchupsObject: PropTypes.object,
};
