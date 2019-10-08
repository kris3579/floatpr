import React from 'react';
import Chartify from 'chartify';

export default class PlayerGraph extends React.Component {
  render() {
    const config = {
      theme: 'blue',
      width: 1000,
      height: 100,
      boxSize: 20,
      isLineChart: true,
      bordered: false,
    };

    const data = {

    };

    return (
      <Chartify
        config={config}
        container='graphsContainer'
        data={data}
      />
    );
  }
}
