import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class Top15Table extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr className='headerRow'></tr>
        </tbody>
      </table>
    );
  };
};

Top15Table.propTypes = {
  topPlayerHead2HeadObject: PropTypes.object,
};