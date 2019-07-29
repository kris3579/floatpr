import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import superagent from 'superagent';

import storeData from '../../actions/dataActions';
import PersonalHead2Head from '../PersonalHead2Head/PersonalHead2Head';
import SetsTable from '../SetsTable/SetsTable';

class PlayerProfile extends React.Component {
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
    console.log(this.props.playersObject);
    const player = this.props.playersObject ? this.props.playersObject[this.props.match.params.playerName] : {};
    
    const loadingOrNotSets = this.props.sets ? <>
      <h4>Personal Head2Head Table</h4>
      <PersonalHead2Head
        player={player}
      />

      <h4>Sets Table</h4>
      <SetsTable
        playerA={player.name}
        playerB='none'
        setsType='playerSets'
        tournament='none'
      />
    </> : <div className='loadingDiv'>Loading...</div>;

    const loadingOrNotPlayers = this.props.playersObject ? <>
      <h2>{player.name}</h2>
      <div>
        {
          player.mains.map((main, i) => {
            return (
              <img src={require(`../../assets/stockIcons/${main}.png`)} alt='Fighter Icon' key={i}></img>
            )
          })
        }
      </div>
      <p>
        {player.rating}<br/>
        {player.set_win_rate}<br/>
        {player.game_win_rate}<br/>
      </p>
      <p>
        {player.attendance}<br/>
        {player.active_attendance}<br/>
      </p>

      {loadingOrNotSets}
    </> : <div className='loadingDiv'>Loading...</div>;

    return (
      <>
        {loadingOrNotPlayers}
      </>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    playersObject: state.players,
    sets: state.sets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data, dataSet) => {
      dispatch(storeData(data, dataSet));
    },
  };
};

PlayerProfile.propTypes = {
  playersObject: PropTypes.object,
  sets: PropTypes.array,
  storeData: PropTypes.func,
}; 

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfile);