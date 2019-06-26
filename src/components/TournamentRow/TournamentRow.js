import React from 'react';
import PropTypes from 'prop-types';

export default class TournamentRow extends React.Component {
  render() {
    return (
      <tr>
        <td className='nameColumn'>Name</td>
        <td className='winnerColumn'>Winner</td>
        <td className='dateColumn'>Date</td>
      </tr>
    );
  };
};

TournamentRow.propTypes = {
  tournament: PropTypes.object
};