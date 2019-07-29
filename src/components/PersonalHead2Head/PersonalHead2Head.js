import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MatchupList from '../MatchupList/MatchupList';
import Head2HeadTable from '../Head2HeadTable/Head2HeadTable';

class PersonalHead2Head extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.allMatchups = {};
    this.state.deselectedMatchups = [];
    this.state.selectedMatchups = [];
  };

  componentDidMount() {
    const allMatchups = {};

    if (this.props.sets) {
      console.log('here');
      this.props.sets.forEach((set) => {
        if (set.winner_name === this.props.player.name) {
          const matchupName = `${this.props.player.name} vs ${set.loser_name}`;

          if (!this.state.allMatchups.hasOwnProperty(matchupName)) {
            allMatchups[matchupName] = {
              name: <span><Link to={{pathname: `/player/${this.props.player.name}`}}>{this.props.player.name}</Link> vs <Link to={{pathname: `/player/${set.loser_name}`}}>{set.loser_name}</Link></span>,
              opponent: set.loser_name,
              setsPlayed: 1,
              setScore: [1, 0],
              setPercentages: ['100%', '0%'],
              gameScore: [set.winner_score, set.loser_score],
              gamePercentages: this.calculateWinRates(set.winner_score, set.loser_score),
            };
          } 
          
          else {
            allMatchups[matchupName].setsPlayed += 1;
            allMatchups[matchupName].setScore[0] += 1;
            allMatchups[matchupName].setPercentages = this.calculateWinRates(allMatchups[matchupName].setScore[0], allMatchups[matchupName.setScore[1]]);
            allMatchups[matchupName].gameScore[0] += set.winner_score;
            allMatchups[matchupName].gameScore[1] += set.loser_score;
            allMatchups[matchupName].gamePercentages = this.calculateWinRates(allMatchups[matchupName].gameScore[0], allMatchups[matchupName].gameScore[1]);
          }
        }

        if (set.loser_name === this.props.player.name) {
          const matchupName = `${this.props.player.name} vs ${set.winner_name}`;

          if (!this.state.allMatchups.hasOwnProperty(matchupName)) {
            allMatchups[matchupName] = {
              name: <span><Link to={{pathname: `/player/${this.props.player.name}`}}>{this.props.player.name}</Link> vs <Link to={{pathname: `/player/${set.winner_name}`}}>{set.winner_name}</Link></span>,
              opponent: set.winner_name,
              setsPlayed: 1,
              setScore: [0 ,1],
              setPercentages: ['0%', '100%'],
              gameScore: [set.loser_score, set.winner_score],
              gamePercentages: this.calculateWinRates(set.loser_score, set.winner_score),
            };
          }

          else {
            allMatchups[matchupName].setsPlayed += 1;
            allMatchups[matchupName].setScore[1] += 1;
            allMatchups[matchupName].setPercentages = this.calculateWinRates(allMatchups[matchupName].setScore[0], allMatchups[matchupName.setScore[1]]);
            allMatchups[matchupName].gameScore[0] += set.loser_score;
            allMatchups[matchupName].gameScore[1] += set.winner_score;
            allMatchups[matchupName].gamePercentages = this.calculateWinRates(allMatchups[matchupName].gameScore[0], allMatchups[matchupName].gameScore[1]);
          }
        }
      });
    }
    console.log(allMatchups);
    const sortBySetsPlayed = this.sortBySetsPlayed(allMatchups);

    const deselectedMatchups = [];
    const selectedMatchups = [];

    sortBySetsPlayed.forEach((setKey, i) => {
      if (i < 10) {
        selectedMatchups.push(allMatchups[setKey]);
      } else {
        deselectedMatchups.push(allMatchups[setKey]);
      }
    });
    
    this.setState({
      allMatchups: allMatchups,
      deselectedMatchups: deselectedMatchups,
      selectedMatchups: selectedMatchups,
    });
  };

  calculateWinRates = (player1Score, player2Score) => {
    const player1WinRate = Math.round(((player1Score / (player1Score + player2Score)) * 100) * 100) / 100;
    const player2WinRate = Math.round(((player2Score / (player2Score + player1Score)) * 100) * 100) / 100;

    return [player1WinRate, player2WinRate];
  };

  sortBySetsPlayed = (matchups) => {
    return Object.keys(matchups).sort((a, b) => {
      return a.setsPlayed - b.setsPlayed;
    });
  };

  handleSelectMatchup = (matchupToSelect) => {
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

  handleDeselectMatchup = (matchupToDeselect) => {
    const removeFromSelectedMatchups = this.state.selectedMatchups.filter((matchup) => {
      return matchup.name !== matchupToDeselect.name;
    });

    const addMatchupToDeselectedMatchups = [this.state.deselectedMatchups, matchupToDeselect];

    const sortBySetsPlayed = this.sortBySetsPlayed(addMatchupToDeselectedMatchups);

    this.setState({
      deselectedMatchups: sortBySetsPlayed,
      selectedMatchups: removeFromSelectedMatchups
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
  };
};

const mapStateToProps = (state) => {
  return {
    sets: state.sets,
  };
};

PersonalHead2Head.propTypes = {
  player: PropTypes.object,
  sets: PropTypes.array,
};

export default connect(mapStateToProps, null)(PersonalHead2Head);