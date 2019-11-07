import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SetsAsyncWrapper from '../../AsyncWrappers/SetsAsyncWrapper/SetsAsyncWrapper';
import SetsTable from '../../SetsTable/SetsTable';

export default class TournamentInfo extends React.Component {
  render() {
    const tournament = this.props.tournamentsObject[this.props.tournamentId];

    if (!tournament) {
      return 'Tournament not found.';
    }

    const parsedPlacements = JSON.parse(tournament.placements);

    return (
      <>
        <h2>{tournament.name}</h2>
        <p>
          <strong>URL:</strong> <a href={tournament.url}>{tournament.url}</a><br/>
          <strong>Entrants:</strong> {tournament.entrants}<br/>
          <strong>Date:</strong> {new Date(tournament.date).toDateString()}
        </p>

        <h3>Results</h3>
        <ul className='placementsUl'>
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
                        <strong key={j}><Link to={{ pathname: `/player/${player}` }}>{player}</Link>{doWeAddSeperation}</strong>
                      );
                    })
                  }
                </li>
              );
            })
          }
        </ul>

        <h3>Tournament Sets</h3>

        <SetsAsyncWrapper>
          <SetsTable
            playerA='none'
            playerB='none'
            setsType='tournamentSets'
            tournamentId={this.props.tournamentId}
          />
        </SetsAsyncWrapper>
      </>
    );
  }
}

TournamentInfo.propTypes = {
  tournamentId: PropTypes.string,
  tournamentsObject: PropTypes.object,
};
