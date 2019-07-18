import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import SetsTable from '../SetsTable/SetsTable';

export default class TournamentProfile extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.tournament.name}</h2>
        <p>{this.props.tournament.url}</p>
        <p>{this.props.tournament.date}</p>

        <h4>Results</h4>
        <ul>
          {
            Object.keys(this.props.tournament.placements).map((placement, i) => {
              return (
                <li key={i}><strong>{`${placement}:`}</strong>
                  {
                    this.props.tournament.placements[placement].map((player, i) => {
                      return (
                        <Link to={{pathname: `/player/${player}`}} key={i}>{player}</Link>
                      )
                    })
                  }
                </li>
              )
            })
          }
        </ul>

        <h4>Sets</h4>
        <SetsTable
          tournament={this.props.tournament}
        />
      </div>
    );
  };
};

TournamentProfile.propTypes = {
  tournament: PropTypes.object,
};