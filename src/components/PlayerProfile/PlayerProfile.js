import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default class PlayerProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.player = this.props.playersObject[this.props.match.params.playerName];
  }

  render() {

    return (
      <div>
        <h2>{this.state.player.name}</h2>
        <div>
          {
            this.state.player.mains.map((main, i) => {
              return (
                <img src={require(`../../assets/stockIcons/${main}.png`)} alt='Fighter Icon' key={i}></img>
              )
            })
          }
        </div>
        <p>
          {this.state.player.rating}<br/>
          {this.state.player.set_win_rate}<br/>
          {this.state.player.game_win_rate}<br/>
        </p>
        <p>
          {this.state.player.attendance}<br/>
          {this.state.player.activeAttendance}<br/>
    
        </p>

        {/*
        History graph component
        Props: player.rating_history,
        player.set_win_rate_history,
        player.game_win_rate_history
        
        Head 2 Head link 
        */}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    playersObject: state.players,
  };
};

PlayerProfile.propTypes = {
  playersObject: PropTypes.object,
}; 

connect(mapStateToProps, null);