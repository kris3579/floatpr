import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './TournamentRow.scss';

export default class TournamentRow extends React.Component {
  render() {
    const dateString = new Date(this.props.tournament.date).toDateString();
    const parsedPlacements = JSON.parse(this.props.tournament.placements);
    return (
      <tr>
        <td className='tournamentNameColumn'>
          <Link className='tournmentLink' to={{pathname: `/tournament/${this.props.tournament.name}`}}>
            {this.props.tournament.name}
          </Link>
        </td>

        <td className='winnerColumn'>{parsedPlacements[1]}</td>
        <td className='dateColumn'>{dateString}</td>
        <td className='urlColumn'>{<a className='tournamentLink' href={this.props.tournament.url}>{this.props.tournament.url}</a>}</td>
      </tr>
    );
  };
};

TournamentRow.propTypes = {
  tournament: PropTypes.object,
};