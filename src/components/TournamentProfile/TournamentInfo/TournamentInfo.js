import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class TournamentInfo extends React.Component {
  render() {
    const tournament = this.props.tournamentsObject[this.props.tournamentId];
    const parsedPlacements = JSON.parse(tournament.placements);
    return (
      <>
        <h2>{tournament.name}</h2>
        <a href={tournament.url}>{tournament.url}</a>
        <p>{new Date(tournament.date).toDateString()}</p>

        <h3>Results</h3>
        <ul>
          {
            Object.keys(parsedPlacements).map((placement, i) => {
              let shownPlacement = '';
              
              switch (placement) {
                case '1':
                  shownPlacement = '1st';
                  break;
                case '2':
                  shownPlacement = '2nd';
                  break;
                case '3':
                  shownPlacement = '3rd';
                  break;
                default:
                  shownPlacement = `${placement}th`;
              }

              return (
                <li key={i}><strong>{`${shownPlacement}: `}</strong>
                  {
                    parsedPlacements[placement].map((player, j) => {
                      let doWeAddSeperation = ' - ';
                      if (!parsedPlacements[placement][j + 1]) {
                        doWeAddSeperation = '';
                      }
                      return (
                        <span key={j}><Link to={{ pathname: `/player/${player}` }}>{player}</Link>{doWeAddSeperation}</span>
                      );
                    })
                  }
                </li>
              );
            })
          }
        </ul>

        <h3>Tournament Sets</h3>
      </>
    );
  }
}

TournamentInfo.propTypes = {
  tournamentId: PropTypes.string,
  tournamentsObject: PropTypes.object,
};
