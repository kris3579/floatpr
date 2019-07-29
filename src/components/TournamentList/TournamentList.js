import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import superagent from 'superagent';

import storeData from '../../actions/dataActions';
import TournamentRow from '../TournamentRow/TournamentRow';

import './TournamentList.scss';

class TournamentList extends React.Component {
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
    const loadingOrNot = this.props.tournaments ? <>
      {
        this.props.tournaments.tournamentsArray.map((tournament, i) => {
          return (
            <TournamentRow
              tournament={tournament}
              key={i}
            />
          )
        })
      }
    </> : <tr><td className='loadingColumn'>Loading...</td></tr>;

    return (
      <>
        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='tournamentNameColumn'>Name</th>
              <th className='winnerColumn'>Winner</th>
              <th className='dateColumn'>Date</th>
              <th className='urlColumn'>Bracket URL</th>
            </tr>
            {loadingOrNot}
          </tbody>
        </table>
      </>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    tournaments: state.tournaments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};

TournamentList.propTypes = {
  tournaments: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentList);