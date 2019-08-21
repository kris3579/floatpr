import superagent from 'superagent';

export default class DataRetrievalFunctions {
  playersData(props) {
    return new Promise((resolve, reject) => {

      if (!props.playersObject) {
        return superagent.get('http://localhost:3579/getPlayers')
        .then((response) => {
          props.storeDataFunction(response.body, 'players');
          resolve(response.body);
        })
        .catch((error) => {
          reject(error);
        });
      }
      
      if (props.playersObject) {
        resolve(props.playersObject);
      }
      
      reject('Something went wrong');
    });
  };

  setsData(props) {
    return new Promise((resolve, reject) => {
      
      if (!props.setsArray) {
        return superagent.get('http://localhost:3579/getSets')
        .then((response) => {
          props.storeDataFunction(response.body, 'sets');
          resolve(response.body);
        })
        .catch((error) => {
          reject(error);
        });
      }
      
      if (props.setsArray) {
        resolve(props.setsArray);
      }

      reject('Something went wrong');
    });
  };

  tournamentsData(props) {
    return new Promise((resolve, reject) => {
      if (!props.tournamentsObject) {
        return superagent.get('http://localhost:3579/getTournaments')
        .then((response) => {
          props.storeDataFunction(response.body, 'tournaments');
          resolve(response.body);
        })
        .catch((error) => {
          reject(error);
        });
      }
      
      if (props.tournaments) {
        resolve(props.tournamentsObject);
      }

      reject('Something went wrong');
    });
  };
};