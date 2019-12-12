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

    let dateString = new Date(tournament.date).toDateString();
    dateString = dateString.replace(/(?<=[a-z]\b)\s/, ', ');    
    dateString = dateString.replace(/(?<=\d)\s/, '-');
    dateString = dateString.replace(/(?<=[a-z])\s/, '-');

    const parsedPlacements = JSON.parse(tournament.placements);

    const results = Object.entries(parsedPlacements).length === 0 ? 'Incomplete'
      : Object.keys(parsedPlacements).map((placement, i) => {
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

                const splitName = player.split(' | ');
                let [playerName] = splitName;

                if (splitName.length === 2) {
                  // eslint-disable-next-line prefer-destructuring
                  playerName = splitName[1];
                }
                
                if (!parsedPlacements[placement][j + 1]) {
                  doWeAddSeperation = '';
                }
                
                return (
                  <strong key={j}><Link to={{ pathname: `/player/${playerName}` }}>{player}</Link>{doWeAddSeperation}</strong>
                );
              })
              }
          </li>
        );
      });

    return (
      <>
        <h2 className='tournamentHeader'>{tournament.name}</h2>
        <div className='tournamentDiv'>
          <h3>Info</h3>
          <ul className='tournamentInfo'>
            <li><strong className=''>URL:</strong> <a href={tournament.url}>{tournament.url}</a></li>
            <li><strong className=''>Date:</strong> {dateString}</li>
            <li><strong className=''>Entrants:</strong> {tournament.number_of_entrants}</li>
            <li><strong className=''>Sets:</strong> {tournament.number_of_sets}</li>
          </ul>
        </div>

        <div className='tournamentDiv'>
          <h3>Results</h3>
          <ul>
            {results}
          </ul>
        </div>

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
