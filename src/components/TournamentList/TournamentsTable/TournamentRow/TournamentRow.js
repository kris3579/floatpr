import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class TournamentRow extends React.Component {
  render() {
    const parsedPlacements = JSON.parse(this.props.tournament.placements);
    let dateString = new Date(this.props.tournament.date).toDateString();
    dateString = dateString.replace(/(?<=[a-z]\b)/, ',');
    dateString = dateString.replace(/(?<=\d)\s/, '-');
    dateString = dateString.replace(/(?<=[a-z])\s/, '-');

    let shortenedURL = this.props.tournament.url.substring(this.props.tournament.url.indexOf(':') + 3);
    shortenedURL = shortenedURL.replace(/\/tournament/, '');
    shortenedURL = shortenedURL.replace(/\/event.*/, '');

    return (
      <tr>
        <td className='tournamentNameColumn'>
          <Link to={{ pathname: `/tournament/${this.props.tournament.id}` }}>
            {this.props.tournament.name}
          </Link>
        </td>

        <td className='tournamentWinnerColumn'>
          <Link to={{ pathname: `/player/${parsedPlacements[1]}` }}>
            {parsedPlacements[1]}
          </Link>
        </td>

        <td className='dateColumn'>{dateString}</td>
        <td className='tournamentUrlColumn'>{<a href={this.props.tournament.url}>{shortenedURL}</a>}</td>
      </tr>
    );
  }
}

TournamentRow.propTypes = {
  tournament: PropTypes.object,
};
