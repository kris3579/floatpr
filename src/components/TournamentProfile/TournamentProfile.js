import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import superagent from 'superagent';

import storeData from '../../actions/dataActions';
import SetsTable from '../SetsTable/SetsTable';

class TournamentProfile extends React.Component {
  componentDidMount() {
    if (!this.props.tournaments) {
      superagent.get('http://localhost:3579/getTournaments')
        .then((response) => {
          console.log(response.body);
          this.props.storeData(response.body, 'tournaments');
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  render() {
    const tournament = this.props.tournamentsObject[this.props.match.params.tournamentId];
    const placements = JSON.parse(tournament.placements);

    return (
      <div>
        <h2>{tournament.name}</h2>
        <p>{tournament.url}</p>
        <p>{tournament.date}</p>

        <h4>Results</h4>
        <ul>
          {
            Object.keys(placements).map((placement, i) => {
              return (
                <li key={i}><strong>{`${placement}:`}</strong>
                  {
                    placements[placement].map((player, i) => {
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

        <h4>Sets</h4>
        <SetsTable
          playerA='none'
          playerB='none'
          setsType='tournamentSets'
          tournament={tournament.name}
        />
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    tournamentsObject: state.tournaments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};

TournamentProfile.propTypes = {
  tournamentsObject: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentProfile);