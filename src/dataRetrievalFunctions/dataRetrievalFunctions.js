import superagent from 'superagent';

export const getIndividualHead2HeadData = (props) => {
  return new Promise((resolve, reject) => {
    if (props.individualHead2HeadObject) {
      if (props.individualHead2HeadObject[props.player]) {
        return resolve(props.individualHead2HeadObject[props.player]);
      }
    }

    return superagent.get(`https://floatpr-backend.herokuapp.com/getIndividualHead2Head/${props.player}`)
      .then((response) => {
        props.storeDataFunction(response.body, props.player, 'individualHead2Head');
        resolve(response.body);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPairHead2HeadData = (props) => {
  return new Promise((resolve, reject) => {
    const matchup1 = `${props.player1} vs ${props.player2}`;
    const matchup2 = `${props.player2} vs ${props.player1}`;
    
    if (props.pairHead2HeadObject) {
      if (props.pairHead2HeadObject[matchup1]) {
        return resolve(props.pairHead2HeadObject[matchup1]);
      }

      if (props.pairHead2HeadObject[matchup2]) {
        return resolve(props.pairHead2HeadObject[matchup2]);
      }
    }

    return superagent.get(`https://floatpr-backend.herokuapp.com/getPairHead2Head/${props.player1}/${props.player2}`)
      .then((response) => {
        props.storeDataFunction(response.body, matchup1, 'pairHead2Head');
        resolve(response.body);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPlayersData = (props) => {
  return new Promise((resolve, reject) => {
    if (props.playersObject) {
      return resolve(props.playersObject);
    }

    return superagent.get('https://floatpr-backend.herokuapp.com/getPlayers')
      .then((response) => {
        props.storeDataFunction(response.body, 'players');
        resolve(response.body);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getSetsData = (props) => {
  return new Promise((resolve, reject) => {
    if (props.setsArray) {
      return resolve(props.setsArray);
    }

    return superagent.get('https://floatpr-backend.herokuapp.com/getSets')
      .then((response) => {
        props.storeDataFunction(response.body, 'sets');
        resolve(response.body);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTournamentsData = (props) => {
  return new Promise((resolve, reject) => {
    if (props.tournamentsObject) {
      return resolve(props.tournamentsObject);
    }

    return superagent.get('https://floatpr-backend.herokuapp.com/getTournaments')
      .then((response) => {
        props.storeDataFunction(response.body, 'tournaments');
        resolve(response.body);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTopPlayerHead2HeadData = (props) => {
  return new Promise((resolve, reject) => {
    if (props.topPlayerHead2HeadObject) {
      return resolve(props.topPlayerHead2HeadObject);
    }

    return superagent.get('https://floatpr-backend.herokuapp.com/getTopPlayerHead2Head')
      .then((response) => {
        props.storeDataFunction(response.body, 'topPlayerHead2Head');
        resolve(response.body);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
