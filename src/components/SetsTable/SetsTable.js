import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SetsRow from '../SetsRow/SetsRow';

export default class SetsTable extends React.Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr className='headerRow'>
              <th className='winnerColumn'>Winner</th>
              <th className='loserColumn'>Loser</th>
              <th className='scoreColumn'>Score</th>
              <th className='round?Column'>Round</th>
            </tr>
            {
              this.props.setsArray.map((set, i) => {
                return (
                  <SetsRow
                    set={set}
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

const mapStateToProps = (state) => {
  return {
    setsArray: state.sets,
  };
};

SetsTable.propTypes = {
  setsArray: PropTypes.array,
  tournament: PropTypes.object,
};

connect(mapStateToProps, null);