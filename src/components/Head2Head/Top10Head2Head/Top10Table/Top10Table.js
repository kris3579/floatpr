import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import ReactFitText from 'react-fittext';

export default class Top10Table extends React.Component {
  render() {
    return (
      <>
        <h3>WA Top 10 Head to Head Table</h3>
        <table className='head2HeadTable'>
          <tbody>
            <tr className='headerRow'>
              <th className='head2HeadTh'></th>
              {
                this.props.topPlayerHead2HeadObject.rankingOrder.map((player, i) => {
                  return (
                    <th className='head2HeadTh' key={i}>
                      {/* <ReactFitText minFontSize={16}> */}
                        <Link className='head2HeadLink' to={{ pathname: `/player/${player.name}` }}>
                          {player.name}
                        </Link>
                      {/* </ReactFitText> */}
                    </th>
                  );
                })
              }
            </tr>
            {
              this.props.topPlayerHead2HeadObject.rankingOrder.map((leftPlayer, i) => {
                return (
                  <tr key={i}>
                    <td className='head2HeadTd headerRow'>
                      {/* <ReactFitText minFontSize={16}> */}
                        <Link className='head2HeadLink' to={{ pathname: `/player/${leftPlayer.name}` }}>
                          <strong>{leftPlayer.name}</strong>
                        </Link>
                      {/* </ReactFitText> */}
                    </td>

                    {
                      this.props.topPlayerHead2HeadObject.rankingOrder.map((rightPlayer, j) => {
                        if (leftPlayer.rank < rightPlayer.rank) {
                          const matchup = `${leftPlayer.rank}-${rightPlayer.rank}`;
                          
                          if (this.props.topPlayerHead2HeadObject[matchup].setScore[0] === 0 && this.props.topPlayerHead2HeadObject[matchup].setScore[1] === 0) {
                            return (
                              <td className='head2HeadTd' key={j}><strong className='noDataTd'>N/A</strong></td>
                            );
                          }
                            
                          return (
                            <td className='head2HeadTd' key={j}>
                              <strong>
                                {`${this.props.topPlayerHead2HeadObject[matchup].setScore[0]}-${this.props.topPlayerHead2HeadObject[matchup].setScore[1]}`}
                              </strong><br/>
                              <span className='percentagesComparison'>
                                {`${this.props.topPlayerHead2HeadObject[matchup].setAvg[0]}-${this.props.topPlayerHead2HeadObject[matchup].setAvg[1]}`}
                              </span>
                            </td>
                          );
                        } 
                        
                        if (leftPlayer.rank > rightPlayer.rank) {
                          const matchup = `${rightPlayer.rank}-${leftPlayer.rank}`;

                          if (this.props.topPlayerHead2HeadObject[matchup].setScore[0] === 0 && this.props.topPlayerHead2HeadObject[matchup].setScore[1] === 0) {
                            return (
                              <td className='head2HeadTd' key={j}><strong className='noDataTd'>N/A</strong></td>
                            );
                          }

                          return (
                            <td className='head2HeadTd' key={j}>
                              <strong>
                                {`${this.props.topPlayerHead2HeadObject[matchup].setScore[1]}-${this.props.topPlayerHead2HeadObject[matchup].setScore[0]}`}
                              </strong><br/>
                              <span className='percentagesComparison'>
                                {`${this.props.topPlayerHead2HeadObject[matchup].setAvg[1]}-${this.props.topPlayerHead2HeadObject[matchup].setAvg[0]}`}
                              </span>
                            </td>
                          );
                        }

                        return (
                            <td className='head2HeadTd' key={j}></td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }          
          </tbody>
        </table>
      </>
    );
  }
}

Top10Table.propTypes = {
  topPlayerHead2HeadObject: PropTypes.object,
};
