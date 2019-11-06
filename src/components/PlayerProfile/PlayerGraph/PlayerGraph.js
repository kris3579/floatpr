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
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const player = this.props.playersObject[this.props.playerName];

    let datasets = [{ 
      data: player.rating_history,
      label: 'Rating',
      backgroundColor: 'rgba(0, 0, 125, 0.4)', 
      borderColor: 'rgba(0, 0, 125, 0.8)',
      pointHoverBackgroundColor: 'rgba(0, 0, 100, 0.8)',
    }];
    
    let yLabel = 'Rating';
    let stepSize = 75;
    let suggestedMax = 2200;
    let suggestedMin = 1600;

    if (this.state.whichGraph !== 'rating') {
      datasets = [{
        data: player.set_win_rate_history,
        label: 'Set Win Rate',
        backgroundColor: 'rgba(0, 150, 0, 0.4)', 
        borderColor: 'rgba(0, 150, 0, 0.8)',
        pointHoverBackgroundColor: 'rgba(0, 125, 0, 0.8)',
      },
      {
        data: player.game_win_rate_history,
        label: 'Game Win Rate',
        backgroundColor: 'rgba(0, 75, 0, 0.4)', 
        borderColor: 'rgba(0, 75, 0, 0.8)',
        pointHoverBackgroundColor: 'rgba(0, 50, 0, 0.8)',
      }];

      yLabel = 'Win Rate';
      stepSize = 10;
      suggestedMax = 100;
      suggestedMin = 0;
    }

    const data = {
      labels: player.tournament_names,
      datasets,
    };
    
    const options = {
      elements: {
        point: {
          hoverRadius: 6,
          radius: 4,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            fontColor: 'rgb(0, 0, 0)',
            fontSize: 18,
            fontStyle: 'bold',
            labelString: 'Tournament',
          },
          ticks: {
            callback: (value) => {
              return value.replace(/ Melee Singles/, '');
            },
            maxRotation: 35,
            minRotation: 35,
          },
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            fontColor: 'rgb(0, 0, 0)',
            fontSize: 18,
            fontStyle: 'bold',
            labelString: yLabel,
          },
          ticks: {
            callback: (value) => {
              if (this.state.whichGraph === 'rating') {
                return value;
              }
              return `${value}%`;
            },
            stepSize,
            suggestedMax,
            suggestedMin,
          },
        }],
      },
      tooltips: {
        callbacks: {
          label: (item, data2) => {
            const { label } = data2.datasets[item.datasetIndex];
            if (this.state.whichGraph === 'rating') {
              return `${label}: ${item.yLabel}`;
            }
            return `${label}: ${item.yLabel}%`;
          },
        },
      },
    };

    const graph = <Line
      data={data}
      height={20}
      options={options}
      width={20}
    />;

    return (
      <>
        <form>
          <select name='whichGraph' value={this.state.whichGraph} onChange={this.handleChange} required>
            <option value='rating'>Rating</option>
            <option value='winRate'>Win Rate</option>
          </select>
        </form>
        <div className='graphContainer'>
          {graph}
        </div>
      </>
    );
  }
}

PlayerGraph.propTypes = {
  playerName: PropTypes.string,
  playersObject: PropTypes.object,
};
