import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import superagent from 'superagent';

import storeData from '../../actions/dataActions';
import SetsRow from '../SetsRow/SetsRow';

class SetsTable extends React.Component {
  componentDidMount() {
    if (!this.props.sets) {
      superagent.get('http://localhost:3579/getSets')
        .then((response) => {
          console.log(response.body);
          this.props.storeData(response.body, 'sets');
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  render() {
    let sets;

    if (this.props.sets) {
      switch(this.props.setsType) {
        case 'tournamentSets':
          sets = this.props.sets.filter((set) => {
            return set.tournament_name === this.props.tournament;
          });
          break;
        case 'playerSets':
          sets = this.props.sets.filter((set) => {
            return set.winner_name === this.props.playerA || set.loser_name === this.props.playerA;
          });
          break;
        case 'head2HeadSets':
          sets = this.props.sets.filter((set) => {
            return (set.winner_name === this.props.playerA && set.loser_name === this.props.playerB) || (set.winner_name === this.props.playerB && set.loser_name === this.props.playerA);
          });
          break;
        default:
          sets = [];
      };
    }

    const loadingOrNot = this.props.sets ? <>
      {
        sets.map((set, i) => {
          return (
            <SetsRow
              set={set}
              key={i}
            />
          )
        })
      }
    </> : <tr><td className='loadingColumn'>Loading...</td></tr>;

    return (
      <div>
        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='roundColumn'>Round</th>
              <th className='winnerColumn'>Winner</th>
              <th className='loserColumn'>Loser</th>
              <th className='scoreColumn'>Score</th>
              <th className='tournamentColumn'>tournament</th>
            </tr>
            {loadingOrNot}
          </tbody>
        </table>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    sets: state.sets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dateSet) => {
      dispatch(storeData(data, dateSet));
    },
  };
};

SetsTable.propTypes = {
  playerA: PropTypes.string,
  playerB: PropTypes.string,
  sets: PropTypes.array,
  setsType: PropTypes.string,
  storeData: PropTypes.func,
  tournament: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetsTable);