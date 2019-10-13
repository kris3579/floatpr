import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

export default class PlayerGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      whichGraph: 'rating',
    };
  }

  handleChange = (event) => {
    this.setState({
      whichGraph: event.target.value,
    });
  };

  render() {
    const player = this.props.playersObject[this.props.playerName];
    console.log(player);

    const datasets = this.state.whichGraph === 'rating' ? [{
      data: player.rating_history,
      label: 'Rating',
    }] : [{
      data: player.set_win_rate_history,
      label: 'Set Win Rate',
    },
    {
      data: player.game_win_rate_history,
      label: 'Game Win Rate',
    }]; 

    const stepSize = this.state.whichGraph === 'rating' ? 75 : 10;

    const data = {
      labels: player.tournament_names,
      datasets,
    };
    
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          ticks: {
            maxRotation: 25,
            minRotation: 25,
          },
        }],
        yAxes: [{
          ticks: {
            stepSize,
          },
        }],
      },
    };

    const ratingGraph = <Line
      data={data}
      height={20}
      options={options}
      width={20}
    />;

    const winRateGraph = <Line
      data={data}
      height={20}
      options={options}
      width={20}
    />;

    const graphToRender = this.state.whichGraph === 'rating' ? ratingGraph : winRateGraph;

    return (
      <>
        <form>
          <select value={this.state.whichGraph} onChange={this.handleChange} required>
            <option value='rating'>Rating History Graph</option>
            <option value='winRate'>Win Rate History Graph</option>
          </select>
        </form>
        <div className='graphContainer'>
          {graphToRender}
        </div>
      </>
    );
  }
}

PlayerGraph.propTypes = {
  playerName: PropTypes.string,
  playersObject: PropTypes.object,
};
