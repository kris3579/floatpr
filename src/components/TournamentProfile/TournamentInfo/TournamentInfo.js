import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class TournamentInfo extends React.Component {
  render() {
    console.log(this.props);
    const tournament = this.props.tournamentsObject[this.props.tournamentId];
    return (
      <>
        <h2>{tournament.name}</h2>
        <p>{tournament.url}</p>
        <p>{Date.parse(tournament.date)}</p>

        <h4>Results</h4>
        <ul>
          {
            Object.keys(JSON.parse(tournament.placements)).map((placement, i) => {
              return (
                <li key={i}><strong>{`${placement}:`}</strong>
                  {
                    JSON.parse(tournament.placements)[placement].map((player, i) => {
                      return (
                        <Link to={{pathname: `/player/${player}`}} key={i}>{player}, </Link>
                      )
                    })
                  }
                </li>
              )
            })
          }
        </ul>
      </>
    );
  };
};

TournamentInfo.propTypes = {
  tournamentId: PropTypes.string,
  tournamentsObject: PropTypes.object,
};