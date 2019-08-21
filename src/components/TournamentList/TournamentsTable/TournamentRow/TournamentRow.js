import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class TournamentRow extends React.Component {
  render() {
    const dateString = new Date(this.props.tournament.date).toDateString();
    const parsedPlacements = JSON.parse(this.props.tournament.placements);
    return (
      <tr>
        <td className='tournamentNameColumn'>
          <Link className='link' to={{pathname: `/tournament/${this.props.tournament.id}`}}>
            {this.props.tournament.name}
          </Link>
        </td>

        <td className='tournamentWinnerColumn'>{parsedPlacements[1]}</td>
        <td className='dateColumn'>{dateString}</td>
        <td className='tournamentUrlColumn'>{<a className='link' href={this.props.tournament.url}>{this.props.tournament.url}</a>}</td>
      </tr>
    );
  };
};

TournamentRow.propTypes = {
  tournament: PropTypes.object,
};