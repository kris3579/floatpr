import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Top10Table extends React.Component {
  render() {
    const { topPlayerHead2HeadObject } = this.props;

    return (
      <>
        <h3 className='head2HeadTableHeader'>WA Top 10 Head to Head Table</h3>
        <div className='head2HeadTableDiv'>
          <table className='head2HeadTable'>
            <tbody>
              <tr className='headerRow'>
                <th className='head2HeadTh'></th>
                {
                  topPlayerHead2HeadObject.rankingOrder.map((player, i) => {
                    const playerName = player.sponser === '' ? player.name : `${player.sponser} | ${player.name}`;
                    
                    return (
                      <th className='head2HeadTh' key={i}>
                        <Link className='head2HeadLink' to={{ pathname: `/player/${player.name}` }}>
                          {playerName}
                        </Link>
                      </th>
                    );
                  })
                }
              </tr>
              {
                topPlayerHead2HeadObject.rankingOrder.map((leftPlayer, i) => {
                  const leftPlayerName = leftPlayer.sponser === '' ? leftPlayer.name : `${leftPlayer.sponser} | ${leftPlayer.name}`;
                  
                  return (
                    <tr key={i}>
                      <td className='head2HeadTd headerRow leftHeader'>
                        <Link className='head2HeadLink' to={{ pathname: `/player/${leftPlayer.name}` }}>
                          <strong>{leftPlayerName}</strong>
                        </Link>
                      </td>

                      {
                        topPlayerHead2HeadObject.rankingOrder.map((rightPlayer, j) => {
                          if (leftPlayer.rank < rightPlayer.rank) {
                            const matchupName = `${leftPlayer.rank}-${rightPlayer.rank}`;
                            const matchup = topPlayerHead2HeadObject[matchupName];
                            
                            if (matchup.setScore[0] === 0 && matchup.setScore[1] === 0) {
                              return (
                                <td className='head2HeadTd' key={j}><strong className='noDataTd'>N/A</strong></td>
                              );
                            }
                              
                            return (
                                <td className='head2HeadTd' key={j}>
                                <strong>
                                  {`${matchup.setScore[0]}-${matchup.setScore[1]}`}
                                </strong><br/>
                                <span className='percentagesComparison'>
                                  {`${matchup.setAvg[0]}%-${matchup.setAvg[1]}%`}
                                </span>
                              </td>
                            );
                          } 
                          
                          if (leftPlayer.rank > rightPlayer.rank) {
                            const matchupName = `${rightPlayer.rank}-${leftPlayer.rank}`;
                            const matchup = topPlayerHead2HeadObject[matchupName];
                            
                            if (matchup.setScore[0] === 0 && matchup.setScore[1] === 0) {
                              return (
                                <td className='head2HeadTd' key={j}><strong className='noDataTd'>N/A</strong></td>
                              );
                            }
                              
                            return (
                                <td className='head2HeadTd' key={j}>
                                <strong>
                                  {`${matchup.setScore[1]}-${matchup.setScore[0]}`}
                                </strong><br/>
                                <span className='percentagesComparison'>
                                  {`${matchup.setAvg[1]}%-${matchup.setAvg[0]}%`}
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
        </div>
      </>
    );
  }
}

Top10Table.propTypes = {
  topPlayerHead2HeadObject: PropTypes.object,
};
