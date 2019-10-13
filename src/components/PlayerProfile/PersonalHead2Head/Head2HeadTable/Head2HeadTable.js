import React from 'react';
import PropTypes from 'prop-types';

export default class Head2HeadTable extends React.Component {
  render() {
    return (
      <table className='personalHead2HeadTable'>
        <tbody>
          <tr className='headerRow'>
            <th className='matchupColumn'>Matchup</th>
            <th className='setsComparison'>Sets</th>
            <th className='gamesComparison'>Games</th>
            <th className='remove'>Remove</th>
          </tr>
          {
            this.props.selectedMatchups.map((matchup, i) => {
              let setAvgStatus = 'yellowText';
              let gameAvgStatus = 'yellowText';

              if (matchup.setAvg[0] > matchup.setAvg[1]) {
                setAvgStatus = 'greenText';
              }
              if (matchup.setAvg[0] < matchup.setAvg[1]) {
                setAvgStatus = 'redText';
              }

              if (matchup.gameAvg[0] > matchup.gameAvg[1]) {
                gameAvgStatus = 'greenText';
              }
              if (matchup.gameAvg[0] < matchup.gameAvg[1]) {
                gameAvgStatus = 'redText';
              }

              return (
                <tr key={i}>
                  <td className='matchupColumn'>{matchup.name}</td>
                  <td>
                    <strong className={setAvgStatus}>{`${matchup.setScore[0]}-${matchup.setScore[1]}`}</strong><br/>
                    <span className='percentagesComparison'>{`${matchup.setAvg[0]}-${matchup.setAvg[1]}`}</span>
                  </td>
                  <td>
                    <strong className={gameAvgStatus}>{`${matchup.gameScore[0]}-${matchup.gameScore[1]}`}</strong><br/>
                    <span className='percentagesComparison'>{`${matchup.gameAvg[0]}-${matchup.gameAvg[1]}`}</span>
                  </td>
                  <td className='remove'><img src={require('../../../../assets/delete.png')} onClick={(event) => this.props.handleDeselectMatchup(event, matchup)} alt='Red X'></img></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

Head2HeadTable.propTypes = {
  handleDeselectMatchup: PropTypes.func,
  selectedMatchups: PropTypes.array,
};
