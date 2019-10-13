import superagent from 'superagent';

export const getIndividualHead2HeadData = (props) => {
  return new Promise((resolve, reject) => {
    return superagent.get(`http://localhost:3579/getIndividualHead2Head/${props.player}`)
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPairHead2HeadData = (props) => {
  return new Promise((resolve, reject) => {
    return superagent.get(`http://localhost:3579/getPairHead2Head/${props.player1}/${props.player2}`)
      .then((response) => {
        resolve(response.body);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPlayersData = (props) => {
  return new Promise((resolve, reject) => {
    console.log(props);
    if (props.playersObject) {
      return resolve(props.playersObject);
    }

    return superagent.get('http://localhost:3579/getPlayers')
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

    return superagent.get('http://localhost:3579/getSets')
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

    return superagent.get('http://localhost:3579/getTournaments')
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

    return superagent.get('http://localhost:3579/getTopPlayerHead2Head')
      .then((response) => {
        props.storeDataFunction(response.body, 'topPlayerHead2Head');
        resolve(response.body);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
