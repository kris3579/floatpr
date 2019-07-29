import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import superagent from 'superagent';

// import storeData from '../../actions/dataActions';
import Header from '../Header/Header';
import Rankings from '../Rankings/Rankings';
import TournamentList from '../TournamentList/TournamentList';
import RequestPage from '../RequestPage/RequestPage';
import About from '../About/About';
import Top15Head2Head from '../Top15Head2Head/Top15Head2Head';
import PlayerProfile from '../PlayerProfile/PlayerProfile';
import TournamentProfile from '../TournamentProfile/TournamentProfile';

import './App.scss';

export default class App extends React.Component {
  // componentDidMount() {
  //   superagent.get('http://localhost:3579/getPlayers')
  //       .then((response) => {
  //         console.log(response.body);
  //         this.props.storeData(response.body, 'players');
  //       })
  //       .catch((error) => {
  //         throw error;
  //       });
  // }

  render() {    
    return (
      <div className='App'>
        <BrowserRouter>
          <Header/>
          <Route exact path={'/'} component={Rankings}/>
          <Route exact path={'/tournaments'} component={TournamentList}/>
          <Route exact path={'/requests'} component={RequestPage}/>
          <Route exact path={'/about'} component={About}/>
          <Route exact path={'/headToHead'} component={Top15Head2Head}/>
          <Route exact path={'/player/:playerName'} component={PlayerProfile}/>
          <Route exact path={'/tournament/:tournamentId'} component={TournamentProfile}/>
        </BrowserRouter>
      </div>
    );
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     storeData: (data, dataSet) => {
//       dispatch(storeData(data, dataSet));
//     },
//   };
// };

// App.propTypes = {
//   storeData: PropTypes.func,
// };

// export default connect(null, mapDispatchToProps)(App);