import React from 'react';
// import superagent from 'superagent';

import PlayerRow from '../PlayerRow/PlayerRow';

import './MainRanking.scss';

export default class MainRanking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.players = [];
  }

  render() {
    // superagent.get('http://localhost:3579/displayPlayers')
    //   .then((response) => {
    //     this.setState({
    //       players: response.body.players,
    //     });
    //   });
    
    return (
      <div>
        <h3>Washington State Ranking</h3>
        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='rankColumn'>Rank</th>
              <th className='nameColumn'>Tag</th>
              <th className='mainsColumn'>Fighters</th>
              <th className='scoreColumn'>Score</th>
              <th className='winRateColumn'>Set Win Rate</th>
              <th className='winRateColumn'>Game Win Rate</th>
            </tr>
            {
              this.props.activePlayers.map((player, i) => {
                return (
                  <PlayerRow
                  player={player}
                  key={i}
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  };
};