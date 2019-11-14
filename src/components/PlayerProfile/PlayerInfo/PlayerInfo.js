import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

import PlayerGraph from './PlayerGraph/PlayerGraph';
import IndividualHead2HeadAsyncWrapper from '../../AsyncWrappers/IndividualHead2HeadAsyncWrapper/IndividualHead2HeadAsyncWrapper';
import PersonalHead2Head from './PersonalHead2Head/PersonalHead2Head';
import SetsAsyncWrapper from '../../AsyncWrappers/SetsAsyncWrapper/SetsAsyncWrapper';
import SetsTable from '../../SetsTable/SetsTable';

export default class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataType: 'setsTable',
    };
  }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const player = this.props.playersObject[this.props.playerName];

    if (!player) {
      return (
        <p>Player not found.</p>
      );
    }

    const playerName = player.sponser === '' ? player.name : `${player.sponser} | ${player.name}`;
    
    const setWinRate = Number.isInteger(parseFloat(player.set_win_rate, 10))
      ? parseFloat(player.set_win_rate, 10).toFixed(0) : player.set_win_rate;
    const gameWinRate = Number.isInteger(parseFloat(player.game_win_rate, 10))
      ? parseFloat(player.game_win_rate, 10).toFixed(0) : player.game_win_rate;

    const desktopStatistics = <div>
      <div className='playerDiv'>
        <strong>Sets Won:</strong> {player.set_wins}<br/>
        <strong>Sets Lost:</strong> {player.set_losses}<br/>
        <strong>Sets Played:</strong> {player.set_wins + player.set_losses}<br/>
        <strong>Set Win Rate:</strong> {setWinRate}%
      </div>
      <div className='playerDiv'>
        <strong>Rating:</strong> {player.rating}<br/>
        <strong>Tournaments Attended:</strong> {player.attendance}<br/>
        <strong>Active Attendance:</strong> {player.active_attendance}<br/>
      </div>
      <div className='playerDiv'>    
        <strong>Games Won:</strong> {player.game_wins}<br/>
        <strong>Games Lost:</strong> {player.game_losses}<br/>
        <strong>Games Played:</strong> {player.game_wins + player.game_losses}<br/>
        <strong>Game Win Rate:</strong> {gameWinRate}%<br/>
      </div>
    </div>;

    const mobileStatistics = <p className='mobilePlayerStatistics'>
        <strong>Rating:</strong> {player.rating}<br/>
        <strong>Tournaments Attended:</strong> {player.attendance}<br/>
        <strong>Active Attendance:</strong> {player.active_attendance}<br/>
        <br/>
        <strong>Sets Won:</strong> {player.set_wins}<br/>
        <strong>Sets Lost:</strong> {player.set_losses}<br/>
        <strong>Sets Played:</strong> {player.set_wins + player.set_losses}<br/>
        <strong>Set Win Rate:</strong> {setWinRate}%<br/>
        <br/>
        <strong>Games Won:</strong> {player.game_wins}<br/>
        <strong>Games Lost:</strong> {player.game_losses}<br/>
        <strong>Games Played:</strong> {player.game_wins + player.game_losses}<br/>
        <strong>Game Win Rate:</strong> {gameWinRate}%
    </p>;

    const setsTable = <SetsAsyncWrapper>
      <SetsTable
        player1={this.props.playerName}
        player2='none'
        setsType='playerSets'
        tournament='none'
      />
    </SetsAsyncWrapper>;

    const personalHead2Head = <IndividualHead2HeadAsyncWrapper
      playerName={this.props.playerName}
    >
      <PersonalHead2Head/>
    </IndividualHead2HeadAsyncWrapper>;

    const playerGraph = <PlayerGraph
      player={player}
    />;

    let whichData;

    switch (this.state.dataType) {
      case 'matchupsTable':
        whichData = personalHead2Head;
        break;
      case 'historyGraph':
        whichData = playerGraph;
        break;
      default:
        whichData = setsTable;
    }
    
    return (
      <>
        <h2 className='playerHeader'>{playerName}</h2>

        <div className='mainsDiv'>
          {
            player.mains.map((main, i) => {
              return (
                <img src={require(`../../../assets/stockIcons/${main}.png`)} alt='Fighter Icon' key={i}></img> // eslint-disable-line
              );
            })
          }
        </div>

        <h3 className='statisticsHeader'>Statistics</h3>
        <MediaQuery maxDeviceWidth={480}>
          {(matches) => {
            return matches ? mobileStatistics : desktopStatistics;
          }}
        </MediaQuery>

        <form className='playerInfoForm'>
          <label className='playerInfoLabel'>
            <input type='radio' name='dataType' value='setsTable' onChange={this.handleChange} checked={this.state.dataType === 'setsTable'}/>
            Sets Table
          </label>

          <label className='playerInfoLabel'>
            <input type='radio' name='dataType' value='matchupsTable' onChange={this.handleChange} checked={this.state.dataType === 'matchupsTable'}/>
            Head 2 Head
          </label>

          <label className='playerInfoLabel'>
            <input type='radio' name='dataType' value='historyGraph' onChange={this.handleChange} checked={this.state.dataType === 'historyGraph'}/>
            History Graph
          </label>
        </form>

        {whichData}
      </>
    );
  }
}

PlayerInfo.propTypes = {
  playerName: PropTypes.string,
  playersObject: PropTypes.object,
};
