import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import PersonalHead2Head from './PersonalHead2Head/PersonalHead2Head';

export default class PlayerMatchupState extends React.Component {
  calculateWinRates = (player1Score, player2Score) => {

    const player1WinRate = `${(((player1Score / (player1Score + player2Score)).toFixed(2)) * 100)}%`;
    const player2WinRate = `${(((player2Score / (player2Score + player1Score)).toFixed(2)) * 100)}%`;

    return [player1WinRate, player2WinRate];
  };

  sortBySetsPlayed = (matchups) => {
    const orderedMatchups = [];
    
    Object.keys(matchups).sort((a, b) => {
      return a.setsPlayed - b.setsPlayed;
    })
      .forEach((key) => {
        orderedMatchups.push(matchups[key]);
      });

    return orderedMatchups;
  };

  render() {
    const allMatchups = {};

    this.props.setsArray.forEach((set) => {
      if (set.winner_name === this.props.playerName) {
        const matchupName = `${this.props.playerName} vs ${set.loser_name}`;

        if (allMatchups.hasOwnProperty(matchupName) === false) {
          allMatchups[matchupName] = {
            name: <span><Link to={{pathname: `/player/${this.props.playerName}`}}>{this.props.playerName}</Link> vs <Link to={{pathname: `/player/${set.loser_name}`}}>{set.loser_name}</Link></span>,
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
          allMatchups[matchupName].setPercentages = this.calculateWinRates(allMatchups[matchupName].setScore[0], allMatchups[matchupName].setScore[1]);
          allMatchups[matchupName].gameScore[0] += set.winner_score;
          allMatchups[matchupName].gameScore[1] += set.loser_score;
          allMatchups[matchupName].gamePercentages = this.calculateWinRates(allMatchups[matchupName].gameScore[0], allMatchups[matchupName].gameScore[1]);
        }
      }

      if (set.loser_name === this.props.playerName) {
        const matchupName = `${this.props.playerName} vs ${set.winner_name}`;

        if (allMatchups.hasOwnProperty(matchupName) === false) {
          allMatchups[matchupName] = {
            name: <span><Link to={{pathname: `/player/${this.props.playerName}`}}>{this.props.playerName}</Link> vs <Link to={{pathname: `/player/${set.winner_name}`}}>{set.winner_name}</Link></span>,
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
          allMatchups[matchupName].setPercentages = this.calculateWinRates(allMatchups[matchupName].setScore[0], allMatchups[matchupName].setScore[1]);
          allMatchups[matchupName].gameScore[0] += set.loser_score;
          allMatchups[matchupName].gameScore[1] += set.winner_score;
          console.log(allMatchups[matchupName].gameScore)
          allMatchups[matchupName].gamePercentages = this.calculateWinRates(allMatchups[matchupName].gameScore[0], allMatchups[matchupName].gameScore[1]);
        }
      }
    });
    
    const sortBySetsPlayed = this.sortBySetsPlayed(allMatchups);

    const deselectedMatchups = [];
    const selectedMatchups = [];

    sortBySetsPlayed.forEach((matchup, i) => {
      if (i < 5) {
        selectedMatchups.push(matchup);
      } else {
        deselectedMatchups.push(matchup);
      }

    });

    return (
      <PersonalHead2Head
        allMatchups={allMatchups}
        deselectedMatchups={deselectedMatchups}
        selectedMatchups={selectedMatchups}
        sortBySetsPlayed={this.sortBySetsPlayed}
      />
    );
  };
};

PlayerMatchupState.propTypes = {
  playerName: PropTypes.string,
  setsArray: PropTypes.array,
};