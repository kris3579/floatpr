import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class Top15Table extends React.Component {
  render() {
    return (
      <table className='head2HeadTable'>
        <tbody>
          <tr className='headerRow'>
            <td className='head2HeadTd'></td>
            {
              this.props.topPlayerHead2HeadObject.rankingOrder.map((player, i) => {
                return (
                  <td className='head2HeadTd' key={i}>
                    <Link className='head2HeadLink' to={{pathname: `/player/${player.name}`}}>
                      {player.name}
                    </Link>
                  </td>
                )
              })
            }
          </tr>
          {
            this.props.topPlayerHead2HeadObject.rankingOrder.map((leftPlayer, i) => {
              return (
                <tr key={i}>
                  <td className='head2HeadTd headerRow'>
                    <Link className='head2HeadLink' to={{pathname: `/player/${leftPlayer.name}`}}>
                      {leftPlayer.name}
                    </Link>
                  </td>

                  {
                    this.props.topPlayerHead2HeadObject.rankingOrder.map((rightPlayer, j) => {
                      if (leftPlayer.rank === rightPlayer.rank) {
                        return (
                          <td className='head2HeadTd' key={j}></td>
                          )
                      } else if (leftPlayer.rank < rightPlayer.rank) {
                        let matchup = `${leftPlayer.rank}-${rightPlayer.rank}`;

                        if (this.props.topPlayerHead2HeadObject[matchup].setScore[0] === 0 && this.props.topPlayerHead2HeadObject[matchup].setScore[1] === 0) {
                          return (
                            <td className='head2HeadTd' key={j}><strong className='noDataTd'>N/A</strong></td>
                          )
                        }

                        return (
                          <td className='head2HeadTd' key={j}>
                            <strong>{`${this.props.topPlayerHead2HeadObject[matchup].setScore[0]}-${this.props.topPlayerHead2HeadObject[matchup].setScore[1]}`}</strong><br/>
                            <span className='percentagesComparison'>{`${this.props.topPlayerHead2HeadObject[matchup].setPercentages[0]}-${this.props.topPlayerHead2HeadObject[matchup].setPercentages[1]}`}</span>
                          </td>
                        )
                      } else if (leftPlayer.rank > rightPlayer.rank) {
                        let matchup = `${rightPlayer.rank}-${leftPlayer.rank}`;

                        if (this.props.topPlayerHead2HeadObject[matchup].setScore[0] === 0 && this.props.topPlayerHead2HeadObject[matchup].setScore[1] === 0) {
                          return (
                            <td className='head2HeadTd' key={j}><strong className='noDataTd'>N/A</strong></td>
                          )
                        }

                        return (
                          <td className='head2HeadTd' key={j}>
                            <strong>{`${this.props.topPlayerHead2HeadObject[matchup].setScore[1]}-${this.props.topPlayerHead2HeadObject[matchup].setScore[0]}`}</strong><br/>
                            <span className='percentagesComparison'>{`${this.props.topPlayerHead2HeadObject[matchup].setPercentages[1]}-${this.props.topPlayerHead2HeadObject[matchup].setPercentages[0]}`}</span>
                          </td>
                        )
                      }
                    })
                  }
                </tr>
              )
            })
          }          
        </tbody>
      </table>
    );
  };
};

Top15Table.propTypes = {
  topPlayerHead2HeadObject: PropTypes.object,
};