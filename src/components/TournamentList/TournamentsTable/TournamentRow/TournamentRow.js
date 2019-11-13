import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class TournamentRow extends React.Component {
  render() {
    const { tournament } = this.props;

    const parsedPlacement = JSON.parse(tournament.placements)[1];
    const winner = parsedPlacement ? parsedPlacement[0].match(/\b[^|]+$/) : null;

    let dateString = new Date(tournament.date).toDateString();
    dateString = dateString.replace(/^[^\s]+/, '');
    dateString = dateString.replace(/(?<=\d)\s/, '-');
    dateString = dateString.replace(/(?<=[a-z])\s/, '-');

    let shortenedURL = tournament.url.substring(tournament.url.indexOf(':') + 3);
    shortenedURL = shortenedURL.replace(/\/tournament/, '');
    shortenedURL = shortenedURL.replace(/\/event.*/, '');

    return (
      <tr>
        <td className='tournamentNameColumn'>
          <Link to={{ pathname: `/tournament/${tournament.id}` }}>
            {tournament.name}
          </Link>
        </td>

        <td className='tournamentWinnerColumn'>
          <Link to={{ pathname: `/player/${winner}` }}>
            {parsedPlacement}
          </Link>
        </td>

        <td className='dateColumn'>{dateString}</td>
        <td className='entrantsColumn'>{tournament.number_of_entrants}</td>
        <td className='setsColumn'>{tournament.number_of_sets}</td>
        
        <td className='tournamentUrlColumn'>{<a href={tournament.url}>{shortenedURL}</a>}</td>
      </tr>
    );
  }
}

TournamentRow.propTypes = {
  tournament: PropTypes.object,
};
