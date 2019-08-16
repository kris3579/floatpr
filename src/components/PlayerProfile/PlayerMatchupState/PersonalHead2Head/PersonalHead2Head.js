import React from 'react';
import PropTypes from 'prop-types';

import MatchupList from './MatchupList/MatchupList';
import Head2HeadTable from './Head2HeadTable/Head2HeadTable';

export default class PersonalHead2Head extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.allMatchups = this.props.allMatchups;
    this.state.deselectedMatchups = this.props.deselectedMatchups;
    this.state.selectedMatchups = this.props.selectedMatchups;
  };

  handleSelectMatchup = (event, matchupToSelect) => {
    event.preventDefault();

    const removeFromDeselctedMatchups = this.state.deselectedMatchups.filter((matchup) => {
      return matchup.name !== matchupToSelect.name;
    });

    const addMatchupToSelectedMatchups = [...this.state.selectedMatchups, matchupToSelect];

    const sortBySetsPlayed = this.props.sortBySetsPlayed(addMatchupToSelectedMatchups);
    
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

    const sortBySetsPlayed = this.props.sortBySetsPlayed(addMatchupToDeselectedMatchups);

    this.setState({
      deselectedMatchups: sortBySetsPlayed,
      selectedMatchups: removeFromSelectedMatchups
    });
  };

  render() {
    console.log(this.state);
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
  };
};

PersonalHead2Head.propTypes = {
  allMatchups: PropTypes.object,
  deselectedMatchups: PropTypes.array,
  selectedMathcups: PropTypes.array,
  sortBySetsPlayed: PropTypes.func,
};