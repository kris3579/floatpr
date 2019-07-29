import React from 'react';
import PropTypes from 'prop-types';

export default class Head2HeadTable extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr className='headerRow'>
            <th className='matchupColumn'>Matchup</th>
            <th className='setsComparison'>Sets</th>
            <th className='gamesComparison'>Games</th>
            <th className='remove'>Remove</th>
          </tr>
          {
            this.props.selectedMatchups.map((matchup, i) => {
              return (
                <tr key={i}>
                  <td className='matchupColumn'>{matchup.name}</td>
                  <td className='setsCompariosn'>
                    <strong>{matchup.setScore}</strong><br/>
                    {matchup.setPercentages}
                  </td>
                  <td className='gamesCompariosn'>
                    <strong>{matchup.gameScore}</strong><br/>
                    {matchup.gamePercentages}
                  </td>
                  <td className='remove'><img src={require('../../assets/delete.png')} onClick={this.props.handleDeselectMatchup(matchup)} alt='Red X'></img></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  };
};

Head2HeadTable.propTypes = {
  handleDeselectMatchup: PropTypes.func,
  selectedMatchups: PropTypes.array,
};