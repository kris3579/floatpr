import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import PersonalHead2Head from './PersonalHead2Head/PersonalHead2Head';

export default class PlayerMatchupState extends React.Component {
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

  render() {
    const allMatchups = {};

    this.props.sets.forEach((set) => {
      if (set.winner_name === this.props.player.name) {
        const matchupName = `${this.props.player.name} vs ${set.loser_name}`;

        if (allMatchups.hasOwnProperty(matchupName) === false) {
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
          allMatchups[matchupName].setPercentages = this.calculateWinRates(allMatchups[matchupName].setScore[0], allMatchups[matchupName].setScore[1]);
          allMatchups[matchupName].gameScore[0] += set.winner_score;
          allMatchups[matchupName].gameScore[1] += set.loser_score;
          allMatchups[matchupName].gamePercentages = this.calculateWinRates(allMatchups[matchupName].gameScore[0], allMatchups[matchupName].gameScore[1]);
        }
      }

      if (set.loser_name === this.props.player.name) {
        const matchupName = `${this.props.player.name} vs ${set.winner_name}`;

        if (allMatchups.hasOwnProperty(matchupName) === false) {
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
          allMatchups[matchupName].setPercentages = this.calculateWinRates(allMatchups[matchupName].setScore[0], allMatchups[matchupName].setScore[1]);
          allMatchups[matchupName].gameScore[0] += set.loser_score;
          allMatchups[matchupName].gameScore[1] += set.winner_score;
          allMatchups[matchupName].gamePercentages = this.calculateWinRates(allMatchups[matchupName].gameScore[0], allMatchups[matchupName].gameScore[1]);
        }
      }
    });
    
    const sortBySetsPlayed = this.sortBySetsPlayed(allMatchups);

    const deselectedMatchups = [];
    const selectedMatchups = [];

    sortBySetsPlayed.forEach((setKey, i) => {
      if (i < 5) {
        selectedMatchups.push(allMatchups[setKey]);
      } else {
        deselectedMatchups.push(allMatchups[setKey]);
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
  player: PropTypes.object,
  sets: PropTypes.array,
};