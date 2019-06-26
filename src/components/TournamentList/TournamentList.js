import React from 'react';
// import superagent from 'superagent';

import TournamentRow from '../TournamentRow/TournamentRow';

import './TournamentList.scss';

export default class TournamentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.tournaments = [];
  }

  render() {
    // superagent.get('http:/localhost:3579/displayTournaments')
    //   .then((response) => {
    //     this.setState({
    //       tournaments: response.body.tournaments,
    //     });
    //   });

    return (
      <div>
        <p>Tournament List</p>
        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='nameColumn'>Name</th>
              <th className='winnerColumn'>Winner</th>
              <th className='dateColumn'>Date</th>
            </tr>
            {
              this.state.tournaments.map((tournament, i) => {
                return (
                  <TournamentRow
                    tournament={tournament}
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